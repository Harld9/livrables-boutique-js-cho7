const db = require('../database/connexiondb.js')

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