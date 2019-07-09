import React from 'react'
import './styles/CapturedPokemon.css';
import Pokemon from './Pokemon';

interface CapturedPokemonProps {
  pokemon: Pokemon;
  handleOnClick: (pokemon: Pokemon) => void;
}

class CapturedPokemon extends React.Component<CapturedPokemonProps> {

  constructor (props: Readonly<CapturedPokemonProps>){
    super(props);
    this.getGif = this.getGif.bind(this);
    this.setNormalizedSrc = this.setNormalizedSrc.bind(this);
  }

  pokeGifUrl: string = 'http://pokestadium.com/sprites/xy/';

  getGif(pokemon: string) {
    return this.pokeGifUrl + pokemon + '.gif';
  }

  setNormalizedSrc(img: any){
    const normalizedPokemonName: string = this.props.pokemon.name.replace('-', '');
    img.target.src = this.pokeGifUrl + normalizedPokemonName + '.gif';
  }

  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className='captured-pokemon' onClick={() => this.props.handleOnClick(pokemon)}>
        <img onError={this.setNormalizedSrc} src={this.getGif(pokemon.name)} className='sprite-image' alt="sprite" />
        <div className="pokemon-data">
          <div className="data-row">
            <p className="cell">ID:</p>
            <p className="cell">{pokemon.id}</p>
          </div>
          <div className="data-row">
            <p className="cell">Name:</p>
            <p className="cell">{pokemon.name}</p>
          </div>
          <div className="data-row">
            <p className="cell">Type:</p>
            <p className="cell">{pokemon.type}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CapturedPokemon;