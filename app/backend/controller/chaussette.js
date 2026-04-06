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