const UtilisateurController = {
    // la fonction qui lance toute la logique de la page
    initialisation: function() {
        // on demande les données au modèle
        UtilisateurModele.getUtilisateur(1)
            .then(data => {
                // une fois les données recues, on demande à la vue de les afficher
                UtilisateurVue.afficherProfil(data[0]);
            });
    }
};

// on exécute l'initialisation dès que le fichier est chargé
UtilisateurController.initialisation();