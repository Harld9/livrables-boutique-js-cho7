const formulaire = document.getElementById('formInscription');



formulaire.addEventListener ('submit', async (event) => {
    //empeche la page de se reload apres l'inscriptiaon
    event.preventDefault()
    const prenom = document.getElementById('prenom').value
    const nom = document.getElementById('nom').value
    const adresse = document.getElementById('adresse').value
    const mail = document.getElementById('email').value
    const numeroTel = document.getElementById('numeroTel').value
    const mdp = document.getElementById('mdp').value
    const mdpVerif = document.getElementById('mdpVerif').value
    console.log(formulaire,prenom,nom,adresse,mail,numeroTel,mdp,mdpVerif)

    // check si le mdp est bon
if ( mdp !== mdpVerif ) {
    alert("Erreur : Les mots de passe ne sont pas identiques !");
    return ; 
}
//donnéee envoyées
const donneesClient = {
    nom: nom,
    prenom: prenom,
    adresse: adresse,
    mail: mail,
    numeroTel: numeroTel,
    motDePasse: mdp};

try {
       //on attend que le serveur réponde et on stocke sa réponse dans une variable
        const reponse = await fetch("http://localhost:8080/api/inscription", {
            method : "POST",
            headers : { "Content-Type" : "application/json"},
            body : JSON.stringify(donneesClient)
        });

        //on regarde le statut de la réponse si c'est ok on badcule l'utilisateur de la page d'inscription à la page connexion
        if (reponse.ok) {
            window.location.href = "/connexion";
        } 
    } catch (erreur) {
       console.log(erreur)
    }
});