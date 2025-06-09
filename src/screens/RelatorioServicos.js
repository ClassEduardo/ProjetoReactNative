import React, { useState, useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import { useFocusEffect } from '@react-navigation/native';
import { formatarBRL } from '../utils/format';
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
      <ScreenContainer style={styles.container}>
        <Text style={styles.msg}>Não há serviços cadastrados.</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      <Card>
        <Text style={styles.title}>Top 3 serviços mais realizados</Text>
        {stats.top3.map((item, index) => (
          <Text key={index} style={styles.item}>{`${item.servico} - ${item.quantidade}`}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.item}>Serviço mais caro: {stats.maisCaro.servico} - {formatarBRL(stats.maisCaro.valor)}</Text>
        <Text style={styles.item}>Serviço mais barato: {stats.maisBarato.servico} - {formatarBRL(stats.maisBarato.valor)}</Text>
      </Card>

      <Card>
        <Text style={styles.item}>Total de serviços realizados: {stats.totalServicos}</Text>
        <Text style={styles.item}>Montante faturado: {formatarBRL(stats.montanteTotal)}</Text>
        <Text style={styles.item}>Média de serviços por mês: {stats.mediaServicosMes.toFixed(2)}</Text>
        <Text style={styles.item}>Média de faturamento por mês: {formatarBRL(stats.mediaValorMes)}</Text>
      </Card>
    </ScreenContainer>
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
    fontSize: 16,
  },
  msg: {
    marginTop: 32,
    textAlign: 'center',
  },
});