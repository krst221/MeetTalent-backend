const express = require('express');
const dotenv = require('dotenv');
const {connect} = require('./src/utils/db');
const {isAuth} = require('./src/middlewares/auth');
const { restart } = require('nodemon');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const userRouter = require('./src/api/routes/user.routes');
const mailRouter = require('./src/api/routes/mail.routes');

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
connect();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Method', 'POST, GET, DELETE, PUT, PATCH');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));


app.use('/user', userRouter);

app.use('/mail', mailRouter);

app.use('*', (req, res, next) => res.status(404).json('La ruta seleccionada no existe.'));

app.use((error, req, res, next) => {

    return res.status( error.status || 500 ).json("Error: " + error.message || "Unexpected error");

})

app.listen(PORT, () => console.log(`listening on port: http://localhost:${PORT}`));