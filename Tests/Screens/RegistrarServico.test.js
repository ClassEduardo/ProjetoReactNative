import renderer from 'react-test-renderer';
import { RegistrarServico } from '../../src/screens/RegistrarServico';

jest.mock('expo-sqlite');

it('Renderiza corretamente', () => {
    const tree = renderer.create(RegistrarServico).toJSON();
    expect(tree).toMatchSnapshot();
});