const db = require('../database/connexiondb.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

    // ===== Fonction : inscription =====
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
        const sql = 'INSERT INTO client (Nom, Prenom, Adresse, Mail, NumeroTel, motDePasse) VALUES (?, ?, ?, ?, ?, ?)';
        
        //envoit à la db la requete du dessus
        await db.query(sql, [nom, prenom, adresse, mail, numeroTel, motDePasseHache]);

        res.status(201).json({ message: "Inscription réussie !" });

    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
};

// ===== Fonction : Connexion =====
exports.connecterClient = async (req, res) => {
    const mail = req.body.mail;
    const motDePasse = req.body.motDePasse;
    // on regarde si l'utilisateur existe
    try{const sql = 'SELECT * FROM client WHERE Mail = ?';
        const [resultats] = await db.query(sql, [mail]);

        //si la db renvoit un array vide donc si l'email n'existe pas on envoit une erreur
        if (resultats.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
        //on prend le premier résultat (le seul qui a cet email)
        const utilisateur = resultats[0];

        // check si le mot de passe est le bon en comparant les hash
        const mdpCorrect = await bcrypt.compare(motDePasse, utilisateur.MotDePasse);

        if (!mdpCorrect) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // après avoir importé jwt on créé in jeton et on le signe avec les infos
        const jeton = jwt.sign(
            { id: utilisateur.IdClient, prenom: utilisateur.Prenom }, 
            process.env.CLEJWT, // clé secrete du .env 
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            message: "Connexion réussie !",
            prenom: utilisateur.Prenom,
            token: jeton 
        });

    }catch (erreur) {
        console.error("Erreur dans connecterClient :", erreur);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// ===== Fonction : Récupérer un utilisateur par son ID =====
exports.getUtilisateurById = async (req,res) =>{
    // Sécurité : le ? évite les injections SQL
    const sql = "SELECT * FROM client WHERE idClient = ?"
    
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Erreur serveur' });
        }
        // On renvoie un objet structuré
        res.status(200).json({ 
            code: 200, 
            message: 'Succès', 
            utilisateur: result[0] 
        });
    });
};

// ===== Fonction : Favoris (Nécessaire pour que le router ne plante pas) =====
exports.getUtilisateurFavoris = (req, res) => {
    res.status(200).json({ message: "Route favoris active" });
};