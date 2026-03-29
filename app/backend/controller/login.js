const bcrypt = require('bcrypt');
const db = require('../database/db'); 

exports.inscrireClient = async (req, res) => {
    
    // définit les constantes que l'utilisateur écrit dans les inputs en html
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const adresse = req.body.adresse;
    const mail = req.body.mail;
    const numeroTel = req.body.numeroTel;
    const motDePasse = req.body.motDePasse;

    try {
        // hache le mdp via bcrypt
        const motDePasseHache = await bcrypt.hash(motDePasse, 10);

        // requete sql qui écrit les infos d'un user dans la db
        const sql = 'INSERT INTO Client (Nom, Prenom, Adresse, Mail, NumeroTel, MotDePasse) VALUES (?, ?, ?, ?, ?, ?)';
        
        //envoit à la db la requete du dessus
        await db.query(sql, [nom, prenom, adresse, mail, numeroTel, motDePasseHache]);

        res.status(201).json({ message: "Inscription réussie !" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
};