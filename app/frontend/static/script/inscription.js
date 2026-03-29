const formulaire = document.getElementById('formInscription');



formulaire.addEventListener ('submit', async (event) => {
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
const donneesClient = {
    nom: nom,
    prenom: prenom,
    adresse: adresse,
    mail: mail,
    numeroTel: numeroTel,
    motDePasse: mdp};

await fetch("http://localhost:8080/api/inscription",{
    method : "POST",
    headers : { "Content-Type" : "application/json"},
    body : JSON.stringify(donneesClient)
})
});

