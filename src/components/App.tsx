import React, { useState, useEffect } from 'react';
import WildPokemons from './WildPokemons';
import CapturedPokemons from './CapturedPokemons';
import Pokemon from './Pokemon';
import './styles/App.css';

const App = () => {

  const [wildPokemons, setWildPokemons] = useState(new Map<number, Pokemon>());
  const [capturedPokemons, setCapturedPokemons] = useState(new Map<number, Pokemon>());
  const [pokeBalls, setPokeBalls] = useState(6);
  const [loadedPokemonId, setLoadedPokemonId] = useState(1);

  useEffect(() => {
    const addPokemon = () => {
      if (loadedPokemonId < 152) {
        fetchPokemon(loadedPokemonId)
          .then(data => {
            const pokemon = new Pokemon(data);
            wildPokemons.set(pokemon.id, pokemon);
            setWildPokemons(wildPokemons);
            setLoadedPokemonId(loadedPokemonId + 1);
          })
          .catch(err => console.log('Failed to load pokemon!', err));
      }
    }
    var timerID = setInterval(() => addPokemon(), 500);

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [wildPokemons, loadedPokemonId]);

  const capture = (id: number) => {
    if (pokeBalls > 0) {
          const pokemon = wildPokemons.get(id);
          if (pokemon) {
            capturedPokemons.set(pokemon.id, pokemon);
            wildPokemons.delete(pokemon.id);
            setCapturedPokemons(capturedPokemons);
            setWildPokemons(wildPokemons);
            setPokeBalls(pokeBalls - 1);
          } else {
            console.log('Failed to catch it!');
          }
    }
  }

  const fetchPokemon = (id: number): Promise<JSON> => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      method: "GET",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json());
  }

  const release = (pokemon: Pokemon) => {
    capturedPokemons.delete(pokemon.id);
    wildPokemons.set(pokemon.id, pokemon);
    setCapturedPokemons(capturedPokemons);
    setWildPokemons(wildPokemons);
    setPokeBalls(pokeBalls + 1);
  }

  return (
    <div className="App">
      <WildPokemons
        pokemons={wildPokemons}
        handleOnClick={capture} />
      <CapturedPokemons
        pokemons={capturedPokemons}
        handleOnClick={release} />
    </div>
  );

}

export default App;
