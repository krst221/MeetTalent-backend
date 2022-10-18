const Pokemon = require('../models/pokemon.model');

const getAllPokemons = async (req, res) => {
    try {
        const allPokemons = await Pokemon.find();
        return res.status(200).json(allPokemons);
    } catch (error) {
        return res.status(500).json(error)
    }
};

// const getIdPokemons = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const allPokemons = await Pokemon.find(id);
//         return res.status(200).json(allPokemons);
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// };

const postPokemon = async (req, res) => {
    try {
        const { name, type, weight, height, sprite } = req.body;
        const newPokemon = new Pokemon ({ name, type, weight, height, sprite });
        const createPokemon = await newPokemon.save();
        return res.status(201).json(createPokemon);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const putPokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const putPokemon = new Pokemon (req.body);
        putPokemon._id = id;

        const pokemonDb = await Pokemon.findByIdAndUpdate(id, putPokemon, {new: true});
        if (!pokemonDb) {
            return res.status(404).json({"message": "Pokemon not found"});
        }
        return res.status(200).json(putPokemon);
    } catch (error) {
        return res.status(500).json(error)
    }
};

const deletePokemon = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemonDb = await Pokemon.findByIdAndDelete(id);
        if (!pokemonDb) {
            return res.status(404).json({"message": "Pokemon not found"});
        }
        return res.status(200).json(pokemonDb);
    } catch (error) {
        return res.status(500).json(error)
    }
};

module.exports = { getAllPokemons, postPokemon, putPokemon, deletePokemon }

