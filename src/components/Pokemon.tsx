class Pokemon {

  id: number;
  name: string;
  sprite: string;
  type: string;

  constructor(data : any){
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprites.front_default;
    this.type = data.types[0].type.name;
  }
}

export default Pokemon;