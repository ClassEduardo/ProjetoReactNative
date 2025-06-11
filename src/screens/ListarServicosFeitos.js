import React, { useCallback, useState, useEffect } from 'react';
import { Text, SectionList, Alert, SafeAreaView, View, StatusBar, ActivityIndicator, Pressable } from 'react-native';
import MaskedInput from '../components/MaskedInput';
import CenteredModal from '../components/CenteredModal';
import PickerInput from '../components/PickerInput';
import ServicoFeitoItem from '../components/ServicoFeitoItem';
import FiltrosHeader from '../components/FiltrosHeader';
import DateTimeInput from '../components/DateTimeInput';
import { useFocusEffect } from '@react-navigation/native';
import { listarServicosFeitos, atualizarServicoFeito, excluirServicoFeito } from '../services/ServicosFeitosDB';
import { formatarCPF, formatarCelular, formatarValor, formatarDataHoraExibicao } from '../utils/format';
import styles from '../styles/CommonStyles';

export default function ListarServicosFeitos() {
  const [servicosFeitos, setServicosFeitos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editFields, setEditFields] = useState({});
  const [cpfBusca, setCpfBusca] = useState('');
  const [entradaBusca, setEntradaBusca] = useState('');
  const [saidaBusca, setSaidaBusca] = useState('');
  const [buscaGeral, setBuscaGeral] = useState('');
  const [loading, setLoading] = useState(false);


  useFocusEffect(
    useCallback(() => {
      carregarServicos();
    }, [])
  );

  async function carregarServicos() {
    setLoading(true);
    const lista = await listarServicosFeitos();
    if (!Array.isArray(lista)) {
      setServicosFeitos([]);
      setLoading(false);
      return;
    }

    const parse = d => new Date(d || '').getTime();

    lista.sort((a, b) => parse(b.data_hora_entrada) - parse(a.data_hora_entrada));

    const secoes = [];
    const agrupado = {};

    lista.forEach(item => {
      if (!agrupado[item.data_hora_entrada]) agrupado[item.data_hora_entrada] = [];
      agrupado[item.data_hora_entrada].push(item);
    });

    Object.keys(agrupado)
      .sort((a, b) => parse(b) - parse(a))
      .forEach(data => {
        secoes.push({ title: formatarDataHoraExibicao(data), data: agrupado[data] });
      });

    setServicosFeitos(secoes);
    setLoading(false);
  };
}

useEffect(() => {
  async function filtrar() {
    setLoading(true);
    const lista = await listarServicosFeitos();
    if (!Array.isArray(lista)) {
      setServicosFeitos([]);
      setLoading(false);
      return;
    }

    const filtrado = lista.filter(item => {
      const termo = buscaGeral.toLowerCase();

      const matchBusca = !buscaGeral || Object.keys(item).some(chave => {
        if (chave === 'valor') return false;
        return String(item[chave] || '').toLowerCase().includes(termo);
      });

      const entradaStr = formatarDataHoraExibicao(item.data_hora_entrada);

      const saidaStr = formatarDataHoraExibicao(item.data_hora_saida);

      return (
        (!cpfBusca || (item.cpf || '').includes(cpfBusca)) &&
        (!entradaBusca || entradaStr.includes(entradaBusca)) &&
        (!saidaBusca || saidaStr.includes(saidaBusca)) &&
        matchBusca
      );
    });

    const parse = d => new Date(d || '').getTime();

    filtrado.sort((a, b) => parse(b.data_hora_entrada) - parse(a.data_hora_entrada));

    const secoes = [];
    const agrupado = {};

    filtrado.forEach(item => {
      if (!agrupado[item.data_hora_entrada]) agrupado[item.data_hora_entrada] = [];
      agrupado[item.data_hora_entrada].push(item);
    });

    Object.keys(agrupado)
      .sort((a, b) => parse(b) - parse(a))
      .forEach(data => {
        secoes.push({ title: formatarDataHoraExibicao(data), data: agrupado[data] });
      });
    setServicosFeitos(secoes);
    setLoading(false);
  };

  filtrar();
  }, [cpfBusca, entradaBusca, saidaBusca, buscaGeral]);

  function abrirModalEditar(servico) {
    setEditFields({ ...servico });
    setModalVisible(true);
  }

  async function salvarEdicao() {
  const obrigatorios = {
    'Número OS': editFields.numero_os,
    'Nome cliente': editFields.nome_cliente,
    CPF: editFields.cpf,
    'Data de entrada': editFields.data_hora_entrada,
    Equipamento: editFields.equipamento,
    Valor: editFields.valor,
    'Forma de pagamento': editFields.forma_pagamento,
  };

  const faltando = Object.entries(obrigatorios)
    .filter(([, v]) => !v)
    .map(([label]) => `\u2022 ${label}`);
  if (faltando.length) {
    Alert.alert('Campos obrigatórios', `Preencha:\n${faltando.join('\n')}`);
    return;
  }

  const ok = await atualizarServicoFeito(editFields);
  if (ok) {
    setModalVisible(false);
    carregarServicos();
  } else {
    Alert.alert('Erro ao atualizar!');
  }
}

