const UtilisateurModele = {
    // récupère les données d'un utilisateur avec son id depuis l'API
    getUtilisateur: function(id) {
        return fetch('http://localhost:8080/utilisateur/' + id)
        // transforme la réponse texte brute en un objet JavaScript exploitable
            .then((response) => response.json())
            .catch(console.error);
    }
};