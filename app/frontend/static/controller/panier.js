/*
 * On fait ici le lien entre le modèle et la vue du panier.
 * On gère les actions de l'utilisateur : modifier quantité, supprimer, vider.
 */

const PanierController = {

    init: () => {
        // On récupère et affiche le panier au chargement
        const panier = PanierModele.getPanier()
        const total = PanierModele.calculerTotal(panier)
        PanierVue.affichage(panier, total)
        PanierController.initBoutons()
        PanierModele.mettreAJourPointrouge()
    },

    // Modifie la quantité d'un produit et rafraîchit l'affichage
    modifierQuantite: (id, nouvelleQuantite) => {
        const panier = PanierModele.modifierQuantite(id, nouvelleQuantite)
        const total = PanierModele.calculerTotal(panier)
        PanierVue.affichage(panier, total)
        PanierModele.mettreAJourPointrouge()
    },

    // Supprime un produit et rafraîchit l'affichage
    supprimer: (id) => {
        const panier = PanierModele.supprimer(id)
        const total = PanierModele.calculerTotal(panier)
        PanierVue.affichage(panier, total)
        PanierModele.mettreAJourPointrouge()
    },

    // Vide le panier entièrement
    vider: () => {
        PanierModele.vider()
        PanierVue.affichageVide()
        PanierModele.mettreAJourPointrouge()
    },

    initBoutons: () => {
        // Bouton vider le panier
        const btnVider = document.getElementById('btn-vider')
        if (btnVider) {
            btnVider.addEventListener('click', PanierController.vider)
        }

        // Bouton valider la commande
        const btnValider = document.getElementById('btn-valider')
        if (btnValider) {
            btnValider.addEventListener('click', () => {
                const panier = PanierModele.getPanier()
                if (panier.length === 0) return
                // On redirige vers la page commande — à développer plus tard
                window.location.href = '/commandes'
            })
        }
    }
}

PanierController.init()