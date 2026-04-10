const db = require('../database/connexiondb.js')
const jwt = require('jsonwebtoken')

// ===== Fonction getChaussettes ----- '/chaussettes' ======
exports.getChaussettes = async (req, res) => {
    try {
    // Requête SQL à envoyé à la db
    const sql = `
    SELECT
        Produit.IdProduit,
        Produit.NomProduit,
        Produit.Longueur,
        Produit.Prix,
        Categorie.NomCategorie,
        Produit.Reduction,
        Produit.Description,
        Produit.Pointure,
        Produit.Genre,
        Produit.Stock,
        Produit.Image3D,
        Produit.ImagePortee
    FROM Produit
    INNER JOIN Categorie ON Categorie.IdCategorie = Produit.IdCategorie
    `

    // Appel de la db avec la requête SQL et retourne un tableau d'objets
        const [resultat] = await db.query(sql)
        // Pareil qu'avec le code 500, on ajout le tableau d'objets qui va être convertis en json lui aussi.
        res.status(200).json({
            code: 200,
            message: 'Chaussettes récupérées avec succès',
            chaussettes: resultat
        })
        // Si erreur avec la DB, on renvoie un code HTTP 500
    } catch (err) {
            // On envoie un JSON avec le code erreur et un message
            return res.status(500).json({ code: 500, message: 'Erreur serveur' })

    }
}

// ===== Fonction getChaussetteById ----- '/chaussette/:id' =====
exports.getChaussetteById = async (req, res) => {
    try {
        const sql = `
            SELECT
                Produit.IdProduit,
                Produit.NomProduit,
                Produit.Longueur,
                Produit.Prix,
                Categorie.NomCategorie,
                Produit.Reduction,
                Produit.Description,
                Produit.Pointure,
                Produit.Genre,
                Produit.Stock,
                Produit.Image3D,
                Produit.ImagePortee
            FROM Produit
            INNER JOIN Categorie ON Categorie.IdCategorie = Produit.IdCategorie
            WHERE Produit.IdProduit = ?
        `
        const [resultat] = await db.query(sql, [req.params.id])

        if (!resultat[0]) {
            return res.status(404).json({ code: 404, message: 'Chaussette introuvable' })
        }
        res.status(200).json({
            code: 200,
            message: 'Chaussette trouvée',
            chaussette: resultat[0]
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ code: 500, message: 'Erreur serveur' })
    }
}

// ===== GET /api/chaussettes/variantes/:id =====
exports.getVariantes = async (req, res) => {
    try {
        // D'abord on récupère la longueur et la catégorie du produit actuel
        const sqlProduit = `
            SELECT IdProduit, Longueur, IdCategorie
            FROM Produit
            WHERE IdProduit = ?
        `
        const [produit] = await db.query(sqlProduit, [req.params.id])

        if (!produit[0]) {
            return res.status(404).json({ code: 404, message: 'Produit introuvable' })
        }

        // Ensuite on récupère tous les produits de même longueur et même catégorie
        const sqlVariantes = `
            SELECT IdProduit, NomProduit
            FROM Produit
            WHERE Longueur    = ?
            AND   IdCategorie = ?
        `
        const [variantes] = await db.query(sqlVariantes, [
            produit[0].Longueur,
            produit[0].IdCategorie
        ])

        res.status(200).json({
            code: 200,
            message: 'Variantes récupérées',
            variantes: variantes
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ code: 500, message: 'Erreur serveur' })
    }
}

