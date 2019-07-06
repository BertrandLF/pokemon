import React from 'react';
import './styles/PokeCell.css';
import sprites from '../assets/sprites.png';
import Pokemon from './Pokemon';

interface PokeCellProps {
  pokemon: Pokemon;
  handleOnClick: (id: number) => void;
}

class PokeCell extends React.Component<PokeCellProps> {
  render() {
    const pokemon = this.props.pokemon;
    const style = { backgroundImage: `url(${pokemon.sprite})` };
    return <button
      className="poke-cell"
      style={style}
      onClick={() => this.props.handleOnClick(pokemon.id)} >
    </button>
  }

}

export default PokeCell;