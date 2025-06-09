import React, { useCallback, useState } from 'react';
import { Text, StyleSheet, SectionList, Alert } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import LabeledInput from '../components/LabeledInput';
import CenteredModal from '../components/CenteredModal';
import ServicoFeitoItem from '../components/ServicoFeitoItem';
import SaveCancelButtons from '../components/SaveCancelButtons';
import LabeledPicker from '../components/LabeledPicker';
import { useFocusEffect } from '@react-navigation/native';
import { listarServicosFeitos, atualizarServicoFeito, excluirServicoFeito, createTableServicosFeitos } from '../services/ServicosFeitosDB';
import { Picker } from '@react-native-picker/picker';
import { listarServicos } from '../services/ServicoBD';
import { formatarData } from '../utils/format';


export default function ListarServicosFeitos() {
  const [servicos, setServicos] = useState([]);
  const [servicosFeitos, setServicosFeitos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoEditando, setServicoEditando] = useState(null);
  const [editFields, setEditFields] = useState({
    tipo_servico: '',
    nome_cliente: '',
    valor: '',
    descricao: '',
    data_servico: ''
  });

  useFocusEffect(
    useCallback(() => {
      carregarServicos();
      listarServicos((lista) => {
        if (Array.isArray(lista)) setServicos(lista);
        else setServicos([]);
      });
    }, [])
  );

  async function carregarServicos() {
    await listarServicosFeitos((lista = []) => {
      if (!Array.isArray(lista)) lista = [];

      const parse = (d) => {
        const [dia, mes, ano] = (d || '').split('/').map(Number);
        return new Date(ano || 0, (mes || 1) - 1, dia || 1).getTime();
      };
      lista.sort((a, b) => parse(b.data_servico) - parse(a.data_servico));

      const secoes = [];
      const agrupado = {};
      lista.forEach((item) => {
        if (!agrupado[item.data_servico]) agrupado[item.data_servico] = [];
        agrupado[item.data_servico].push(item);
      });
      Object.keys(agrupado)
        .sort((a, b) => parse(b) - parse(a))
        .forEach((data) => {
          secoes.push({ title: data, data: agrupado[data] });
        });
      setServicosFeitos(secoes);
    });
  }

  function abrirModalEditar(servico) {
    setServicoEditando(servico);
    setEditFields({ ...servico });
    setModalVisible(true);
  }

  function salvarEdicao() {
    const { id, tipo_servico, nome_cliente, valor, descricao, data_servico } = editFields;
    if (!tipo_servico.trim() || !nome_cliente.trim() || !valor.trim() || !data_servico.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      return;
    }
    if (!/^\d{2}\/\d{2}/.test(data_servico.trim())) {
      Alert.alert('Atenção', 'Informe a data com dia e mês (DD/MM)');
      return;
    }
    atualizarServicoFeito(id, tipo_servico, nome_cliente, valor, descricao, data_servico, (ok) => {
      if (ok) {
        setModalVisible(false);
        carregarServicos();
      } else {
        Alert.alert('Erro ao atualizar!');
      }
    });
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
        <LabeledPicker
          label="Tipo de serviço"
          selectedValue={editFields.tipo_servico}
          onValueChange={txt => setEditFields(f => ({ ...f, tipo_servico: txt }))}
        >
          <Picker.Item label="Selecione um serviço" value="" />
          {servicos.map((s) => (
            <Picker.Item key={s.id} label={s.nome} value={s.nome} />
          ))}
        </LabeledPicker>
        <LabeledInput
          label="Nome do cliente"
          inputProps={{
            value: editFields.nome_cliente,
            onChangeText: txt => setEditFields(f => ({ ...f, nome_cliente: txt })),
          }}
        />
        <LabeledInput
          label="Valor"
          inputProps={{
            value: editFields.valor,
            onChangeText: txt => setEditFields(f => ({ ...f, valor: txt })),
            keyboardType: 'numeric',
          }}
        />
        <LabeledInput
          label="Descrição"
          inputProps={{
            value: editFields.descricao,
            onChangeText: txt => setEditFields(f => ({ ...f, descricao: txt })),
            multiline: true,
            numberOfLines: 3,
            style: styles.textarea,
          }}
        />
        <LabeledInput
          label="Data"
          inputProps={{
            value: editFields.data_servico,
            onChangeText: txt =>
              setEditFields(f => ({ ...f, data_servico: formatarData(txt) })),
          }}
        />

        <SaveCancelButtons
          onSave={salvarEdicao}
          onCancel={() => setModalVisible(false)}
        />
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