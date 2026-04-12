const UtilisateurModele = {
    getUtilisateur: function (id) {
        // On vérifie le cache avec une clé unique
        const cacheKey = 'user_data_' + id;
        const cache = localStorage.getItem(cacheKey);

        if (cache) {
            return Promise.resolve(JSON.parse(cache));
        }

        return fetch('/api/utilisateur/' + id, {
            headers: {
                'Authorization': 'Bearer ' + token //
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