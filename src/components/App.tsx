import React, { useState, useEffect } from 'react';
import WildPokemons from './WildPokemons';
import CapturedPokemons from './CapturedPokemons';
import Pokemon from './Pokemon';
import './styles/App.css';

function App() {

  const [wildPokemons, setWildPokemons] = useState(new Map<number, Pokemon>());
  const [capturedPokemons, setCapturedPokemons] = useState(new Map<number, Pokemon>());
  const [pokeBalls, setPokeBalls] = useState(6);
  const [loadedPokemonId, setLoadedPokemonId] = useState(1);

  useEffect(() => {
    var timerID = setInterval(() => addPokemon(), 500);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function addPokemon() {
    if (loadedPokemonId < 152) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${loadedPokemonId}`, {
        method: "GET",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(res => res.json())
        .then(data => {
          const pokemon = new Pokemon(data);
          wildPokemons.set(pokemon.id, pokemon);
          setWildPokemons(wildPokemons);
          setLoadedPokemonId(loadedPokemonId + 1);
        })
        .catch(err => console.log('Failed to catch it !', err));
    }
  }

  function capture(id: number) {
    if (pokeBalls > 0) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        method: "GET",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(res => res.json())
        .then(data => {
          const pokemon = new Pokemon(data);
          capturedPokemons.set(pokemon.id, pokemon);
          wildPokemons.delete(pokemon.id);
          setCapturedPokemons(capturedPokemons);
          setWildPokemons(wildPokemons);
          setPokeBalls(pokeBalls - 1);
        })
        .catch(err => console.log('Failed to catch it !', err));
    }
  }

  function release(pokemon: Pokemon) {
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
