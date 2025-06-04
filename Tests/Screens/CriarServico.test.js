import renderer from 'react-test-renderer';
import CriarServico from '../../src/Screens/CriarServico';
import CriarServico from '../../src/screens/CriarServico';

it('Renderiza corretamente', () => {
    const tree = renderer.create(<CriarServico />).toJSON();
    expect(tree).toBeTruthy();
});