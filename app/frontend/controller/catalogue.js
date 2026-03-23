// Fait le lien entre le modèle (catalogue) et la vue (catalogue)
const CatalogueController = {

    init: () => {
        CatalogueModele.getChaussettes()
            .then(data => CatalogueVue.render(data.chaussettes))
            .catch(() => CatalogueVue.renderErreur())
    }

}