// Fait le lien entre le modèle (catalogue) et la vue (catalogue)
const CatalogueController = {
    // la fonction qui lance toute la logique de la page
    init: () => {
        console.log('3 - Controller : init')
        // on demande les données au modèle
        CatalogueModele.getChaussettes()
            .then(data => {
                console.log('4 - Controller : envoi à la vue', data)
                if (data && data.code === 200) {
                    // une fois les données recues, on demande à la vue de les afficher
                    CatalogueVue.Affichage(data.chaussettes)
                } else {
                    CatalogueVue.AffichageErreur()
                }
            })
            .catch((erreur) => {
                console.log('5 - Controller : ERREUR', erreur)
                console.error("Erreur :", erreur);
                CatalogueVue.AffichageErreur();
            })
    }
}

// on exécute l'initialisation dès que le fichier est chargé
CatalogueController.init();