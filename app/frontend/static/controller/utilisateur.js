const UtilisateurController = {
    initialisation: function() {
         const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            window.location.href = '/connexion';
            return; 
        }

        //    Le token JWT est en 3 parties séparées par des points : header.payload.signature
        //    La partie centrale (payload) est en base64
        const payload = JSON.parse(atob(token.split('.')[1]));
        const idUtilisateur = payload.id; // correspond à ce que tu mets dans jwt.sign()

        // 3. On appelle l'API avec le bon ID
        UtilisateurModele.getUtilisateur(idUtilisateur, token)

            .then(data => {
                console.log('data reçue :', data); // ← ajoute ça
                if (data && data.code === 200) {
                    UtilisateurVue.afficherProfil(data);
                }
            })
            .catch(err => console.error("Erreur d'initialisation :", err));
    }
};

UtilisateurController.initialisation();