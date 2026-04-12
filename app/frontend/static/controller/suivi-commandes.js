const SuiviCommandesController = {
    init: function () {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token) {
            window.location.href = '/connexion';
            return;
        }

        this.chargerCommandes();

        setInterval(() => {
            this.chargerCommandes();
        }, 10000);
    },

    chargerCommandes: function () {
        CommandeModele.getMesCommandes()
            .then(response => {
                if (response.status === 200 && response.data.commandes) {
                    SuiviCommandesVue.afficherCommandes(response.data.commandes);
                } else {
                    document.getElementById('suivi-conteneur').innerHTML =
                        '<p class="suivi-chargement">Erreur lors du chargement</p>';
                }
            })
            .catch(err => {
                console.error(err);
                document.getElementById('suivi-conteneur').innerHTML =
                    '<p class="suivi-chargement">Erreur lors du chargement</p>';
            });
    }
};

SuiviCommandesController.init();
