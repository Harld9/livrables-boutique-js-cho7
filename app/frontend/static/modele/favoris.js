/*
 * On gère ici les appels API liés à la page favoris.
 * On récupère et modifie les favoris du client connecté.
 */

const FavorisModele = {

    // ----- GET FAVORIS -----
    getFavoris: () => {
        // On cherche le token dans les deux stockages — remember me peut utiliser l'un ou l'autre
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        // fetch GET — récupère tous les favoris du client via le token JWT
        return fetch('/api/chaussettes/favoris', {
            method: 'GET',
            headers: {
                // Bearer — convention pour envoyer un token JWT dans le header
                'Authorization': 'Bearer ' + token
            }
        })
            // On retourne le status ET les données pour gérer le 401 dans le controller
            .then(res => res.json().then(data => ({ status: res.status, data: data })))
    },

    // ----- TOGGLE FAVORI -----
    toggleFavori: (idProduit) => {
        // On cherche le token dans les deux stockages
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        // fetch POST — ajoute ou retire le favori selon son état actuel
        return fetch('/api/chaussettes/favoris', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            // JSON.stringify — convertit l'id en JSON pour l'envoi
            body: JSON.stringify({ idProduit: idProduit })
        })
            .then(res => res.json().then(data => ({ status: res.status, data: data })))
    }
}