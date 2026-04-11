const UtilisateurController = {
    initialisation: function() {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            window.location.href = '/connexion';
            return; 
        }

     
        const payload = JSON.parse(atob(token.split('.')[1]));
        const idUtilisateur = payload.id; 

      
        UtilisateurModele.getUtilisateur(idUtilisateur, token)

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

    afficherDerniereCommande: function() {
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