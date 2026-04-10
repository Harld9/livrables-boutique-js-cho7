/*
 * On gère ici les comportements communs à toutes les pages du site.
 * On initialise le menu burger et on adapte la navbar selon l'état de connexion.
 */

// On récupère les éléments du burger
const boutonBurger = document.getElementById('boutonburger')
const menuBurger   = document.getElementById('listemenu')

// On gère l'ouverture et fermeture du menu burger au clic
if (boutonBurger && menuBurger) {
    boutonBurger.addEventListener('click', affichageBurger)
}

// On affiche ou cache le menu en ajoutant/retirant la classe 'active'
function affichageBurger() {
    menuBurger.classList.toggle('active')
}

// On ferme le menu si on clique en dehors de la navbar
document.addEventListener('click', (e) => {
    if (menuBurger && !e.target.closest('.navbar')) {
        menuBurger.classList.remove('active')
    }
})

// ===== NAVBAR DYNAMIQUE =====
// On cherche le token dans localStorage d'abord, puis sessionStorage
// localStorage.getItem — récupère la valeur persistante
// sessionStorage.getItem — récupère la valeur de session
const token  = localStorage.getItem('token')  || sessionStorage.getItem('token')
const prenom = localStorage.getItem('prenom') || sessionStorage.getItem('prenom')

// On récupère les éléments de la navbar
const icones = document.querySelector('.icones')
const menu   = document.getElementById('listemenu')

if (token) {
    // ===== UTILISATEUR CONNECTÉ =====

    // On masque le lien Connexion/Inscription quand l'utilisateur est connecté
    menu.querySelectorAll('a').forEach(lien => {
        if (lien.getAttribute('href') === '/connexion') {
            lien.parentElement.style.display = 'none'
        }
    })

    // On ajoute le lien de déconnexion dans le menu burger
    const liDeconnexion   = document.createElement('li')
    const lienDeconnexion = document.createElement('a')

    lienDeconnexion.href        = '#'
    lienDeconnexion.textContent = 'Se déconnecter'
    lienDeconnexion.classList.add('lien-deconnexion')

    // On gère le clic sur déconnexion
    lienDeconnexion.addEventListener('click', (e) => {
        // Bloque le comportement par défaut du navigateur (ici le rechargement de la page)
        e.preventDefault()
        // On vide les deux stockages pour être sûr de tout effacer
        // localStorage.removeItem — supprime la clé du stockage persistant
        localStorage.removeItem('token')
        localStorage.removeItem('prenom')

        // On supprime la clé du stockage de session
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('prenom')

        window.location.href = '/'
    })

    liDeconnexion.appendChild(lienDeconnexion)
    menu.appendChild(liDeconnexion)

} else {
    // ===== UTILISATEUR NON CONNECTÉ =====

    // On cache l'icône favoris
    const logoFavoris = document.getElementById('logofavoris')
    if (logoFavoris) logoFavoris.parentElement.style.display = 'none'

    // On cache le conteneur profil
    const conteneurProfil = document.querySelector('.conteneurprofil')
    if (conteneurProfil) conteneurProfil.style.display = 'none'

    // On cache les liens du menu qui nécessitent une connexion
    const liensAMasquer = ['/favoris', '/commandes']
    menu.querySelectorAll('a').forEach(lien => {
        if (liensAMasquer.includes(lien.getAttribute('href'))) {
            lien.parentElement.style.display = 'none'
        }
    })

    // On ajoute les boutons connexion/inscription dans le menu burger pour mobile
    const liConnexion   = document.createElement('li')
    const liInscription = document.createElement('li')
    const aConnexion    = document.createElement('a')
    const aInscription  = document.createElement('a')

    aConnexion.href        = '/connexion'
    aConnexion.textContent = 'Se connecter'
    aConnexion.classList.add('lien-menu-connexion')

    aInscription.href        = '/inscription'
    aInscription.textContent = "S'inscrire"
    aInscription.classList.add('lien-menu-inscription')

    liConnexion.appendChild(aConnexion)
    liInscription.appendChild(aInscription)

    menu.appendChild(liConnexion)
    menu.appendChild(liInscription)

    // On ajoute les boutons dans les icônes pour desktop
    const boutonConnexion   = document.createElement('a')
    const boutonInscription = document.createElement('a')

    boutonConnexion.href        = '/connexion'
    boutonConnexion.textContent = 'Se connecter'
    boutonConnexion.classList.add('btn-nav-connexion')

    boutonInscription.href        = '/inscription'
    boutonInscription.textContent = "S'inscrire"
    boutonInscription.classList.add('btn-nav-inscription')

// element.appendChild(enfant) — insère boutonConnexion à la fin de icones.
    icones.appendChild(boutonConnexion)
// element.appendChild(enfant) — insère boutonInscription à la fin de icones.
    icones.appendChild(boutonInscription)
}