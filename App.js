import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import CriarServico from './src/screens/CriarServico';
import RegistrarServico from './src/screens/RegistrarServico';
import ListarServicos from './src/screens/ListarServicos';
import { createTableServicos } from './src/services/ServicoBD';
import { createTableServicosFeitos } from './src/services/ServicosFeitosDB';

export default function App() {
  useEffect(() => {
    createTableServicos().catch(console.error);
    createTableServicosFeitos().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <RegistrarServico />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
});