import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { createTableServicos } from './src/services/ServicoBD';
import { createTableServicosFeitos } from './src/services/ServicosFeitosDB';

export default function App() {
  useEffect(() => {
    createTableServicos().catch(console.error);
    createTableServicosFeitos().catch(console.error);
  }, []);

  return (
    <View style={styles.container}>
      <DrawerNavigator />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
  },
});