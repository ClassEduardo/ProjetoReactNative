import React, { useState } from 'react';
import { Button, Alert, ToastAndroid, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import LabeledInput from '../components/LabeledInput';
import { inserirServico } from '../services/ServicoBD';

export default function CriarServico() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  const salvarServico = () => {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'O nome do serviço é obrigatório!');
      return;
    }
    inserirServico(nome, descricao, (ok) => {
      if (ok) {
        ToastAndroid.show('Serviço cadastrado!', ToastAndroid.SHORT);
        setNome('');
        setDescricao('');
      } else {
        Alert.alert('Erro ao salvar!');
      }
    });
  };

  return (
    <ScreenContainer>
      <LabeledInput
        label="Nome do serviço"
        inputProps={{
          placeholder: 'Ex: Troca de tela',
          value: nome,
          onChangeText: setNome,
        }}
      />

      <LabeledInput
        label="Descrição"
        inputProps={{
          placeholder: 'Ex: Troca da tela quebrada por uma nova',
          value: descricao,
          onChangeText: setDescricao,
          multiline: true,
          numberOfLines: 4,
          style: styles.textarea,
        }}
      />

      <Button title="Salvar" onPress={salvarServico} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  textarea: {
    minWidth: '100%',
    textAlignVertical: 'top',
  },
});