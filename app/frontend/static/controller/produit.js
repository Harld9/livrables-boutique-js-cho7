const ProduitController = {

    init: () => {
        const id = parseInt(new URLSearchParams(window.location.search).get('id'))

        ProduitModele.getById()
            .then(data => {
                if (data && data.code === 200) {
                    // 1. Affiche le produit
                    ProduitVue.affichage(data.chaussette)

                    // 2. Charge et affiche les variantes
                    return ProduitModele.getVariantes(id)
                } else {
                    ProduitVue.affichageErreur()
                }
            })
            .then(data => {
                if (data && data.code === 200) {
                    ProduitVue.affichageVariantes(data.variantes, id)
                }
            })
            .catch(err => {
                console.error('Erreur :', err)
                ProduitVue.affichageErreur()
            })
    }

}

ProduitController.init()