const mongoose = require('mongoose')

//* Esquema
const Schema = mongoose.Schema


const pokemonSchema = new Schema({

    name: {type: String, required: true},
    weight: {type: Number, required: true},
    type: {type: String, required: true},
    height: {type: Number, required: true},
    sprite: {type: String, required: true}

},{
    timestamps: true
}
    
);

const Pokemon = mongoose.model('pokemon',pokemonSchema)

module.exports = Pokemon