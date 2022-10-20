const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Pokemon = require('../api/models/pokemon.model');
const DB_URL = process.env.DB_URL;
dotenv.config();

const pokemons = [{
    name: 'Pikachu',
    type: 'Electric',
    weight: 2.0,
    height: 0.5,
    sprite: 'xdcxd'
},{
    name: 'Mew',
    type: 'Psychic',
    weight: 4.0,
    height: 2.5,
    sprite: 'xdcxd'
},{
    name: 'Mewtwo',
    type: 'Psychic',
    weight: 5.0,
    height: 5.5,
    sprite: 'xdcxd'
},{
    name: 'Bulbasaur',
    type: 'Grass',
    weight: 0.2,
    height: 0.3,
    sprite: 'xdcxd'
},{
    name: 'Charmander',
    type: 'Fire',
    weight: 0.5,
    height: 0.5,
    sprite: 'xdcxd'
},{
    name: 'Kecleon',
    type: 'Normal',
    weight: 1.0,
    height: 1.5,
    sprite: 'xdcxd'
}]

const pokemonMap = pokemons.map((pokemon) => new Pokemon(pokemon));

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then (async () => {
    const allPokemons = await Pokemon.find();
    if(allPokemons.length){
        await Pokemon.collection.drop();
        console.log('pokemons eliminados')
    }
}).catch((error) => console.log('error borrando pokemons', error))
.then(async () => {
    await Pokemon.insertMany(pokemonMap);
    console.log('pokemons creados')
}).catch((error) => console.log('error insertando pokemons', error))
.finally(() => {mongoose.disconnect()});