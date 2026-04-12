/*
 * On gère ici toute la logique de stockage du panier dans le localStorage.
 * Le panier est un tableau d'objets {id, nom, prix, quantite, image, dossier}.
 * On ne fait pas d'appel API ici — tout est local.
 */

const PanierModele = {

    // localStorage.getItem — récupère le panier stocké ou retourne un tableau vide
    getPanier: () => {
        const panier = localStorage.getItem('panier')
        return panier ? JSON.parse(panier) : []
    },

    // localStorage.setItem — sauvegarde le tableau panier en JSON
    sauvegarder: (panier) => {
        localStorage.setItem('panier', JSON.stringify(panier))
    },

    // Ajoute un produit ou incrémente sa quantité s'il existe déjà
    ajouter: (produit) => {
        const panier = PanierModele.getPanier()

        // Array.find — cherche si le produit est déjà dans le panier
        const existant = panier.find(p => p.id === produit.id)

        if (existant) {
            // Si déjà présent, on incrémente la quantité
            existant.quantite += 1
        } else {
            // Sinon, on ajoute le produit avec une quantité de 1.
            panier.push({ ...produit, quantite: 1 })
        }

        PanierModele.sauvegarder(panier)
        return panier
    },

    // Modifie la quantité d'un produit — le supprime si quantité = 0
    modifierQuantite: (id, quantite) => {
        let panier = PanierModele.getPanier()

        if (quantite <= 0) {
            // Array.filter — retire le produit du tableau si quantité nulle
            panier = panier.filter(p => p.id !== id)
        } else {
            // Array.find — trouve le produit et met à jour sa quantité
            const produit = panier.find(p => p.id === id)
            if (produit) produit.quantite = quantite
        }

        PanierModele.sauvegarder(panier)
        return panier
    },

    // Array.filter — supprime un produit du panier par son id
    supprimer: (id) => {
        const panier = PanierModele.getPanier().filter(p => p.id !== id)
        PanierModele.sauvegarder(panier)
        return panier
    },

    // Calcule le prix total du panier
    calculerTotal: (panier) => {
        // Array.reduce — additionne prix * quantite pour chaque produit
        return panier.reduce((total, p) => {
            // On applique la réduction si elle existe
            const prixFinal = p.reduction > 0 ? parseFloat(p.prix) * (1 - parseFloat(p.reduction)) : parseFloat(p.prix)
            return total + (prixFinal * p.quantite)
        }, 0)
    },

    // localStorage.removeItem — vide complètement le panier
    vider: () => {
        localStorage.removeItem('panier')
    },

    // Met à jour le point rouge de la navbar avec le nombre d'articles
    mettreAJourPointrouge: () => {
        const panier = PanierModele.getPanier()
        const pointrouge = document.querySelector('.pointrouge')
        if (!pointrouge) return

        // Array.reduce — additionne toutes les quantités
        const total = panier.reduce((acc, p) => acc + p.quantite, 0)
        // Si limite au dela de 99, on affiche 99+
        pointrouge.textContent = total > 99 ? '99+' : total
    }
}
