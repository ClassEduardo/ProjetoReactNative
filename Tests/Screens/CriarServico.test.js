import renderer, { act } from 'react-test-renderer';
import { CriarServico } from '../../src/screens/CriarServico';

jest.mock('expo-sqlite');

it('Renderiza corretamente', () => {
    let tree;

    act(() => {
        tree = renderer.create(CriarServico);
    })

    expect(tree.toJSON()).toMatchSnapshot();
});