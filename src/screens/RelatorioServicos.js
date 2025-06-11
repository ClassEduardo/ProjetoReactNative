import React, { useState, useCallback } from 'react';
import { Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import { useFocusEffect } from '@react-navigation/native';
import { formatarBRL } from '../utils/format';
import { obterEstatisticasServicos } from '../services/ServicosFeitosDB';
import styles from '../styles/CommonStyles';

export default function RelatorioServicos() {
  const [estatisticas, setEstatisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  const labelsFormaPagamento = {
    pix: 'Pix',
    debito: 'Débito',
    credito: 'Crédito',
    dinheiro: 'Dinheiro',
  };

  useFocusEffect(
    useCallback(() => {
      obterEstatisticasServicos()
        .then(res => {
          setEstatisticas(res);
          setLoading(false);
        })
        .catch(() => {
          setEstatisticas(null);
          setLoading(false);
        });
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
      </SafeAreaView>
    );
  }

  if (!estatisticas || estatisticas.total_servicos === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.relatorio_msg}>Não há serviços cadastrados.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <Card>
        <Text style={styles.relatorio_title}>Top 3 soluções com valor mais alto no mês</Text>
        {estatisticas.top_3_caro.map((item, index) => (
          <Text key={index} style={styles.relatorio_item}>{`${item.solucao} - ${formatarBRL(item.valor)}`}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.relatorio_title}>Top 3 soluções com valor mais baixo no mês</Text>
        {estatisticas.top_3_baratos.map((item, index) => (
          <Text key={index} style={styles.relatorio_item}>{`${item.solucao} - ${formatarBRL(item.valor)}`}</Text>
        ))}
      </Card>

      <Card>
        <Text style={styles.relatorio_item}>Total de serviços realizados no mês: {estatisticas.total_servicos}</Text>
        <Text style={styles.relatorio_item}>Montante faturado no mês: {formatarBRL(estatisticas.montante_total)}</Text>
      </Card>

      <Card>
        <Text style={styles.relatorio_title}>Faturamento por forma de pagamento no mês</Text>
        {Object.entries(estatisticas.totais_formas_pagamento).map(([forma, total]) => (
          <Text key={forma} style={styles.relatorio_item}>{`${labels_forma_pagamento[forma] || forma}: ${formatarBRL(total)}`}</Text>
        ))}
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
}