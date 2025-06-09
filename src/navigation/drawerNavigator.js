import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegistrarServico from '../screens/RegistrarServico';
import ListarServicosFeitos from '../screens/ListarServicosFeitos';
import RelatorioServicos from '../screens/RelatorioServicos';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="RelatorioServicos">
        <Drawer.Screen
          name="RelatorioServicos"
          component={RelatorioServicos}
          options={{ title: 'Relatório' }}
        />
        <Drawer.Screen
          name="ListarServicosFeitos"
          component={ListarServicosFeitos}
          options={{ title: 'Serviços feitos' }}
        />
        <Drawer.Screen
          name="RegistrarServico"
          component={RegistrarServico}
          options={{ title: 'Registrar serviço' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}