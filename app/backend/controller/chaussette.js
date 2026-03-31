const db = require('../database/connexiondb.js')

// ===== Fonction getChaussettes ----- '/chaussettes' ======
exports.getChaussettes = (req, res) => {
    // Requête SQL à envoyé à la db
        const sql = "SELECT\n" +
            "    Produit.IdProduit,\n" +
            "    Produit.NomProduit,\n" +
            "    Produit.Longueur,\n" +
            "    Produit.Prix,\n" +
            "    Categorie.NomCategorie,\n" +
            "    Produit.Reduction,\n" +
            "    Produit.Description,\n" +
            "    Produit.Pointure,\n" +
            "    Produit.Genre,\n" +
            "    Produit.Stock,\n" +
            "    Produit.Image3D,\n" +
            "    Produit.ImagePortee\n" +
            "\n" +
            "FROM Produit\n" +
            "\n" +
            "INNER JOIN Categorie ON Categorie.IdCategorie = Produit.IdCategorie"

    // Appel de la db avec la requête SQL et retourne un tableau d'objets
    db.query(sql, (err, resultat) => {
        // Si erreur avec la DB, on renvoie un code HTTP 500
        if (err) {
            // On envoie un JSON avec le code erreur et un message
            return res.status(500).json({ code: 500, message: 'Erreur serveur' })
        }
        // Pareil qu'avec le code 500, on ajout le tableau d'objets qui va être convertis en json lui aussi.
        res.status(200).json({ code: 200, message: 'Chaussettes récupérées avec succès', chaussettes: resultat })
    })
}

// ===== Fonction getChaussetteById ----- '/chaussette/:id' =====
exports.getChaussetteById = (req,res) =>{
    // on définit la requête SQL ici avec un ? pour éviter les injections sql
    const sql =  "SELECT * FROM Produit WHERE IdProduit = ?"
    
    // on éxécute la requête sql via db
    db.query(sql, [req.params.id], (err, resultat) => {
        if (err) {
            return res.status(500).json({ code: 500, message: 'Erreur serveur' })
        }
        res.status(200).json({ code: 200, message: 'Chaussette trouvé Ok', sneaker: resultat[0] })
    })
}