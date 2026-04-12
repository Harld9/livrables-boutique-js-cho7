const UtilisateurVue = {
    afficherProfil: function (res) {
        const utilisateur = res.utilisateur;

        // Remplir les IDs individuels
        document.getElementById('profil-prenom').textContent = utilisateur.Prenom;
        document.getElementById('profil-nom').textContent = `${utilisateur.Nom}`;
        document.getElementById('profil-mail').textContent = utilisateur.Mail;
        document.getElementById('profil-tel').textContent = utilisateur.NumeroTel || 'Non renseigné';
    },

    afficherDerniereCommande: function (commandes) {
        const conteneur = document.getElementById('derniere-commande');

        if (!commandes || commandes.length === 0) {
            conteneur.innerHTML = '<p class="commandes-vide">Aucune commande trouvée</p>';
            return;
        }

        const derniereCommande = commandes[0];
        conteneur.innerHTML = `
            <div class="commande-card">
                <p><strong>Numéro :</strong> #${derniereCommande.idCommande}</p>
                <p><strong>Date :</strong> ${new Date(derniereCommande.dateCommande).toLocaleDateString('fr-FR')}</p>
                <p><strong>Adresse :</strong> ${derniereCommande.adresseLivraison}</p>
                <p><strong>Produits :</strong> ${derniereCommande.produits.length}</p>
            </div>
        `;
    }
};