// Fait le lien entre le modèle (catalogue) et la vue (catalogue)
const CatalogueController = {
    // Stocke les données originales pour pouvoir retrier sans refetch
    chaussettes: [],

    // la fonction qui lance toute la logique de la page
    init: () => {
        console.log('3 - Controller : init')
        // on demande les données au modèle
        CatalogueModele.getChaussettes()
            .then(data => {
                console.log('4 - Controller : envoi à la vue', data)
                if (data && data.code === 200) {
                    // Sauvegarde pour le tri
                    CatalogueController.chaussettes = data.chaussettes
                    // une fois les données recues, on demande à la vue de les afficher
                    CatalogueVue.Affichage(data.chaussettes)
                    CatalogueController.initTri()
                } else {
                    CatalogueVue.AffichageErreur()
                }
            })
            .catch((erreur) => {
                console.log('5 - Controller : ERREUR', erreur)
                console.error("Erreur :", erreur);
                CatalogueVue.AffichageErreur();
            })
    },

    initTri: () => {
        const boutons = document.querySelectorAll('.btn-tri')

        boutons.forEach(bouton => {
            bouton.addEventListener('click', () => {

                // Met à jour le bouton actif
                boutons.forEach(b => b.classList.remove('actif'))
                bouton.classList.add('actif')

                const tri = bouton.dataset.tri

                // Copie le tableau pour ne pas modifier l'original
                let chaussettes = [...CatalogueController.chaussettes]

                // Pourquoi parseFloat ?
                // Prix vient de la BDD en string '5.00'
                // '5.00' - '12.00'  // ❌ NaN en JS
                // parseFloat('5.00') - parseFloat('12.00')  // ✅ -7
                if (tri === 'croissant') {
                    chaussettes.sort((a, b) => parseFloat(a.Prix) - parseFloat(b.Prix))
                } else if (tri === 'decroissant') {
                    chaussettes.sort((a, b) => parseFloat(b.Prix) - parseFloat(a.Prix))
                }
                // 'defaut' → tableau original non modifié

                CatalogueVue.Affichage(chaussettes)
            })
        })
    }
}

// on exécute l'initialisation dès que le fichier est chargé
CatalogueController.init();