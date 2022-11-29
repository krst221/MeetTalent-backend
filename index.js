const express = require('express');
const dotenv = require('dotenv');
const { connect } = require('./src/utils/db');
const cors = require('cors');

const userRouter = require('./src/api/routes/user.routes');
const companyRouter = require('./src/api/routes/company.routes');
const messageRouter = require('./src/api/routes/message.routes');
const offerRouter = require('./src/api/routes/offer.routes');

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
connect();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Method', 'POST, GET, DELETE, PUT, PATCH');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

app.use(cors({
    origin: ['http://localhost:3000', 'https://meettalent.vercel.app/'],
    credentials: 'true'
}))

app.use(express.json({limit: '5mb'}));
app.use(express.urlencoded({ extended: false }));


app.use('/user', userRouter);

app.use('/company', companyRouter);

app.use('/message', messageRouter);

app.use('/offer', offerRouter);

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.use('*', (req, res) => res.status(404).json('La ruta seleccionada no existe.'));

app.use((error, res) => {

    return res.status( error.status || 500 ).json("Error: " + error.message || "Unexpected error");

})

app.listen(PORT, () => console.log(`listening on port 3030`));

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)
  