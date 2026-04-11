const UtilisateurVue = {
    afficherProfil: function(res) {
        const u = res.utilisateur;

        document.getElementById('profil-prenom').textContent  = u.Prenom;
        document.getElementById('profil-nom').textContent     = u.Prenom + ' ' + u.Nom;
        document.getElementById('profil-mail').textContent    = u.Mail;
        document.getElementById('profil-tel').textContent     = u.NumeroTel;
        document.getElementById('profil-adresse').textContent = u.Adresse;

        document.getElementById('btn-deconnexion').addEventListener('click', function() {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            Object.keys(localStorage)
                .filter(k => k.startsWith('user_data_'))
                .forEach(k => localStorage.removeItem(k));
            window.location.href = '/connexion';
        });
    }
};