/* JS général pour les actions communes à toutes les pages */

const boutonBurger = document.getElementById('boutonburger')
const menuBurger = document.getElementById('listemenu')

boutonBurger.addEventListener("click", affichageBurger);

function affichageBurger() {
    menuBurger.classList.toggle("active");
}