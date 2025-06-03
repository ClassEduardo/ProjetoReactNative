import renderer from 'react-test-renderer';
import CriarServico from '../../src/Screens/CriarServico';

it('Renderiza corretamente', () => {
    const tree = renderer.create(<CriarServico/>).toJSON();
    expect(tree).toMatchInlineSnapshot(`null`);
});
