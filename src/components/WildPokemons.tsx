import React from 'react';
import './styles/WildPokemons.css';
import PokeCell from './WildPokemon';
import Pokemon from './Pokemon';

interface WildPokemonsProps {
  pokemons: Map<number, Pokemon>;
  handleOnClick: (id: number) => void;
}
class WildPokemons extends React.Component<WildPokemonsProps> {

  cells() {
    return Array.from(this.props.pokemons.values())
            .sort((a, b) => a.id - b.id)
            .map((pokemon: Pokemon) =>
      <PokeCell
        key={pokemon.id}
        pokemon={pokemon}
        handleOnClick={this.props.handleOnClick}
      />
    );
  }

  render() {
    return (
      <section className="wild-pokemons">
        {this.cells()}
      </section>
    )
  }
}

export default WildPokemons;