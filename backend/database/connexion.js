const mysql = require('mysql2');
// permet d'utiliser les variables du .env
require('dotenv').config(); 

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((erreur) => {
    if (erreur) {
        console.error('Aïe, impossible de se connecter à la base :', erreur);
    } else {
        console.log('Bingo ! Connecté à la base de données MySQL des chaussettes !');
    }
});

module.exports = db;