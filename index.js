const express = require('express');
const dotenv = require('dotenv');
const {connect} = require('./src/utils/db');
const {isAuth} = require('./src/middlewares/auth');

const gimnasioRouter = require('./src/api/routes/gimnasio.routes');
const pokemonRouter = require('./src/api/routes/pokemon.routes');

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
connect();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/gimnasios', gimnasioRouter);
app.use('/pokemons', pokemonRouter);

app.listen(PORT, () => console.log(`listening on port: http://localhost:${PORT}`));