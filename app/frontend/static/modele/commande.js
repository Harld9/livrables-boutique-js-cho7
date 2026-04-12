/*
 * On gère ici les appels API liés aux commandes.
 * On envoie le panier et l'adresse au serveur pour créer la commande.
 */

const CommandeModele = {

    // ----- PASSER COMMANDE -----
    passerCommande: (panier, adresse) => {
        // On récupère le token dans les deux stockages
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        // fetch POST — envoie le panier et l'adresse avec le token JWT
        return fetch('/api/commande', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Bearer — convention pour envoyer un token JWT dans le header
                'Authorization': 'Bearer ' + token
            },
            // JSON.stringify — convertit l'objet JS en JSON pour l'envoi
            body: JSON.stringify({ panier, adresse })
        })
            .then(res => res.json().then(data => ({ status: res.status, data: data })))
    },

    // ----- SAUVEGARDER ADRESSE -----
    // localStorage.setItem — sauvegarde l'adresse pour les prochaines commandes
    sauvegarderAdresse: (adresse) => {
        localStorage.setItem('adresse_livraison', adresse)
    },

    // localStorage.getItem — récupère l'adresse sauvegardée
    getAdresseSauvegardee: () => {
        return localStorage.getItem('adresse_livraison') || ''
    },

    // localStorage.removeItem — supprime l'adresse sauvegardée
    supprimerAdresse: () => {
        localStorage.removeItem('adresse_livraison')
    },

    // ----- RÉCUPÉRER MES COMMANDES -----
    getMesCommandes: () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')

        return fetch('/api/commandes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => res.json().then(data => ({ status: res.status, data: data })))
    }
}