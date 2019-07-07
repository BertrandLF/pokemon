import Pokemon from "../components/Pokemon";

export const psyduckData = {
  id: 54,
  sprites: { front_default: 'https://someUrl/someImage.png' },
  name: 'psyduck',
  types: [{ type: { name: 'water' } }]
}

export const psyduck: Pokemon = new Pokemon(psyduckData);

export const balbusaurData = {
  id: 1,
  sprites: { front_default: 'https://someUrl/someOtherImage.png' },
  name: 'balbusaur',
  types: [{ type: { name: 'poison' } }]
};

export const balbusaur: Pokemon = new Pokemon(balbusaurData);

export const pokemonMap: Map<number, Pokemon> = new Map([
  [psyduck.id, psyduck],
  [balbusaur.id, balbusaur]
]);
