const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
app.use(cors({
    origin: '*'}
))

// route vers les routes d'api
// pour les chaussettes
const chaussetteRouter = require('./backend/router/chaussette')
app.use (chaussetteRouter)
// pour les utilisateurs
const utilisateurRouter = require('./backend/router/utilisateur')
app.use (utilisateurRouter)



app.listen(port, () => {
    console.log('Serveur lancé sur le port : http://localhost:8080')
});