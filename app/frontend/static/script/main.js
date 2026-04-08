/*
 * On gère ici les comportements communs à toutes les pages du site.
 * On initialise le menu burger pour la navigation mobile.
 */

// On récupère le bouton burger et le menu dans le DOM
const boutonBurger = document.getElementById('boutonburger')
const menuBurger   = document.getElementById('listemenu')

// On écoute le clic sur le bouton burger
boutonBurger.addEventListener('click', affichageBurger)

// On affiche ou cache le menu en ajoutant/retirant la classe 'active'
// classList.toggle ajoute la classe si elle est absente, la retire si elle est présente
function affichageBurger() {
    menuBurger.classList.toggle('active')
}