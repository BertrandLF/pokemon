import React from 'react';
import './styles/WildPokemons.css';
import PokeCell from './PokeCell';
import Pokemon from './Pokemon';

interface WildPokemonsProps {
  pokemons: Set<Pokemon>;
  handleOnClick: (id: number) => void;
}
class WildPokemons extends React.Component<WildPokemonsProps> {

  cells() {
    return Array.from(this.props.pokemons.values()).map((pokemon: Pokemon) =>
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