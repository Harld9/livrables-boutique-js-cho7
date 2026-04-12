const UtilisateurController = {
    initialisation: function () {
        // On récupère le token stocké lors de la connexion
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (!token) {
            console.warn('Aucun token trouvé, redirection vers connexion');
            window.location.href = '/pages/connexion.html';
            return;
        }
        
        // On décode le token JWT pour extraire l'ID utilisateur
        // Format: header.payload.signature — on prend la partie payload (index 1)
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.id;
        
        // On demande les données au modèle avec l'ID réel
        UtilisateurModele.getUtilisateur(userId)
            .then(data => {
                console.log('data reçue :', data);
                if (data && data.code === 200) {
                    UtilisateurVue.afficherProfil(data);
                    // On récupère et affiche la dernière commande
                    this.afficherDerniereCommande();
                }
            })
            .catch(err => console.error("Erreur d'initialisation :", err));
    },

    afficherDerniereCommande: function () {
        CommandeModele.getMesCommandes()
            .then(response => {
                if (response.status === 200 && response.data.commandes) {
                    UtilisateurVue.afficherDerniereCommande(response.data.commandes);
                } else {
                    console.warn('Erreur lors de la récupération des commandes');
                    document.getElementById('derniere-commande').innerHTML =
                        '<p class="commandes-vide">Impossible de charger les commandes</p>';
                }
            })
            .catch(err => {
                console.error('Erreur:', err);
                document.getElementById('derniere-commande').innerHTML =
                    '<p class="commandes-vide">Erreur lors du chargement</p>';
            });
    }
};

UtilisateurController.initialisation();