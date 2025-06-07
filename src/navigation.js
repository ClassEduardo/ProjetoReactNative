import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CriarServico from '../screens/CriarServico';
import RegistrarServico from '../screens/RegistrarServico';
import ListarServicos from '../screens/ListarServicos';
import ListarServicosFeitos from '../screens/ListarServicosFeitos';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ListarServicosFeitos">
        <Drawer.Screen
          name="ListarServicosFeitos"
          component={ListarServicosFeitos}
          options={{ title: 'Serviços Feitos' }}
        />
        <Drawer.Screen
          name="CriarServico"
          component={CriarServico}
          options={{ title: 'Cadastrar Serviço' }}
        />
        <Drawer.Screen
          name="RegistrarServico"
          component={RegistrarServico}
          options={{ title: 'Registrar Serviço' }}
        />
        <Drawer.Screen
          name="ListarServicos"
          component={ListarServicos}
          options={{ title: 'Tipos de Serviço' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}