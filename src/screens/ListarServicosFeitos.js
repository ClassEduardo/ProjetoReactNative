import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, SectionList, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import MaskedInput from '../components/MaskedInput';
import CenteredModal from '../components/CenteredModal';
import ServicoFeitoItem from '../components/ServicoFeitoItem';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { useFocusEffect } from '@react-navigation/native';
import { listarServicosFeitos, atualizarServicoFeito, excluirServicoFeito } from '../services/ServicosFeitosDB';
import { formatarCPF, formatarCelular, formatarDataHora, formatarValor } from '../utils/format';

export default function ListarServicosFeitos() {
  const [servicosFeitos, setServicosFeitos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editFields, setEditFields] = useState({});

  useFocusEffect(
    useCallback(() => {
      carregarServicos();
    }, [])
  );

  async function carregarServicos() {
    await listarServicosFeitos((lista = []) => {
      if (!Array.isArray(lista)) lista = [];

      const parse = d => {
        const [dia, mes, ano] = (d || '').split('/').map(Number);
        return new Date(ano || 0, (mes || 1) - 1, dia || 1).getTime();
      };
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
          secoes.push({ title: data, data: agrupado[data] });
        });
      setServicosFeitos(secoes);
    });
  }

  function abrirModalEditar(servico) {
    setEditFields({ ...servico });
    setModalVisible(true);
  }

  function salvarEdicao() {
    if (
      editFields.data_hora_entrada &&
      !/^\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}$/.test(editFields.data_hora_entrada)
    ) {
      Alert.alert('Atenção', 'Data de entrada inválida');
      return;
    }
    if (
      editFields.data_hora_saida &&
      !/^\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}$/.test(editFields.data_hora_saida)
    ) {
      Alert.alert('Atenção', 'Data de saída inválida');
      return;
    }
    atualizarServicoFeito(editFields, ok => {
      if (ok) {
        setModalVisible(false);
        carregarServicos();
      } else {
        Alert.alert('Erro ao atualizar!');
      }
    });
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
          onPress: () => {
            excluirServicoFeito(id, (ok) => {
              if (ok) {
                carregarServicos();
              } else {
                Alert.alert('Erro ao excluir!');
              }
            });
          },
        },
      ]
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      <SectionList
        sections={servicosFeitos}
        keyExtractor={item => item.id.toString()}
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
      <CenteredModal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
         <MaskedInput label="Número OS" value={editFields.numero_os} onChangeText={txt => setEditFields(f => ({ ...f, numero_os: txt }))} />
        <MaskedInput label="Cliente" value={editFields.nome_cliente} onChangeText={txt => setEditFields(f => ({ ...f, nome_cliente: txt }))} />
        <MaskedInput label="CPF" value={editFields.cpf} onChangeText={txt => setEditFields(f => ({ ...f, cpf: formatarCPF(txt) }))} />
        <MaskedInput label="Celular" value={editFields.celular} onChangeText={txt => setEditFields(f => ({ ...f, celular: formatarCelular(txt) }))} />
        <MaskedInput label="Situação" value={editFields.situacao} onChangeText={txt => setEditFields(f => ({ ...f, situacao: txt }))} />
        <MaskedInput label="Data de entrada" value={editFields.data_hora_entrada} onChangeText={txt => setEditFields(f => ({ ...f, data_hora_entrada: formatarDataHora(txt) }))} />
        <MaskedInput label="Data de saída" value={editFields.data_hora_saida} onChangeText={txt => setEditFields(f => ({ ...f, data_hora_saida: formatarDataHora(txt) }))} />
        <MaskedInput label="Vendedor" value={editFields.vendedor} onChangeText={txt => setEditFields(f => ({ ...f, vendedor: txt }))} />
        <MaskedInput label="Técnico" value={editFields.tecnico} onChangeText={txt => setEditFields(f => ({ ...f, tecnico: txt }))} />
        <MaskedInput label="Equipamento" value={editFields.equipamento} onChangeText={txt => setEditFields(f => ({ ...f, equipamento: txt }))} />
        <MaskedInput label="Marca" value={editFields.marca} onChangeText={txt => setEditFields(f => ({ ...f, marca: txt }))} />
        <MaskedInput label="Modelo" value={editFields.modelo} onChangeText={txt => setEditFields(f => ({ ...f, modelo: txt }))} />
        <MaskedInput label="Nº série" value={editFields.n_serie} onChangeText={txt => setEditFields(f => ({ ...f, n_serie: txt }))} />
        <MaskedInput label="Condições" value={editFields.condicoes} onChangeText={txt => setEditFields(f => ({ ...f, condicoes: txt }))} />
        <MaskedInput label="Defeito" value={editFields.defeito} onChangeText={txt => setEditFields(f => ({ ...f, defeito: txt }))} />
        <MaskedInput label="Solução" value={editFields.solucao} onChangeText={txt => setEditFields(f => ({ ...f, solucao: txt }))} />
        <MaskedInput label="Valor" value={editFields.valor} onChangeText={txt => setEditFields(f => ({ ...f, valor: formatarValor(txt) }))} keyboardType="numeric" />
        <MaskedInput label="Forma" value={editFields.forma_pagamento} onChangeText={txt => setEditFields(f => ({ ...f, forma_pagamento: txt }))} />
        <SaveCancelButtons onSave={salvarEdicao} onCancel={() => setModalVisible(false)} />
      </CenteredModal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  secao: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#eaeaea',
    padding: 6,
    marginTop: 18,
    marginBottom: 8,
    borderRadius: 5,
    textAlign: 'center',
  },
  textarea: {
    height: 60,
    textAlignVertical: 'top',
  },
});