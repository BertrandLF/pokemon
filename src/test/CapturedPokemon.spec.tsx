import React from 'react'
import CapturedPokemon from '../components/CapturedPokemon';
import { psyduck } from './PokemonFixture';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

it('renders pokemon details', () => {

  const onClick = () => {};
  const component = shallow(
    <CapturedPokemon
      pokemon={psyduck}
      handleOnClick={onClick}>
    </CapturedPokemon>
  );

  expect(toJson(component)).toMatchSnapshot();

});