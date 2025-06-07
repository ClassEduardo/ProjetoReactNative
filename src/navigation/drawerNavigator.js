import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CriarServico from '../screens/CriarServico';
import RegistrarServico from '../screens/RegistrarServico';
import ListarServicos from '../screens/ListarServicos';
import ListarServicosFeitos from '../screens/ListarServicosFeitos';
import RelatorioServicos from '../screens/RelatorioServicos';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ListarServicosFeitos">
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
          name="CriarServico"
          component={CriarServico}
          options={{ title: 'Cadastrar serviço' }}
        />
        <Drawer.Screen
          name="RegistrarServico"
          component={RegistrarServico}
          options={{ title: 'Registrar serviço' }}
        />
        <Drawer.Screen
          name="ListarServicos"
          component={ListarServicos}
          options={{ title: 'Tipos de serviço' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}