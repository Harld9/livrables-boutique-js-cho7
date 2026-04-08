// L'objet FavorisModele contient les fonctions d'appel API liées aux favoris
const FavorisModele = {

    // ----- GET FAVORIS -----
    // Récupère les favoris du client connecté
    getFavoris: () => {
        // On récupère le token dans le localStorage
        const token = localStorage.getItem('token')

        // On appelle l'API avec le token dans le header
        return fetch('/api/chaussettes/favoris', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        // On convertit la réponse HTTP brute en objet JS
        .then(res => res.json().then(data => ({ status: res.status, data: data })))
    },

    // ----- TOGGLE FAVORI -----
    // Ajoute ou retire un favori
    toggleFavori: (idProduit) => {
        const token = localStorage.getItem('token')

        return fetch('/api/chaussettes/favoris', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ idProduit: idProduit })
        })
        .then(res => res.json().then(data => ({ status: res.status, data: data })))
    }
}