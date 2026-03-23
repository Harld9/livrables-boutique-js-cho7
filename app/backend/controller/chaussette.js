const db = require('../database/connexion.js')

// ===== Fonction getChaussettes ----- '/chaussettes' ======
exports.getChaussettes = (req, res) => {
    // Requête SQL à envoyé à la db
    const sql = "SELECT * FROM Produit"

    // Appel de la db avec la requête SQL et retourne un tableau d'objets
    db.query(sql, (err, resultat) => {
        // Si erreur avec la DB, on renvoie un code HTTP 500
        // (rappel: 200 OK; 201 Created; 400 Bad Request; 404 Not Found; 500 Server Error.)
        if (err) {
            // On envoie un JSON avec le code erreur et un message
            res.status(500).json({
                code: 500,
                message: 'Erreur serveur'
            })
        } else {
            // Pareil qu'avec le code 500, on ajout le tableau d'objets qui va être convertis en json lui aussi.
            res.status(200).json({
                code: 200,
                message: 'Chaussettes récupérées avec succès',
                chaussettes: resultat
            })
        }
    })
}

// ===== Fonction getChaussetteById ----- '/chaussette/:id' =====
exports.getChaussetteById = async (req,res) =>{
    const id = req.params.id;
    const chaussettes = data.sneakers;
    const chaussette = chaussettes.find(chaussette => chaussette.id === parseInt(id));
    if (!chaussette) {
        res.status(404).json({
            code : 404,
            message : 'Chaussette not found'
        })
    }else{
        res.status(200.).json({
            message: 'Chaussette trouvé Ok',
            sneaker: chaussette
        })
    }
}