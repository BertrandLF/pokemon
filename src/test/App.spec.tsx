import React from 'react';
import App from '../components/App';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactTestRenderer, { act } from 'react-test-renderer';
import retry from '@skidding/async-retry';
import fetchMock from 'fetch-mock';
import { psyduckData, psyduck } from './PokemonFixture';
import WildPokemon from '../components/WildPokemon';
import WildPokemons from '../components/WildPokemons';
import CapturedPokemon from '../components/CapturedPokemon';

it('renders without crashing', () => {
  const app = shallow(<App />);
  expect(toJson(app)).toMatchSnapshot()
});

describe('App effects tests', () => {

  fetchMock.get('begin:https://pokeapi.co/api/v2/pokemon', psyduckData);
  let container: any;
  let containerInstance: any;
  beforeEach(() => {
    act(() => {
      container = ReactTestRenderer.create(<App />)
    });
    containerInstance = container.root;
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('adds pokemons automatically', async () => {
    const expectedWildPokemons = new Map([[psyduck.id, psyduck]]);
    const wildPokemons = containerInstance.findByType(WildPokemons);

    await retry(() => {
      expect(wildPokemons.props.pokemons).toEqual(expectedWildPokemons);
    });
  });

  it('captures pokemons', async () => {
    let wildPokemon: any;

    await retry(() => {
      wildPokemon = containerInstance.findByType(WildPokemon);
      expect(wildPokemon.props.pokemon).toEqual(psyduck);
    });

    act(() => {
      wildPokemon.props.handleOnClick(psyduck.id);
    });

    await retry(() => {
      const capturedPokemon = containerInstance.findByType(CapturedPokemon);
      expect(capturedPokemon.props.pokemon).toEqual(psyduck);
    });

  });

  it('releases pokemons', async() => {
    let wildPokemon: any;
    let capturedPokemon: any;

    await retry(() => {
      wildPokemon = containerInstance.findByType(WildPokemon);
      expect(wildPokemon.props.pokemon).toEqual(psyduck);
    });

    act(() => {
      wildPokemon.props.handleOnClick(psyduck.id);
    });

    await retry(() => {
      capturedPokemon = containerInstance.findByType(CapturedPokemon);
      expect(capturedPokemon.props.pokemon).toEqual(psyduck);
    });

    act(() => {
      capturedPokemon.props.handleOnClick(psyduck);
    })

    await retry(() => {
      wildPokemon = containerInstance.findByType(WildPokemon);
      expect(wildPokemon.props.pokemon).toEqual(psyduck);
    });

  });



})
