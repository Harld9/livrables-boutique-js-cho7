const UtilisateurVue = {
    afficherProfil: function(res) {
        const u = res.utilisateur;

        document.getElementById('profil-prenom').textContent  = u.Prenom;
        document.getElementById('profil-nom').textContent     = u.Prenom + ' ' + u.Nom;
        document.getElementById('profil-mail').textContent    = u.Mail;
        document.getElementById('profil-tel').textContent     = u.NumeroTel;

        document.getElementById('btn-deconnexion').addEventListener('click', function() {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            Object.keys(localStorage)
                .filter(k => k.startsWith('user_data_'))
                .forEach(k => localStorage.removeItem(k));
            window.location.href = '/connexion';
        });
    },

    afficherDerniereCommande: function(commandes) {
        const container = document.getElementById('derniere-commande');
        
        if (!commandes || commandes.length === 0) {
            container.innerHTML = '<p class="commandes-vide">Aucune commande trouvée</p>';
            return;
        }

        const commande = commandes[0]; // La première est la plus récente (ORDER BY DESC)
        
        // Calcul du total
        const total = commande.produits.reduce((sum, p) => sum + (p.prix * p.quantite), 0);
        
        // Formatage de la date
        const date = new Date(commande.dateCommande);
        const dateFormatee = date.toLocaleDateString('fr-FR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        let html = '<div class="derniere-commande-item">';
        html += `<div class="commande-numero">Commande #${commande.idCommande}</div>`;
        html += `<div class="commande-date">📅 ${dateFormatee}</div>`;
        html += '<div class="commande-produits">';

        commande.produits.forEach(produit => {
            html += `<div class="commande-produit-item">
                <strong>${produit.nomProduit}</strong> 
                <span style="color: var(--couleur-texte-leger);">x${produit.quantite}</span>
                ${produit.prix ? `<span style="float: right;">${(produit.prix * produit.quantite).toFixed(2)}€</span>` : ''}
            </div>`;
        });

        html += '</div>';
        html += `<div class="commande-total"><strong>Total: ${total.toFixed(2)}€</strong></div>`;
        html += '</div>';

        container.innerHTML = html;
    }
};