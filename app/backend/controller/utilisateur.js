const db = require('../database/connexion');

exports.getUtilisateurById = async (req,res) =>{
    // on définit la requête SQL ici avec un ? pour éviter les injections sql,
    // le ? sera modifié par l'id de la route par la suite
    const sql = "SELECT * FROM client WHERE idClient = ?"
    // on éxécute la requête sql via db
   db.query(sql, [req.params.id],(err, result) => {
       if (err) {
           return res.status(500).json(err);
       }
     res.status(200).json(result)
    }
)}

exports.getUtilisateurFavoris = (req,res) => {}