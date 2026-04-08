// L'objet CatalogueModele contient les fonctions d'appel API
const CatalogueModele = {
    // ===== FONCTIONS =====
    // ----- GET CHAUSSETTES -----
    // Récupère toutes les chaussettes
    getChaussettes: () => {
        console.log('1 - Model : appel API')
        // Cache navigateur, récupère les valeurs par la clé 'chaussettes'. Si rien = NULL
        const cache = localStorage.getItem('chaussettes')

        // Si cache, on converti en JSON et on le retourne.
        if (cache) {
            // On crée une promise, car le controller attend une promise (.then)
            return Promise.resolve(JSON.parse(cache))
        }

        // Sinon, on appelle l'API et on le stocke en cache
        return fetch('/api/chaussettes')
            // On convertit la réponse HTTP brut en objet JS via la fonction res.json (Méthode express)
            .then(res => res.json())
            .then(data => {
                // On sauvegarde les datas en JSON dans le cache avec la clé 'chaussettes' pour les futurs chargements de la page.
                localStorage.setItem('chaussettes', JSON.stringify(data))
                // On retourne l'objet data
                console.log('2 - Model : données reçues', data)
                return data
            })
    },

        toggleFavori: (idProduit) => {
        const token = localStorage.getItem('token');
        return fetch('/api/chaussettes/favoris', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ idProduit: idProduit })
        }).then(res => res.json().then(data => ({ status: res.status, data: data })));
    },

      getMesFavoris: () => {
        const token = localStorage.getItem('token');
        
        // Si l'utilisateur n'est pas connecté, il n'a pas de favoris (tableau vide)
        if (!token) return Promise.resolve([]); 

        // On appelle ta route GET pour récupérer les favoris
        return fetch('/api/chaussettes/favoris', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(res => res.json())
        .then(data => {
            if (data.code === 200) {
                return data.favoris.map(fav => fav.IdProduit);
            }
            return [];
        })
        .catch(err => {
            console.error("Erreur récupération favoris :", err);
            return [];
        });
    },
}