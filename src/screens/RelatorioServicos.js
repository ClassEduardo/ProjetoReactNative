import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import Card from '../components/Card';
import { useFocusEffect } from '@react-navigation/native';
import { formatarBRL } from '../utils/format';
import { obterEstatisticasServicos } from '../services/ServicosFeitosDB';

export default function RelatorioServicos() {
  const [stats, setStats] = useState(null);

  const labelsFormaPagamento = {
    pix: 'Pix',
    debito: 'Débito',
    credito: 'Crédito',
    dinheiro: 'Dinheiro',
  };

  useFocusEffect(
    useCallback(() => {
      obterEstatisticasServicos().then(setStats).catch(() => setStats(null));
    }, [])
  );

  if (!stats || stats.totalServicos === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.msg}>Não há serviços cadastrados.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.title}>Top 3 soluções com valor mais alto no mês</Text>
        {stats.top3Caro.map((item, index) => (
          <Text key={index} style={styles.item}>{`${item.solucao} - ${formatarBRL(item.valor)}`}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.title}>Top 3 soluções com valor mais baixo no mês</Text>
        {stats.top3Baratos.map((item, index) => (
          <Text key={index} style={styles.item}>{`${item.solucao} - ${formatarBRL(item.valor)}`}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.item}>Total de serviços realizados no mês: {stats.totalServicos}</Text>
        <Text style={styles.item}>Montante faturado no mês: {formatarBRL(stats.montanteTotal)}</Text>
      </Card>

      <Card>
        <Text style={styles.title}>Faturamento por forma de pagamento no mês</Text>
        {Object.entries(stats.totaisFormasPagamento).map(([forma, total]) => (
          <Text key={forma} style={styles.item}>{`${labelsFormaPagamento[forma] || forma}: ${formatarBRL(total)}`}</Text>
        ))}
      </Card>
    </SafeAreaView>
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