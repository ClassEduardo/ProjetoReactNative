import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { obterEstatisticasServicos } from '../services/ServicosFeitosDB';

export default function RelatorioServicos() {
  const [stats, setStats] = useState(null);

  useFocusEffect(
    useCallback(() => {
      obterEstatisticasServicos().then(setStats).catch(() => setStats(null));
    }, [])
  );

  if (!stats || stats.totalServicos === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.msg}>Não há serviços registrados.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Top 3 serviços mais realizados</Text>
        {stats.top3.map((item, index) => (
          <Text key={index} style={styles.item}>{`${item.tipo_servico} - ${item.quantidade}`}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.item}>Serviço mais caro: {stats.maisCaro.tipo_servico} - {stats.maisCaro.valor}</Text>
        <Text style={styles.item}>Serviço mais barato: {stats.maisBarato.tipo_servico} - {stats.maisBarato.valor}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.item}>Total de serviços realizados: {stats.totalServicos}</Text>
        <Text style={styles.item}>Montante faturado: {stats.montanteTotal}</Text>
        <Text style={styles.item}>Média de serviços por mês: {stats.mediaServicosMes.toFixed(2)}</Text>
        <Text style={styles.item}>Média de faturamento por mês: {stats.mediaValorMes.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f4f4f4',
    borderRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    marginBottom: 4,
  },
  msg: {
    marginTop: 32,
    textAlign: 'center',
  },
});