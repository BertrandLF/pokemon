import React, { Component, useState, useEffect } from 'react';
import WildPokemons from './WildPokemons';
import CapturedPokemons from './CapturedPokemons';
import Pokemon from './Pokemon';
import './styles/App.css';
import ReactDOM from 'react-dom';

function App() {

  const [wildPokemons, setWildPokemons] = useState(new Set<Pokemon>());
  const [capturedPokemons, setCapturedPokemons] = useState(new Array<Pokemon>());
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
          wildPokemons.add(pokemon);
          setWildPokemons(wildPokemons);
          setLoadedPokemonId(loadedPokemonId + 1);
        })
        .catch(err => console.log('Failed to catch it !', err));
    }
  }

  function capture(id: number) {
    const index = id - 1;
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
          capturedPokemons.push(pokemon);
          wildPokemons.delete(pokemon);
          setCapturedPokemons(capturedPokemons);
          setWildPokemons(wildPokemons);
          setPokeBalls(pokeBalls - 1);
        })
        .catch(err => console.log('Failed to catch it !', err));
    }
  }

  function release(index: number) {
    const pokemon: Pokemon = capturedPokemons[index];
    capturedPokemons.splice(index, 1);
    wildPokemons.add(pokemon);
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
