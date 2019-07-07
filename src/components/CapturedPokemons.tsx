import React from 'react';
import './styles/CapturedPokemons.css';
import Pokemon from './Pokemon';
import PokeCard from './CapturedPokemon';

interface CapturedPokemonsProps {
  pokemons: Map<number, Pokemon>;
  handleOnClick: (pokemon: Pokemon) => void;
}

class CapturedPokemons extends React.Component<CapturedPokemonsProps> {

  cells() {
    return Array.from(this.props.pokemons.values()).map((pokemon: Pokemon) =>
      <PokeCard
        key={pokemon.id}
        pokemon={pokemon}
        handleOnClick={this.props.handleOnClick}
      />
    );
  };

  render() {
    const pokemons = this.props.pokemons;
    if (pokemons.size === 0) {
      return <section className="captured-pokemons" />
    } else {
      return (
        <section className="captured-pokemons">
          {this.cells()}
        </section>
      )
    }
  };
}

export default CapturedPokemons;