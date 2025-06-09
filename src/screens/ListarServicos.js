import React, { useCallback, useState } from 'react';
import { Text, FlatList, StyleSheet, Button, Alert, ToastAndroid } from 'react-native';
import SaveCancelButtons from '../components/SaveCancelButtons';
import ScreenContainer from '../components/ScreenContainer';
import LabeledInput from '../components/LabeledInput';
import CenteredModal from '../components/CenteredModal';
import ServicoItem from '../components/ServicoItem';
import { listarServicos, atualizarServico, excluirServico } from '../services/ServicoBD';
import { atualizarTipoEmServicosFeitos } from '../services/ServicosFeitosDB';
import { useFocusEffect } from '@react-navigation/native';


export default function ListarServicos() {
  const [servicos, setServicos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoEditando, setServicoEditando] = useState(null);
  const [nomeEdit, setNomeEdit] = useState('');
  const [descricaoEdit, setDescricaoEdit] = useState('');

  function buscarServicos() {
    listarServicos((lista) => setServicos(lista));
  }

  useFocusEffect(
    useCallback(() => {
      buscarServicos();
    }, [])
  );

  const abrirModalEdicao = (servico) => {
    setServicoEditando(servico);
    setNomeEdit(servico.nome);
    setDescricaoEdit(servico.descricao);
    setModalVisible(true);
  };

  const salvarEdicao = () => {
    if (!nomeEdit.trim()) {
      Alert.alert('Atenção', 'O nome do serviço é obrigatório!');
      return;
    }
    atualizarServico(servicoEditando.id, nomeEdit, descricaoEdit, (ok) => {
      if (ok) {
        atualizarTipoEmServicosFeitos(
          servicoEditando.nome,
          nomeEdit,
          () => buscarServicos()
        );
        ToastAndroid.show('Serviço atualizado!', ToastAndroid.SHORT)
        setModalVisible(false);
      } else {
        Alert.alert('Erro ao atualizar o serviço!');
      }
    });
  };

  const confirmarExcluir = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este serviço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            excluirServico(id, (ok) => {
              if (ok) {
                buscarServicos();
              } else {
                Alert.alert('Erro ao excluir!');
              }
            });
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <ServicoItem
      nome={item.nome}
      descricao={item.descricao}
      onEdit={() => abrirModalEdicao(item)}
      onDelete={() => confirmarExcluir(item.id)}
    />
  );

  return (
    <ScreenContainer style={styles.container}>
      <FlatList
        data={servicos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Não há de serviço cadastrado.</Text>}
      />
      <CenteredModal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <LabeledInput
          label="Nome do serviço"
          inputProps={{ value: nomeEdit, onChangeText: setNomeEdit }}
        />
        <LabeledInput
          label="Descrição"
          inputProps={{
            value: descricaoEdit,
            onChangeText: setDescricaoEdit,
            multiline: true,
            numberOfLines: 3,
            style: styles.textarea,
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
  textarea: {
    height: 70,
    textAlignVertical: 'top',
  },
});
