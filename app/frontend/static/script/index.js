const fenetre = document.querySelector('.carrousselfenetre');
const piste = document.querySelector('.carrousselpiste');
const cartes = document.querySelectorAll('.carteproduit');

setInterval(() => {
    const largeurCarte = cartes[0].offsetWidth + 20; // Taille d'une carte + le gap
    
    // si on a dépassé la moitié du ruban (les 5 premières photos)
    if (fenetre.scrollLeft >= largeurCarte * 5) {
        // on désactive le scroll fluide une fraction de seconde pour se téléporter
        fenetre.style.scrollBehavior = 'auto';
        fenetre.scrollLeft = 0;
        // on remet le fluide et on avance d'une case
        fenetre.style.scrollBehavior = 'smooth';
        fenetre.scrollLeft += largeurCarte;
    } else {
        // marche normale
        fenetre.scrollLeft += largeurCarte;
    }
}, 4000);