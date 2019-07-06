import React from 'react';
import './styles/CapturedPokemons.css';
import Pokemon from './Pokemon';
import PokeCard from './PokeCard';

interface CapturedPokemonsProps {
  pokemons: Array<Pokemon>;
  handleOnClick: (id: number) => void;
}

class CapturedPokemons extends React.Component<CapturedPokemonsProps> {

  cells() {
    return this.props.pokemons.map((pokemon: Pokemon, index) =>
      <PokeCard
        key={pokemon.id}
        index={index}
        pokemon={pokemon}
        handleOnClick={() => this.props.handleOnClick(index)}
      />
    );
  };

  render() {
    const pokemons = this.props.pokemons;
    if (pokemons.length === 0) {
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