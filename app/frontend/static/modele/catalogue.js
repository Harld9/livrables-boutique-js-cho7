/*
 * On gère ici les appels API liés à la page catalogue.
 * On met en cache les données dans le localStorage pour éviter les requêtes inutiles.
 * On gère aussi les appels liés aux favoris.
 */

const CatalogueModele = {

    // ----- GET CHAUSSETTES -----
    getChaussettes: () => {
        console.log('1 - Model : appel API')

        // localStorage.getItem — récupère les données mises en cache
        const cache = localStorage.getItem('chaussettes')

        if (cache) {
            // Promise.resolve — emballe la valeur en Promise car le controller attend un .then()
            return Promise.resolve(JSON.parse(cache))
        }

        // fetch — envoie une requête GET vers l'API
        return fetch('/api/chaussettes')
            // res.json() — convertit la réponse HTTP brute en objet JS
            .then(res => res.json())
            .then(data => {
                // localStorage.setItem — sauvegarde en cache pour les prochains chargements
                localStorage.setItem('chaussettes', JSON.stringify(data))
                console.log('2 - Model : données reçues', data)
                return data
            })
    },

    // ----- TOGGLE FAVORI -----
    toggleFavori: (idProduit) => {
        // On cherche le token dans les deux stockages — remember me peut utiliser l'un ou l'autre
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        // fetch POST — envoie l'id du produit avec le token JWT dans le header
        return fetch('/api/chaussettes/favoris', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Bearer — convention pour envoyer un token JWT dans le header
                'Authorization': 'Bearer ' + token
            },
            // JSON.stringify — convertit l'objet JS en texte JSON pour l'envoi
            body: JSON.stringify({ idProduit: idProduit })
        })
            // On retourne le status ET les données pour que le controller sache quoi faire
            .then(res => res.json().then(data => ({ status: res.status, data: data })))
    },

    // ----- GET MES FAVORIS -----
    getMesFavoris: () => {
        // On cherche le token dans les deux stockages
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        // Si non connecté on retourne un tableau vide — pas d'appel API inutile
        if (!token) return Promise.resolve([])

        // fetch GET — récupère les favoris du client connecté
        return fetch('/api/chaussettes/favoris', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    // On retourne uniquement les ids pour la comparaison dans la vue
                    return data.favoris.map(fav => fav.IdProduit)
                }
                return []
            })
            .catch(err => {
                console.error('Erreur récupération favoris :', err)
                return []
            })
    }
}