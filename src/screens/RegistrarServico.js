import React, { useState, useCallback  } from 'react';
import { View, Text, Button, StyleSheet, Alert, ToastAndroid } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import LabeledInput from '../components/LabeledInput';import { Picker } from '@react-native-picker/picker';
import { listarServicos } from '../services/ServicoBD';
import { inserirServicoFeito } from '../services/ServicosFeitosDB';
import { useFocusEffect } from '@react-navigation/native';

export default function RegistrarServico() {
  const [servicos, setServicos] = useState([]);
  const [tipoServico, setTipoServico] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');

  useFocusEffect(
    useCallback(() => {
      listarServicos((lista) => setServicos(lista));
    }, [])
  );


  const formatarData = (texto) => {
    const somenteNumeros = texto.replace(/[^0-9]/g, '').slice(0, 8);
    if (somenteNumeros.length >= 5) {
      return somenteNumeros.replace(
        /(\d{2})(\d{2})(\d{0,4}).*/,
        '$1/$2/$3'
      );
    }
    if (somenteNumeros.length >= 3) {
      return somenteNumeros.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    return somenteNumeros;
  };

  const salvarServico = () => {
    if (!tipoServico || !valor.trim() || !data.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!\nTipo de serviço, Valor do serviço e Data do serviço');
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
      <Text style={styles.label}>Tipo de serviço</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipoServico}
          onValueChange={(itemValue) => setTipoServico(itemValue)}
        >
          <Picker.Item label='Selecione um serviço' value="" />
          {servicos.map(s => (
            <Picker.Item key={s.id} label={s.nome} value={s.nome} />
          ))}
        </Picker>
      </View>
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
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
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
