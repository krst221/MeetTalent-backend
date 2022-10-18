const express = require('express');
const router = express.Router();

const {getAllPokemons, postPokemon, putPokemon, deletePokemon} = require('../controllers/pokemon.controller');

router.get('/', getAllPokemons);
router.post('/', postPokemon);
router.put('/:id', putPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;