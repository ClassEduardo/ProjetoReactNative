import React, { useState } from 'react';
import { Button, StyleSheet, Alert, ToastAndroid, ScrollView, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import MaskedInput from '../components/MaskedInput';
import DateTimeInput from '../components/DateTimeInput';
import FormSection from '../components/FormSection';
import { inserirServicoFeito } from '../services/ServicosFeitosDB';
import { formatarCPF, formatarCelular, formatarValor } from '../utils/format';

const vazio = {
  numero_os: '',
  nome_cliente: '',
  cpf: '',
  celular: '',
  situacao: '',
  data_hora_entrada: '',
  data_hora_saida: '',
  vendedor: '',
  tecnico: '',
  equipamento: '',
  marca: '',
  modelo: '',
  n_serie: '',
  condicoes: '',
  defeito: '',
  solucao: '',
  valor: '',
  forma_pagamento: '',
};

export default function RegistrarServico() {
  const [form, setForm] = useState(vazio);

  const setCampo = campo => valor => setForm(f => ({ ...f, [campo]: valor }));

  function validar() {
    if (form.cpf && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) {
      Alert.alert('Atenção', 'CPF inválido');
      return false;
    }
    if (form.celular && !/^\(\d{2}\)\d{5}-\d{4}$/.test(form.celular)) {
      Alert.alert('Atenção', 'Celular inválido');
      return false;
    }
    return true;
  }

  function salvar() {
    if (!validar()) return;
    inserirServicoFeito(form, ok => {
      if (ok) {
        ToastAndroid.show('Serviço registrado com sucesso!', ToastAndroid.SHORT);
        setForm(vazio);
      } else {
        Alert.alert('Erro ao registrar o serviço!');
      }
    });
  }

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView>
        <FormSection title="Dados gerais">
          <MaskedInput label="Número OS" value={form.numero_os} onChangeText={setCampo('numero_os')} />
          <MaskedInput label="Cliente" value={form.nome_cliente} onChangeText={setCampo('nome_cliente')} />
          <MaskedInput label="CPF" value={form.cpf} onChangeText={setCampo('cpf')} format={formatarCPF} keyboardType="numbers-and-punctuation" />
          <MaskedInput label="Celular" value={form.celular} onChangeText={setCampo('celular')} format={formatarCelular} keyboardType="phone-pad" />
          <MaskedInput label="Situação" value={form.situacao} onChangeText={setCampo('situacao')} />
          <DateTimeInput label="Data de entrada" value={form.data_hora_entrada} onChange={setCampo('data_hora_entrada')} />
          <DateTimeInput label="Data de saída" value={form.data_hora_saida} onChange={setCampo('data_hora_saida')} />        </FormSection>
        <FormSection title="Responsável técnico">
          <MaskedInput label="Vendedor" value={form.vendedor} onChangeText={setCampo('vendedor')} />
          <MaskedInput label="Técnico" value={form.tecnico} onChangeText={setCampo('tecnico')} />
        </FormSection>
        <FormSection title="Dados do equipamento">
          <MaskedInput label="Equipamento" value={form.equipamento} onChangeText={setCampo('equipamento')} />
          <MaskedInput label="Marca" value={form.marca} onChangeText={setCampo('marca')} />
          <MaskedInput label="Modelo" value={form.modelo} onChangeText={setCampo('modelo')} />
          <MaskedInput label="Nº série" value={form.n_serie} onChangeText={setCampo('n_serie')} />
          <MaskedInput label="Condições que entra" value={form.condicoes} onChangeText={setCampo('condicoes')} />
          <MaskedInput label="Defeito" value={form.defeito} onChangeText={setCampo('defeito')} />
          <MaskedInput label="Solução" value={form.solucao} onChangeText={setCampo('solucao')} />
        </FormSection>
        <FormSection title="Pagamento">
          <MaskedInput label="Valor" value={form.valor} onChangeText={setCampo('valor')} format={formatarValor} keyboardType="numeric" />
          <MaskedInput label="Forma de pagamento" value={form.forma_pagamento} onChangeText={setCampo('forma_pagamento')} />
        </FormSection>
        <Button title="Salvar serviço" onPress={salvar} />
      </ScrollView>
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
