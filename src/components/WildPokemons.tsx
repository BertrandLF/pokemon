import React from 'react';
import './styles/WildPokemons.css';
import PokeCell from './PokeCell';
import Pokemon from './Pokemon';

interface WildPokemonsProps {
  pokemons: Array<Pokemon>;
  handleOnClick: (id: number) => void;
}
class WildPokemons extends React.Component<WildPokemonsProps> {

  cells = this.props.pokemons.map((pokemon: Pokemon) =>
    <PokeCell
      key={pokemon.id}
      pokemon={pokemon}
      handleOnClick={this.props.handleOnClick}
    />
  );

  render() {
    return (
      <section className="wild-pokemons">
        {this.cells}
      </section>
    )
  }
}

export default WildPokemons;