const UtilisateurModele = {
    getUtilisateur: function(id) {
        // On vérifie le cache avec une clé unique
        const cacheKey = 'user_data_' + id;
        const cache = localStorage.getItem(cacheKey);

        if (cache) {
            return Promise.resolve(JSON.parse(cache));
        }

        // On appelle ton API (Port 8080 + préfixe /api)
        return fetch('http://localhost:8080/api/utilisateur/' + id)
            .then((response) => response.json())
            .then(data => {
                // On stocke en cache pour la prochaine fois
                localStorage.setItem(cacheKey, JSON.stringify(data));
                return data;
            })
            .catch(console.error);
    }
};