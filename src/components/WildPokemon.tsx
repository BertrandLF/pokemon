import React from 'react';
import './styles/WildPokemon.css';
import Pokemon from './Pokemon';

interface WildPokemonProps {
  pokemon: Pokemon;
  handleOnClick: (id: number) => void;
}

class WildPokemon extends React.Component<WildPokemonProps> {

  render() {
    const pokemon = this.props.pokemon;
    const style = { backgroundImage: `url(${pokemon.sprite})` };
    return <button
      className="wild-pokemon"
      style={style}
      onClick={() => this.props.handleOnClick(pokemon.id)} >
    </button>
  }

}

export default WildPokemon;