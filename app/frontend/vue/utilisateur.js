const UtilisateurVue = {
    afficherProfil: function(utilisateur) {
        
        // on cible la balise HTML où on veut afficher les infos
        const conteneur = document.getElementById('profil-utilisateur');

        // verification que la balise existe
        if (conteneur) {
            // on injecte le code HTML
            conteneur.innerHTML = `
                <div class="profil-card">
                    <h2>Profil de ${utilisateur.Prenom} ${utilisateur.Nom}</h2>
                    <p><strong>Email :</strong> ${utilisateur.Mail}</p>
                    <p><strong>Téléphone :</strong> ${utilisateur.NumeroTel}</p>
                    <p><strong>Adresse :</strong> ${utilisateur.Adresse}</p>
                </div>
            `;
        } else {
            console.error("Erreur : la balise avec l'id 'profil-utilisateur' est introuvable.");
        }
    }
};