// Le controller récupère les données du modèle et les envoie à la vue
const FavorisController = {

    // ----- INIT -----
    init: () => {
        console.log('1 - Controller favoris : init')

        FavorisModele.getFavoris()
            .then(reponse => {
                console.log('2 - Controller favoris : données reçues', reponse)

                // Si non connecté → redirection connexion
                if (reponse.status === 401) {
                    window.location.href = '/connexion'
                    return
                }

                // Si aucun favori (ON UTILISE CATALOGUEVUE ICI)
                if (reponse.data.favoris.length === 0) {
                    CatalogueVue.AffichageAucunResultat()
                    return
                }

                // 🌟 L'ASTUCE DU MENTOR : LE FAUSSAIRE 🌟
                // On crée le faux objet que la Vue s'attend à trouver pour colorier les coeurs.
                // On prend la liste des favoris, et on extrait uniquement les IDs.
                window.CatalogueController = {
                    favorisIds: reponse.data.favoris.map(chaussette => chaussette.IdProduit)
                };

                // On envoie les données à la machine d'affichage du catalogue !
                CatalogueVue.Affichage(reponse.data.favoris)
            })
            .catch((erreur) => {
                console.error(erreur)
                CatalogueVue.AffichageErreur()
            })
    }
}

// Lancement au chargement de la page
FavorisController.init()