
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { inserirServico } from '../services/ServicoBD';

export default function CriarServico (){
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const salvarServico = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O nome do serviço é obrigatório!');
      return;
    }
    inserirServico(nome, descricao, (ok) => {
      if (ok) {
        Alert.alert('Serviço cadastrado!');
        setNome('');
        setDescricao('');
      } else {
        Alert.alert('Erro ao salvar!');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Troca de tela"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Ex: Troca da tela quebrada por uma nova"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />

      <Button title="Salvar" onPress={salvarServico} />
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
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
