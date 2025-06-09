import React, { useState, useCallback } from 'react';
import { Button, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ScreenContainer from '../components/ScreenContainer';
import LabeledInput from '../components/LabeledInput';
import LabeledPicker from '../components/LabeledPicker';
import { listarServicos } from '../services/ServicoBD';
import { inserirServicoFeito } from '../services/ServicosFeitosDB';
import { useFocusEffect } from '@react-navigation/native';
import { formatarData } from '../utils/format';

export default function RegistrarServico() {
  const [servicos, setServicos] = useState([]);
  const [tipoServico, setTipoServico] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  useFocusEffect(
    useCallback(() => {
      listarServicos((lista) => {
        if (Array.isArray(lista)) setServicos(lista);
        else setServicos([]);
      });
    }, [])
  );

  const salvarServico = () => {
    if (!tipoServico || !valor.trim() || !data.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!\nTipo de serviço, Valor do serviço e Data do serviço');
      return;
    }

    if (!/^\d{2}\/\d{2}/.test(data.trim())) {
      Alert.alert('Atenção', 'Informe a data com dia e mês (DD/MM)');
      return;
    }

    inserirServicoFeito(tipoServico, nomeCliente, valor, descricao, data, (ok) => {
      if (ok) {
        ToastAndroid.show('Serviço registrado com sucesso!', ToastAndroid.SHORT);
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
    <ScreenContainer style={styles.container}>
      <LabeledPicker
        label="Tipo de serviço"
        selectedValue={tipoServico}
        onValueChange={(itemValue) => setTipoServico(itemValue)}
      >
        <Picker.Item label="Selecione um serviço" value="" />
        {servicos.map((s) => (
          <Picker.Item key={s.id} label={s.nome} value={s.nome} />
        ))}
      </LabeledPicker>
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
