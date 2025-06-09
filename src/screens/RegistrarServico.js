import React, { useState } from 'react';
import { Button, StyleSheet, Alert, ToastAndroid } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import LabeledInput from '../components/LabeledInput';
import { inserirServicoFeito } from '../services/ServicosFeitosDB';
import { formatarData } from '../utils/format';

export default function RegistrarServico() {
  const [nomeCliente, setNomeCliente] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  const salvarServico = () => {
    if (!servico.trim() || !valor.trim() || !data.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!\nNome do serviço, Valor do serviço e Data do serviço');
    }

    if (!/^\d{2}\/\d{2}/.test(data.trim())) {
      Alert.alert('Atenção', 'Informe a data com dia e mês (DD/MM)');
      return;
    }

    inserirServicoFeito(servico, nomeCliente, valor, descricao, data, (ok) => {
      if (ok) {
        ToastAndroid.show('Serviço registrado com sucesso!', ToastAndroid.SHORT);
        setServico('');
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
    <ScreenContainer style={styles.container}>
      <LabeledInput
        label="Nome do serviço"
        inputProps={{
          placeholder: 'Ex: Troca de tela',
          value: servico,
          onChangeText: setServico,
          style: styles.input,
        }}
      />
      <LabeledInput
        label="Nome do cliente"
        inputProps={{
          placeholder: 'Ex: João da Silva',
          value: nomeCliente,
          onChangeText: setNomeCliente,
          style: styles.input,
        }}
      />

      <LabeledInput
        label="Valor do serviço"
        inputProps={{
          placeholder: 'Ex: 120',
          value: valor,
          onChangeText: setValor,
          keyboardType: 'numeric',
          style: styles.input,
        }}
      />

      <LabeledInput
        label="Descrição"
        inputProps={{
          placeholder: 'Ex: Troca de tela com peça original',
          value: descricao,
          onChangeText: setDescricao,
          multiline: true,
          numberOfLines: 3,
          style: [styles.input, styles.textarea],
        }}
      />

      <LabeledInput
        label="Data do serviço"
        inputProps={{
          placeholder: 'Ex: 05/06/2025',
          value: data,
          onChangeText: (t) => setData(formatarData(t)),
          keyboardType: 'numbers-and-punctuation',
          maxLength: 10,
          style: styles.input,
        }}
      />

      <Button title='Salvar serviço' onPress={salvarServico} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  textarea: {
    minWidth: '100%',
    textAlignVertical: "top",
  },
});
