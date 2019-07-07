import React from 'react'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import WildPokemon from '../components/WildPokemon';
import { psyduck } from './PokemonFixture';

it('renders a Pokemon', () => {

  const onClick = () => { };
  const component = shallow(
    <WildPokemon
      pokemon={psyduck}
      handleOnClick={onClick}>
    </WildPokemon>
  )

  expect(toJson(component)).toMatchSnapshot();

})