const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
app.use(cors({
    origin: '*'}
))

const sneakerRouter = require('./router/sneaker')
app.use (sneakerRouter)


app.listen(port, () => {
    console.log('Serveur lancé sur le port : http://localhost:8080')
});

