import React, { useState } from 'react';
import { Pressable, Alert, ToastAndroid, ScrollView, Text, KeyboardAvoidingView, SafeAreaView, ActivityIndicator } from 'react-native'; import MaskedInput from '../components/MaskedInput';
import DateTimeInput from '../components/DateTimeInput';
import FormSection from '../components/FormSection';
import PickerInput from '../components/PickerInput';
import { inserirServicoFeito } from '../services/ServicosFeitosDB';
import { formatarCPF, formatarCelular, formatarValor } from '../utils/format';
import styles from '../styles/CommonStyles';


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
  const [loading, setLoading] = useState(false);

  const setCampo = campo => valor => setForm(f => ({ ...f, [campo]: valor }));

  function validar() {
    const obrigatorios = {
      'Número OS': form.numero_os,
      'Nome cliente': form.nome_cliente,
      CPF: form.cpf,
      'Data de entrada': form.data_hora_entrada,
      Equipamento: form.equipamento,
      Valor: form.valor,
      'Forma de pagamento': form.forma_pagamento,
    };

    const faltando = Object.entries(obrigatorios)
      .filter(([, v]) => !v)
      .map(([label]) => `\u2022 ${label}`);

    if (faltando.length) {
      Alert.alert('Campos obrigatórios', `Preencha:\n${faltando.join('\n')}`);
      return false;
    }

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
    setLoading(true);
    inserirServicoFeito(form, ok => {
      setLoading(false);
      if (ok) {
        ToastAndroid.show('Serviço registrado com sucesso!', ToastAndroid.SHORT);
        setForm(vazio);
      } else {
        Alert.alert('Erro ao registrar o serviço!');
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        >
          <FormSection title="Dados gerais">
            <MaskedInput
              label="Número OS"
              value={form.numero_os}
              onChangeText={setCampo('numero_os')}
            />
            <MaskedInput
              label="Nome cliente"
              value={form.nome_cliente}
              onChangeText={setCampo('nome_cliente')}
            />
            <MaskedInput
              label="CPF"
              value={form.cpf}
              onChangeText={setCampo('cpf')}
              format={formatarCPF}
              keyboardType="numbers-and-punctuation"
            />
            <MaskedInput
              label="Celular"
              value={form.celular}
              onChangeText={setCampo('celular')}
              format={formatarCelular}
              keyboardType="phone-pad"
            />
            <MaskedInput
              label="Situação"
              value={form.situacao}
              onChangeText={setCampo('situacao')}
            />
            <DateTimeInput
              label="Data de entrada"
              value={form.data_hora_entrada}
              onChange={setCampo('data_hora_entrada')}
            />
            <DateTimeInput
              label="Data de saída"
              value={form.data_hora_saida}
              onChange={setCampo('data_hora_saida')}
            />
          </FormSection>

          <FormSection title="Responsável técnico">
            <MaskedInput
              label="Vendedor"
              value={form.vendedor}
              onChangeText={setCampo('vendedor')}
            />
            <MaskedInput
              label="Técnico"
              value={form.tecnico}
              onChangeText={setCampo('tecnico')}
            />
          </FormSection>

          <FormSection title="Dados do equipamento">
            <MaskedInput
              label="Equipamento"
              value={form.equipamento}
              onChangeText={setCampo('equipamento')}
            />
            <MaskedInput
              label="Marca"
              value={form.marca}
              onChangeText={setCampo('marca')}
            />
            <MaskedInput
              label="Modelo"
              value={form.modelo}
              onChangeText={setCampo('modelo')}
            />
            <MaskedInput
              label="Nº série"
              value={form.n_serie}
              onChangeText={setCampo('n_serie')}
            />
            <MaskedInput
              label="Condições que entra"
              value={form.condicoes}
              onChangeText={setCampo('condicoes')}
            />
            <MaskedInput
              label="Defeito"
              value={form.defeito}
              onChangeText={setCampo('defeito')}
            />
            <MaskedInput
              label="Solução"
              value={form.solucao}
              onChangeText={setCampo('solucao')}
            />
          </FormSection>
          <FormSection title="Pagamento">
            <MaskedInput
              label="Valor"
              value={form.valor}
              onChangeText={setCampo('valor')}
              format={formatarValor}
              keyboardType="numeric"
            />
            <PickerInput
              label="Forma de pagamento"
              selectedValue={form.forma_pagamento}
              onValueChange={setCampo('forma_pagamento')}
              items={[
                { label: 'Pix', value: 'pix' },
                { label: 'Débito', value: 'debito' },
                { label: 'Crédito', value: 'credito' },
                { label: 'Dinheiro', value: 'dinheiro' },
              ]}
            />
          </FormSection>
          <Pressable style={styles.saveButton} onPress={salvar} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveButtonText}>Salvar serviço</Text>
            )}
            </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

