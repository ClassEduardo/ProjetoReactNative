import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaskedInput from './MaskedInput';
import { formatarCPF, formatarDataHora } from '../utils/format';

export default function FiltrosHeader({ busca, setBusca, cpf, setCpf, entrada, setEntrada, saida, setSaida }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Filtros</Text>
      <MaskedInput label="Busca" value={busca} onChangeText={txt => setBusca(txt)} />
      <MaskedInput label="CPF" value={cpf} onChangeText={txt => setCpf(formatarCPF(txt))} />
      <MaskedInput label="Entrada" value={entrada} onChangeText={txt => setEntrada(formatarDataHora(txt))} />
      <MaskedInput label="Saída" value={saida} onChangeText={txt => setSaida(formatarDataHora(txt))} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
});