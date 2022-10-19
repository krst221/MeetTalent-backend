const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload.files');

const {getAllPokemons, postPokemon, putPokemon, deletePokemon} = require('../controllers/pokemon.controller');

router.get('/', getAllPokemons);
router.post('/', upload.single('sprite'), postPokemon);
router.put('/:id', upload.single('sprite'), putPokemon);
router.delete('/:id', deletePokemon);

module.exports = router;