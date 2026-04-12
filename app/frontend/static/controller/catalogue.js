// Fait le lien entre le modèle (catalogue) et la vue (catalogue)
const CatalogueController = {
    // Stocke les données originales pour pouvoir retrier sans refetch
    chaussettes: [],

    // État des filtres
    filtres: {
        categorie: 'tous',
        longueur: 'tous',
        tri: 'defaut'
    },

    favorisIds: [],

    // la fonction qui lance toute la logique de la page
    init: async () => {
        console.log('3 - Controller : init')

        // on demande la liste des favoris au back pour savoir si les chaussettes sont deja en favoris
        CatalogueController.favorisIds = await CatalogueModele.getMesFavoris();
        console.log("Mes favoris au chargement :", CatalogueController.favorisIds);

        // on demande les données au modèle
        CatalogueModele.getChaussettes()
            .then(data => {
                console.log('4 - Controller : envoi à la vue', data)
                if (data && data.code === 200) {
                    // Sauvegarde pour le tri
                    CatalogueController.chaussettes = data.chaussettes
                    // une fois les données recues, on demande à la vue de les afficher avec les tri
                    CatalogueController.appliquer()
                    CatalogueController.initFiltres()
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

    // ===== APPLIQUE FILTRES + TRI =====
    appliquer: () => {
        let resultat = [...CatalogueController.chaussettes]

        // Filtre catégorie
        if (CatalogueController.filtres.categorie !== 'tous') {
            resultat = resultat.filter(c =>
                c.NomCategorie === CatalogueController.filtres.categorie
            )
        }

        // Filtre longueur
        if (CatalogueController.filtres.longueur !== 'tous') {
            resultat = resultat.filter(c =>
                c.Longueur === CatalogueController.filtres.longueur
            )
        }

        // Tri prix
        if (CatalogueController.filtres.tri === 'croissant') {
            resultat.sort((a, b) => parseFloat(a.Prix) - parseFloat(b.Prix))
        } else if (CatalogueController.filtres.tri === 'decroissant') {
            resultat.sort((a, b) => parseFloat(b.Prix) - parseFloat(a.Prix))
        }

        // Affiche le résultat ou un message si aucun résultat
        if (resultat.length === 0) {
            CatalogueVue.AffichageAucunResultat()
        } else {
            CatalogueVue.Affichage(resultat)
        }
    },

    // ===== INIT FILTRES CATÉGORIE ET LONGUEUR =====
    initFiltres: () => {

        // Catégorie
        document.querySelectorAll('#filtre-categorie .btn-filtre').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#filtre-categorie .btn-filtre')
                    .forEach(b => b.classList.remove('actif'))
                btn.classList.add('actif')
                CatalogueController.filtres.categorie = btn.dataset.valeur
                CatalogueController.appliquer()
            })
        })

        // Longueur
        document.querySelectorAll('#filtre-longueur .btn-filtre').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('#filtre-longueur .btn-filtre')
                    .forEach(b => b.classList.remove('actif'))
                btn.classList.add('actif')
                CatalogueController.filtres.longueur = btn.dataset.valeur
                CatalogueController.appliquer()
            })
        })
    },

    // ===== INIT TRI =====
    initTri: () => {
        document.querySelectorAll('.btn-tri').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.btn-tri')
                    .forEach(b => b.classList.remove('actif'))
                btn.classList.add('actif')
                CatalogueController.filtres.tri = btn.dataset.tri
                CatalogueController.appliquer()
            })
        })
    }
}

// on exécute l'initialisation dès que le fichier est chargé
CatalogueController.init();