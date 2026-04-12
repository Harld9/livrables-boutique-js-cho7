const UtilisateurController = {
    initialisation: function () {
        // On demande les données au modèle
        UtilisateurModele.getUtilisateur(1)
            .then(data => {
                if (data && data.code === 200) {
                    // On demande à la vue d'afficher
                    UtilisateurVue.afficherProfil(data);
                }
            })
            .catch(err => console.error("Erreur d'initialisation :", err));
    }
};

// On lance le script
UtilisateurController.initialisation();

const token = localStorage.getItem('token');

// si pas de jeton, on bloque l'accès et on redirige l'utilsiateur vers connexion
if (!token) {
    window.location.href = '/connexion';
}