import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { NavigationContainer } from '@react-navigation/native';
import RelatorioServicos from '../../src/screens/RelatorioServicos';

jest.mock('expo-sqlite');

test('Renderiza corretamente', () => {
  let tree;
  act(() => {
    tree = renderer.create( 
      <NavigationContainer>
        RelatorioServicos
      </NavigationContainer>
    ).toJSON();
  })
  expect(tree).toMatchSnapshot();
});