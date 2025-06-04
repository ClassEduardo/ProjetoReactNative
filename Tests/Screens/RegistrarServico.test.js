import renderer, { act } from 'react-test-renderer';
import { RegistrarServico } from '../../src/screens/RegistrarServico';

jest.mock('expo-sqlite');

it('Renderiza corretamente', () => {
    let tree;

    act(() => {
        tree = renderer.create(RegistrarServico);
    })
    expect(tree.toJSON()).toMatchSnapshot();
});