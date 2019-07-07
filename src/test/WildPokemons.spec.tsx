import React from 'react'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import WildPokemons from '../components/WildPokemons';
import { pokemonMap } from './PokemonFixture';

it('displays wildPokemons given list of pokemons', () => {

  const onClick = () => {};
  const component = shallow(
    <WildPokemons
      pokemons={pokemonMap}
      handleOnClick={onClick}>
    </WildPokemons>
  );

  expect(toJson(component)).toMatchSnapshot();
})

