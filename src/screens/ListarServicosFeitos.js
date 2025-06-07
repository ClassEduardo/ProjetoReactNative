import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { listarServicosFeitos, atualizarServicoFeito, excluirServicoFeito, createTableServicosFeitos } from '../services/ServicosFeitosDB';

export default function ListarServicosFeitos() {
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

  async function carregarServicos() {
    await listarServicosFeitos((lista) => {
      const secoes = [];
      const agrupado = {};
      lista.forEach((item) => {
        if (!agrupado[item.data_servico]) agrupado[item.data_servico] = [];
        agrupado[item.data_servico].push(item);
      });
      Object.keys(agrupado).forEach(data => {
        secoes.push({ title: data, data: agrupado[data] });
      });
      setServicosFeitos(secoes);
    });
  }

  useFocusEffect(
    useCallback(() => {
      createTableServicosFeitos().catch(() => {});
      carregarServicos();
    }, [])
  );

  function confirmarExcluir(id) {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este serviço?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => excluir(id) }
      ]
    );
  }

  function excluir(id) {
    excluirServicoFeito(id, (ok) => {
      if (ok) carregarServicos();
      else Alert.alert("Erro ao excluir!");
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
    <View style={styles.container}>
      <SectionList
        sections={servicosFeitos}
        keyExtractor={item => item.id.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.secao}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.servicoItem}>
            <Text style={styles.tipo}>{item.tipo_servico}</Text>
            <Text style={styles.cliente}>Cliente: {item.nome_cliente}</Text>
            <Text style={styles.valor}>Valor: {item.valor}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
            <View style={styles.botoes}>
              <TouchableOpacity style={styles.btnAtualizar} onPress={() => abrirModalEditar(item)}>
                <Text style={{ color: '#007bff' }}>Atualizar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnExcluir} onPress={() => confirmarExcluir(item.id)}>
                <Text style={{ color: '#d00' }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 32 }}>Nenhum serviço registrado.</Text>}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <Text style={styles.label}>Tipo de serviço</Text>
            <TextInput style={styles.input} value={editFields.tipo_servico}
              onChangeText={txt => setEditFields(f => ({ ...f, tipo_servico: txt }))} />
            <Text style={styles.label}>Nome do cliente</Text>
            <TextInput style={styles.input} value={editFields.nome_cliente}
              onChangeText={txt => setEditFields(f => ({ ...f, nome_cliente: txt }))} />
            <Text style={styles.label}>Valor</Text>
            <TextInput style={styles.input} value={editFields.valor}
              onChangeText={txt => setEditFields(f => ({ ...f, valor: txt }))} keyboardType="numeric" />
            <Text style={styles.label}>Descrição</Text>
            <TextInput style={[styles.input, styles.textarea]} value={editFields.descricao}
              onChangeText={txt => setEditFields(f => ({ ...f, descricao: txt }))} multiline numberOfLines={3} />
            <Text style={styles.label}>Data</Text>
            <TextInput style={styles.input} value={editFields.data_servico}
              onChangeText={txt => setEditFields(f => ({ ...f, data_servico: txt }))} />

            <View style={styles.botoes}>
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
  servicoItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
    borderRadius: 6,
    padding: 12,
    elevation: 1,
  },
  tipo: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  cliente: {
    marginBottom: 2,
  },
  valor: {
    marginBottom: 2,
  },
  descricao: {
    marginBottom: 8,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  btnAtualizar: {
    marginRight: 18,
  },
  btnExcluir: {},
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
    height: 60,
    textAlignVertical: 'top',
  },
});