function confirmarExcluir(id) {
  Alert.alert(
    'Confirmar exclusão',
    'Deseja realmente excluir este serviço?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const ok = await excluirServicoFeito(id);
          if (ok) {
            carregarServicos();
          } else {
            Alert.alert('Erro ao excluir!');
          }
        },
      },
    ]
  );
}

return (
  <SafeAreaView style={[styles.container, { paddingTop: StatusBar.currentHeight || 0 }]}>
    {loading ? (
      <ActivityIndicator style={{ marginTop: 20 }} size="large" />
    ) : (
      <View style={{ flex: 1 }}>
        <SectionList
          sections={servicosFeitos}
          keyExtractor={item => item.id.toString()}
          initialNumToRender={10}
          stickySectionHeadersEnabled
          ListHeaderComponent={
            <FiltrosHeader
              busca={buscaGeral}
              setBusca={setBuscaGeral}
              cpf={cpfBusca}
              setCpf={setCpfBusca}
              entrada={entradaBusca}
              setEntrada={setEntradaBusca}
              saida={saidaBusca}
              setSaida={setSaidaBusca}
            />
          }
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.secao}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <ServicoFeitoItem
              item={item}
              onUpdate={() => abrirModalEditar(item)}
              onDelete={() => confirmarExcluir(item.id)}
            />
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>Nenhum serviço registrado.</Text>}
        />
      </View>
    )}
    <CenteredModal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
      <MaskedInput
        label="Número OS"
        value={editFields.numero_os}
        onChangeText={txt => setEditFields(f => ({ ...f, numero_os: txt }))}
      />
      <MaskedInput
        label="Nome cliente"
        value={editFields.nome_cliente}
        onChangeText={txt => setEditFields(f => ({ ...f, nome_cliente: txt }))}
      />
      <MaskedInput
        label="CPF"
        value={editFields.cpf}
        onChangeText={txt => setEditFields(f => ({ ...f, cpf: formatarCPF(txt) }))}
      />
      <MaskedInput
        label="Celular"
        value={editFields.celular}
        onChangeText={txt => setEditFields(f => ({ ...f, celular: formatarCelular(txt) }))}
      />
      <MaskedInput
        label="Situação"
        value={editFields.situacao}
        onChangeText={txt => setEditFields(f => ({ ...f, situacao: txt }))}
      />
      <DateTimeInput
        label="Data de entrada"
        value={editFields.data_hora_entrada}
        onChange={txt => setEditFields(f => ({ ...f, data_hora_entrada: txt }))}
      />
      <DateTimeInput
        label="Data de saída"
        value={editFields.data_hora_saida}
        onChange={txt => setEditFields(f => ({ ...f, data_hora_saida: txt }))}
      />
      <MaskedInput
        label="Vendedor"
        value={editFields.vendedor}
        onChangeText={txt => setEditFields(f => ({ ...f, vendedor: txt }))}
      />
      <MaskedInput
        label="Técnico"
        value={editFields.tecnico}
        onChangeText={txt => setEditFields(f => ({ ...f, tecnico: txt }))}
      />
      <MaskedInput
        label="Equipamento"
        value={editFields.equipamento}
        onChangeText={txt => setEditFields(f => ({ ...f, equipamento: txt }))}
      />
      <MaskedInput
        label="Marca"
        value={editFields.marca}
        onChangeText={txt => setEditFields(f => ({ ...f, marca: txt }))}
      />
      <MaskedInput
        label="Modelo"
        value={editFields.modelo}
        onChangeText={txt => setEditFields(f => ({ ...f, modelo: txt }))}
      />
      <MaskedInput
        label="Nº série"
        value={editFields.n_serie}
        onChangeText={txt => setEditFields(f => ({ ...f, n_serie: txt }))}
      />
      <MaskedInput
        label="Condições"
        value={editFields.condicoes}
        onChangeText={txt => setEditFields(f => ({ ...f, condicoes: txt }))}
      />
      <MaskedInput
        label="Defeito"
        value={editFields.defeito}
        onChangeText={txt => setEditFields(f => ({ ...f, defeito: txt }))}
      />
      <MaskedInput
        label="Solução"
        value={editFields.solucao}
        onChangeText={txt => setEditFields(f => ({ ...f, solucao: txt }))}
      />
      <MaskedInput
        label="Valor"
        value={editFields.valor}
        onChangeText={txt =>
          setEditFields(f => ({ ...f, valor: formatarValor(txt) }))
        }
        keyboardType="numeric"
      />
      <PickerInput
        label="Forma"
        selectedValue={editFields.forma_pagamento}
        onValueChange={txt =>
          setEditFields(f => ({ ...f, forma_pagamento: txt }))
        }
        items={[
          { label: 'Pix', value: 'pix' },
          { label: 'Débito', value: 'debito' },
          { label: 'Crédito', value: 'credito' },
          { label: 'Dinheiro', value: 'dinheiro' },
        ]}
      />
      <View style={styles.modalButtons}>
        <Pressable style={[styles.modalButton, styles.modalSave]} onPress={salvarEdicao}>
          <Text style={styles.modalButtonText}>Salvar</Text>
        </Pressable>
        <Pressable style={[styles.modalButton, styles.modalCancel]} onPress={() => setModalVisible(false)}>
          <Text style={styles.modalButtonText}>Cancelar</Text>
        </Pressable>
      </View>      </CenteredModal>
  </SafeAreaView>
);
