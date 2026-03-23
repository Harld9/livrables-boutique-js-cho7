const db = require('../database/connexion');

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