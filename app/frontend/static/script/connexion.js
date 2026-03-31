const formulaire = document.getElementById('formConnexion');

formulaire.addEventListener('submit', async (event) => {
    //empeche la page de se reload apres l'inscription
    event.preventDefault();

    const mail = document.getElementById('email').value;
    const mdp = document.getElementById('mdp').value;
    const rememberMe = document.getElementById('rememberMe').checked; // Pour plus tard ;)

    console.log("Tentative de connexion pour :", mail);

    try {
        const reponse = await fetch("http://localhost:8080/api/connexion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mail: mail,
                motDePasse: mdp
            })
        });

        const donnees = await reponse.json();

        if (reponse.ok) {
            //on stock le token cache
           localStorage.setItem('token', donnees.token);
        localStorage.setItem('prenom', donnees.prenom);

            window.location.href = "/";
        } else {
            alert("Erreur : " + donnees.message);
        }

    } catch (erreur) {
        console.error("Erreur de connexion :", erreur);
    }
});