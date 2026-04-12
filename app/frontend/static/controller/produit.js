const ProduitController = {
    // création de liste de favoris
    favorisIds: [],

    // async pour rendre la fonction init asynchrone pour attendre la réponse du serveur 
    init: async () => {
        const id = parseInt(new URLSearchParams(window.location.search).get('id'))

        try {
            ProduitController.favorisIds = await CatalogueModele.getMesFavoris();
        } catch (err) {
            console.error("Impossible de charger les favoris", err)
            //si jamais il y'a une erreur on remet la liste à vide
            ProduitController.favorisIds = []
        }








        ProduitModele.getById()
            .then(data => {
                if (data && data.code === 200) {
                    ProduitVue.affichage(data.chaussette)
                    return ProduitModele.getVariantes(id)
                } else {
                    ProduitVue.affichageErreur()
                }
            })
            .then(data => {
                if (data && data.code === 200) {
                    ProduitVue.affichageVariantes(data.variantes, id)
                    return ProduitModele.getSimilaires(id) // ← enchaîne
                }
            })
            .then(data => {
                if (data && data.code === 200) {
                    ProduitVue.affichageSimilaires(data.memeCategorie, data.memeLongueur)
                }
            })
            .catch(err => {
                console.error('Erreur :', err)
                ProduitVue.affichageErreur()
            })
    }

}

ProduitController.init()