import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { listarServicos } from '../services/ServicoBD';
import { inserirServicoFeito } from '../services/ServicosFeitosDB';

export default function RegistrarServico() {
  const [servicos, setServicos] = useState([]);
  const [tipoServico, setTipoServico] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    listarServicos((lista) => setServicos(lista));
  }, []);

  const salvarServico = () => {
    if (!tipoServico || !nomeCliente.trim() || !valor.trim() || !data.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      return;
    }
    inserirServicoFeito(tipoServico, nomeCliente, valor, descricao, data, (ok) => {
      if (ok) {
        Alert.alert('Serviço registrado com sucesso!');
        setTipoServico('');
        setNomeCliente('');
        setValor('');
        setDescricao('');
        setData('');
      } else {
        Alert.alert('Erro ao registrar o serviço!');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de serviço</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoServico}
          onValueChange={(itemValue) => setTipoServico(itemValue)}
        >
          <Picker.Item label="Selecione um serviço" value="" />
          {servicos.map(s => (
            <Picker.Item key={s.id} label={s.nome} value={s.nome} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Nome do cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: João da Silva"
        value={nomeCliente}
        onChangeText={setNomeCliente}
      />

      <Text style={styles.label}>Valor do serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 120"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Ex: Troca de tela com peça original"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Data do serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 05/06/2025"
        value={data}
        onChangeText={setData}
      />

      <Button title="Salvar serviço" onPress={salvarServico} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  textarea: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
});
