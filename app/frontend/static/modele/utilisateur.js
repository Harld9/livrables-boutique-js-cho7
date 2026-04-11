const UtilisateurModele = {
    getUtilisateur: function(id, token) { // ← token ajouté ici
        const cacheKey = 'user_data_' + id;
        const cache = localStorage.getItem(cacheKey);

        if (cache) {
            return Promise.resolve(JSON.parse(cache));
        }

        return fetch('/api/utilisateur/' + id, { // ← URL relative, plus de localhost:8080
            headers: {
                'Authorization': 'Bearer ' + token // ← token envoyé ici
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
        })
        .catch(console.error);
    }
};