import React from 'react'
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CapturedPokemons from '../components/CapturedPokemons';
import { pokemonMap } from './PokemonFixture';

it('displays a list of captured pokemons', () =>{

  const onClick = () => {};
  const component = shallow(
    <CapturedPokemons
      pokemons={pokemonMap}
      handleOnClick={onClick}>
    </CapturedPokemons>
  );

  expect(toJson(component)).toMatchSnapshot();

})