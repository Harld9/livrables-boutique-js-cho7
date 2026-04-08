// Le controller récupère les données du modèle et les envoie à la vue
const FavorisController = {

    // ----- INIT -----
    // Appelé au chargement de la page
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

                // Si aucun favori
                if (reponse.data.favoris.length === 0) {
                    FavorisVue.AffichageAucunResultat()
                    return
                }

                // Sinon on affiche les favoris
                FavorisVue.Affichage(reponse.data.favoris)
            })
            .catch(() => {
                FavorisVue.AffichageErreur()
            })
    }
}

// Lancement au chargement de la page
FavorisController.init()