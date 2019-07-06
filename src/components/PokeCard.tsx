import React from 'react'
import './styles/PokeCard.css';
import Pokemon from './Pokemon';

interface PokeCardProps {
  pokemon: Pokemon;
  index: number;
  handleOnClick: (index: number) => void;
}

class PokeCard extends React.Component<PokeCardProps> {

  getGif(pokemon: string) {
    const normalizedPokemonName: string = pokemon.replace('-', '');
    return 'http://pokestadium.com/sprites/xy/' + normalizedPokemonName + '.gif';
  }

  render() {
    const pokemon = this.props.pokemon;
    const index = this.props.index;
    return (
      <div className='captured-pokemon' onClick={() => this.props.handleOnClick(index)}>
        <img src={this.getGif(pokemon.name)} className='sprite-image' alt="sprite" />
        <div className="pokemon-data">
          <div className="data-row">
            <p className="cell">ID: </p>
            <p className="cell">{pokemon.id}</p>
          </div>
          <div className="data-row">
            <p className="cell">Name: </p>
            <p className="cell">  {pokemon.name}</p>
          </div>
          <div className="data-row">
            <p className="cell">Type: </p>
            <p className="cell">  {pokemon.type}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default PokeCard;