import React, { Component } from 'react';
import WildPokemons from './WildPokemons';
import CapturedPokemons from './CapturedPokemons';
import Pokemon from './Pokemon';
import './styles/App.css';
class App extends Component {

  state = {
    wildPokemons: Array<Pokemon>(),
    capturedPokemons: Array<Pokemon>(),
    pokeballs: 6
  };

  constructor(props: Object) {
    super(props);
    this.capture = this.capture.bind(this);
    this.release = this.release.bind(this);
  }

  capture(id: number) {
    const index = id - 1;
    if (this.state.pokeballs > 0) {
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
          const captured: Pokemon[] = this.state.capturedPokemons;
          captured.push(pokemon);
          const wild: Pokemon[] = this.state.wildPokemons;
          wild.splice(index, 1);
          this.setState({
            capturedPokemons: captured,
            wildPokemons: wild,
            pokeballs: this.state.pokeballs - 1
          });
        })
        .catch(err => console.log('Failed to catch it !', err));
    }
  }

  release(index: number) {
    const captured: Pokemon[] = this.state.capturedPokemons;
    const wild: Pokemon[] = this.state.wildPokemons;
    const pokemon: Pokemon = captured[index];
    captured.splice(index, 1);
    wild.splice(pokemon.id - 1, 1, pokemon);
    this.setState({
      capturedPokemons: captured,
      wildPokemons: wild,
      pokeballs: this.state.pokeballs + 1
    });
  }

  render() {
    return (
      <div className="App">
        <WildPokemons
          pokemons={this.state.wildPokemons}
          handleOnClick={this.capture} />
        <CapturedPokemons
          pokemons={this.state.capturedPokemons}
          handleOnClick={this.release} />
      </div>
    );
  }

}

export default App;