// ===== GET /api/chaussettes/similaires/:id =====
exports.getSimilaires = async (req, res) => {
    try {
        // Récupère le produit actuel
        const sqlProduit = `
            SELECT IdProduit, Longueur, IdCategorie
            FROM Produit
            WHERE IdProduit = ?
        `
        const [produit] = await db.query(sqlProduit, [req.params.id])

        if (!produit[0]) {
            return res.status(404).json({ code: 404, message: 'Produit introuvable' })
        }

        const { IdProduit, Longueur, IdCategorie } = produit[0]

        // Même catégorie — exclut le produit actuel
        const sqlCategorie = `
            SELECT
                Produit.IdProduit,
                Produit.NomProduit,
                Produit.Prix,
                Produit.Reduction,
                Produit.Image3D,
                Produit.ImagePortee,
                Categorie.NomCategorie
            FROM Produit
            INNER JOIN Categorie ON Categorie.IdCategorie = Produit.IdCategorie
            WHERE Produit.IdCategorie = ?
            AND   Produit.IdProduit  != ?
        `
        const [memeCategorie] = await db.query(sqlCategorie, [IdCategorie, IdProduit])

        // Même longueur — exclut le produit actuel et ceux déjà dans memeCategorie
        const sqlLongueur = `
            SELECT
                Produit.IdProduit,
                Produit.NomProduit,
                Produit.Prix,
                Produit.Reduction,
                Produit.Image3D,
                Produit.ImagePortee,
                Categorie.NomCategorie
            FROM Produit
            INNER JOIN Categorie ON Categorie.IdCategorie = Produit.IdCategorie
            WHERE Produit.Longueur     = ?
            AND   Produit.IdCategorie != ?
            AND   Produit.IdProduit   != ?
        `
        const [memeLongueur] = await db.query(sqlLongueur, [Longueur, IdCategorie, IdProduit])

        res.status(200).json({
            code: 200,
            message: 'Produits similaires récupérés',
            memeCategorie: memeCategorie,
            memeLongueur:  memeLongueur
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ code: 500, message: 'Erreur serveur' })
    }
}

// ===== POST /api/chaussettes/favoris =====
exports.toggleFavori = async (req, res) => {
    try {
        // On récupère l'id du produit envoyé par le front
        const idProduit = req.body.idProduit;

        // On vérifie que le header Authorization est bien présent
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ code: 401, message: 'Non autorisé : Veuillez vous connecter' });
        }

        // On extrait le token en coupant la partie "Bearer "
        const token = authHeader.split(' ')[1];

        // On décode le token avec la clé secrète du .env
        const decodedToken = jwt.verify(token, process.env.CLEJWT);

        // On récupère l'id du client depuis le token décodé
        const idClient = decodedToken.id;

        // On vérifie si ce produit est déjà en favori pour ce client
        const sqlCheck = `SELECT * FROM Favoris WHERE IdClient = ? AND IdProduit = ?`;
        const [existant] = await db.query(sqlCheck, [idClient, idProduit]);

        if (existant.length > 0) {
            // Le favori existe déjà → on le supprime
            await db.query(`DELETE FROM Favoris WHERE IdClient = ? AND IdProduit = ?`, [idClient, idProduit]);
            return res.status(200).json({ code: 200, favori: false, message: 'Favori retiré' });
        } else {
            // Le favori n'existe pas → on l'ajoute
            await db.query(`INSERT INTO Favoris (IdClient, IdProduit) VALUES (?, ?)`, [idClient, idProduit]);
            return res.status(200).json({ code: 200, favori: true, message: 'Favori ajouté' });
        }

    } catch (err) {
        console.error("ERREUR TOGGLE FAVORI :", err);

        // Si le token est invalide ou expiré on retourne une erreur 401
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ code: 401, message: 'Session expirée ou invalide' });
        }

        // Sinon erreur serveur
        res.status(500).json({ code: 500, message: 'Erreur serveur' });
    }}

// ===== GET /api/favoris =====
// Récupère tous les favoris du client connecté
exports.getFavoris = async (req, res) => {
    try {
        // On vérifie que le token est bien présent dans le header
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ code: 401, message: 'Non autorisé' })
        }

        // On décode le token pour récupérer l'id du client
        const token       = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.CLEJWT)
        const idClient    = decodedToken.id

        // On récupère tous les produits en favori pour ce client
        const sql = `
            SELECT
                Produit.IdProduit,
                Produit.NomProduit,
                Produit.Prix,
                Produit.Reduction,
                Produit.Genre,
                Produit.Image3D,
                Produit.ImagePortee,
                Categorie.NomCategorie
            FROM Favoris
            INNER JOIN Produit   ON Produit.IdProduit     = Favoris.IdProduit
            INNER JOIN Categorie ON Categorie.IdCategorie = Produit.IdCategorie
            WHERE Favoris.IdClient = ?
        `
        const [favoris] = await db.query(sql, [idClient])

        res.status(200).json({ code: 200, favoris: favoris })

    } catch (err) {
        console.error('ERREUR GET FAVORIS :', err)
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ code: 401, message: 'Session expirée ou invalide' })
        }
        res.status(500).json({ code: 500, message: 'Erreur serveur' })
    }
}


