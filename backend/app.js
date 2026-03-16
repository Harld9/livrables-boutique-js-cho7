const express = require('express');
const app = express();
require('dotenv').config(); // permet d'utiliser les variables du .env
const db = require('./database/connexion'); // permet de connecter la db avec notre backend

let port = 8080

//  route test
app.get('/test-db', (req, res) => {
    const sql = "SELECT * FROM Produit"; 
    
    // on éxécute la requête sql via db
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur SQL", details: err });
        }
        res.json(result); 
    });
});

// allumage du serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur : http://localhost:${port}`);
});