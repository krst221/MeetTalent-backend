const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload.files');

const {getAllPokemons,getIdPokemon, getNamePokemon, postPokemon, putPokemon, deletePokemon} = require('../controllers/pokemon.controller');

router.get('/', getAllPokemons);
router.get('/:id', getIdPokemon);
router.get('/:name/', getNamePokemon);
router.post('/', upload.single('sprite'), postPokemon);
router.put('/:id', upload.single('sprite'), putPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;