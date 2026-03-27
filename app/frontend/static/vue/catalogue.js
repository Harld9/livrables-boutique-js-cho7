// Namespace qui regroupe toutes les fonctions d'affichage liées à la page catalogue.
const CatalogueVue = {
    // ===== FONCTIONS =====
    // ----- AFFICHAGE -----
    // Affiche la liste des chaussettes avec les informations du controller (→ modèle)
    Affichage: (chaussettes) => {
        // On prend l'élément HTML <ul> (id= liste)
        const liste = document.getElementById('liste')

        // verification que la balise existe
        if (!liste) return
        // On vide le contenu de la liste. Pas de donnée utilisateur donc pas de faille XSS.
        liste.innerHTML = ''


        // Pour chaque élément de 'chaussettes'
        chaussettes.forEach(c => {
            console.log('5 - Vue : élément', c)
            // Création des éléments
            const div = document.createElement('div')
            const nom = document.createElement('h3')
            const prix = document.createElement('p')
            const pointure = document.createElement('p')
            const genre = document.createElement('p')
            const bouton = document.createElement('button')

            div.classList.add('produit')

            // textContent pour toutes les données BDD
            nom.textContent = c.NomProduit
            prix.textContent = 'Prix : ' + c.Prix + '€'
            pointure.textContent = 'Pointure : ' + c.Pointure
            genre.textContent = 'Genre : ' + c.Genre
            bouton.textContent = 'Ajouter au panier'

            // Attribut direct pour la donnée BDD
            bouton.dataset.id = c.IdProduit

            // Assemblage
            div.appendChild(nom)
            div.appendChild(prix)
            div.appendChild(pointure)
            div.appendChild(genre)
            div.appendChild(bouton)

            liste.appendChild(div)
        })
    },
    // ----- AFFICHAGE ERREUR -----
    // Si le controller renvoie une erreur, on affiche cette erreur
    AffichageErreur: () => {
        document.getElementById('liste').innerHTML = 'Erreur de chargement'
    }
}