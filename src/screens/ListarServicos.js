import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Button, Alert, ToastAndroid } from 'react-native';
import { listarServicos, atualizarServico } from '../services/ServicoBD'; // ajuste o caminho se necessário

export default function ListarServicos() {
  const [servicos, setServicos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoEditando, setServicoEditando] = useState(null);
  const [nomeEdit, setNomeEdit] = useState('');
  const [descricaoEdit, setDescricaoEdit] = useState('');

  function buscarServicos() {
    listarServicos((lista) => setServicos(lista));
  }

  useEffect(() => {
    buscarServicos();
  }, []);

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
        ToastAndroid.show('Serviço atualizado!', ToastAndroid.SHORT)
        setModalVisible(false);
        buscarServicos();
      } else {
        Alert.alert('Erro ao atualizar o serviço!');
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.servicoItem}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
      <TouchableOpacity style={styles.botaoEditar} onPress={() => abrirModalEdicao(item)}>
        <Text style={{ color: '#007bff' }}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={servicos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{textAlign: 'center'}}>Nenhum serviço cadastrado.</Text>}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <Text style={styles.label}>Nome do serviço</Text>
            <TextInput
              style={styles.input}
              value={nomeEdit}
              onChangeText={setNomeEdit}
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={descricaoEdit}
              onChangeText={setDescricaoEdit}
              multiline
              numberOfLines={3}
            />
            <View style={{ gap: 12 }}>
              <Button title="Salvar alterações" onPress={salvarEdicao} />
              <Button title="Cancelar" color="gray" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  servicoItem: {
    backgroundColor: '#f3f3f3',
    marginBottom: 12,
    borderRadius: 6,
    padding: 12,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  descricao: {
    marginBottom: 8,
  },
  botaoEditar: {
    alignSelf: 'flex-end',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
    width: '90%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
  textarea: {
    height: 70,
    textAlignVertical: 'top',
  },
});

