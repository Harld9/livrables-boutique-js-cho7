const ProduitController = {

    init: () => {
        const id = parseInt(new URLSearchParams(window.location.search).get('id'))

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