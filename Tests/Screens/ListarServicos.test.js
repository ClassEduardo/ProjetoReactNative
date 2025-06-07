import renderer, { act } from 'react-test-renderer';
import ListarServicos from '../../src/screens/ListarServicos';

jest.mock('expo-sqlite');

test('Renderiza corretamente', () => {
  let tree;
  act(() => {
    tree = renderer.create(ListarServicos);
  })
  expect(tree.toJSON()).toMatchSnapshot();
});