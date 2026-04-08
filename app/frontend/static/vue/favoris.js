// Namespace qui regroupe toutes les fonctions d'affichage liées à la page favoris
const FavorisVue = {

    // ----- AFFICHAGE -----
    // affiche la liste des favoris avec les informations du controller
    Affichage: (chaussettes) => {
        const liste = document.getElementById('liste')

        // on vérifie que la balise avec l'id liste existe
        if (!liste) return

        // on vide le contenu de la liste
        liste.innerHTML = ''

        // pour chaque favoris on créé un élément avec les informations du favori
        chaussettes.forEach(c => {
            const produit         = document.createElement('div')
            const imgProd         = document.createElement('img')
            const infos           = document.createElement('div')
            const nom             = document.createElement('h3')
            const prixReduction   = document.createElement('div')
            const prix            = document.createElement('p')
            const reduction       = document.createElement('p')
            const categorieGenre  = document.createElement('div')
            const categorie       = document.createElement('p')
            const genre           = document.createElement('p')
            const divBtn          = document.createElement('div')
            const bouton          = document.createElement('button')

            // si un élément est déjà en favoris on lui met le coeur rouge direct
            const boutonFavoris       = document.createElement('button')
            boutonFavoris.classList.add('boutonFavoris')
            boutonFavoris.textContent = '❤️'

            // on détermine le dossier d'image selon la catégorie meme/uni etc...
            const dossier = (() => {
                switch (c.NomCategorie) {
                    case 'Memes':  return 'CatMeme/'
                    case 'Unies':  return 'CatUni/'
                    case 'Motifs': return 'CatMotif/'
                    default:       return ''
                }
            })()

            // quand l'utilisateur clique sur la carte du produit il est redirigé vers le produit
            produit.addEventListener('click', () => {
                window.location.href = '/produit?id=' + c.IdProduit
            })

            // quand l'utilisateur clique sur ajouter au panier on lui bloque la redirection
            bouton.addEventListener('click', (event) => {
                event.stopPropagation()
            })

            // Clic sur le coeur → retire des favoris et supprime la carte
            boutonFavoris.addEventListener('click', (event) => {
                event.stopPropagation()
                FavorisModele.toggleFavori(c.IdProduit)
                    .then(reponse => {
                        if (reponse.status === 200 && !reponse.data.favori) {
                            // On retire la carte du DOM
                            liste.removeChild(produit)
                            // Si plus aucun favori, on affiche le message vide
                            if (liste.children.length === 0) {
                                FavorisVue.AffichageAucunResultat()
                            }
                        } else if (reponse.status === 401) {
                            window.location.href = '/connexion'
                        }
                    })
            })

            // Ajout des classes CSS (mêmes que catalogue)
            produit.classList.add('produit')
            imgProd.classList.add('imgProd')
            infos.classList.add('infos')
            nom.classList.add('nom')
            prixReduction.classList.add('prix-reduction')
            prix.classList.add('prix')
            reduction.classList.add('reduction')
            categorieGenre.classList.add('categorie-genre')
            categorie.classList.add('categorie')
            genre.classList.add('genre')
            divBtn.classList.add('divBtn')
            bouton.classList.add('btnProd')

            // Images avec hover
            const src3D     = '/assets/imgchaussettes/' + dossier + c.Image3D
            const srcPortee = '/assets/imgchaussettes/' + dossier + c.ImagePortee

            imgProd.src = src3D
            imgProd.alt = c.NomProduit

            imgProd.addEventListener('mouseenter', () => {
                imgProd.style.opacity = '0'
                setTimeout(() => {
                    imgProd.src = srcPortee
                    imgProd.style.opacity = '1'
                }, 150)
            })
            imgProd.addEventListener('mouseleave', () => {
                imgProd.style.opacity = '0'
                setTimeout(() => {
                    imgProd.src = src3D
                    imgProd.style.opacity = '1'
                }, 150)
            })

            // Remplissage des infos
            nom.textContent = c.NomProduit
            prix.textContent = c.Prix + '€'
            if (c.Reduction > 0) {
                prix.classList.add('barrer')
                reduction.textContent = (c.Prix * (1 - c.Reduction)).toFixed(2) + '€'
            }
            categorie.textContent = c.NomCategorie
            genre.textContent     = c.Genre
            bouton.textContent    = 'Ajouter au panier'
            bouton.dataset.id     = c.IdProduit

            // Assemblage
            prixReduction.appendChild(prix)
            prixReduction.appendChild(reduction)
            categorieGenre.appendChild(categorie)
            categorieGenre.appendChild(genre)
            divBtn.appendChild(bouton)
            divBtn.appendChild(boutonFavoris)
            infos.appendChild(nom)
            infos.appendChild(prixReduction)
            infos.appendChild(categorieGenre)
            infos.appendChild(divBtn)
            produit.appendChild(imgProd)
            produit.appendChild(infos)
            liste.appendChild(produit)
        })
    },

    // ----- AFFICHAGE ERREUR -----
    // Si le controller renvoie une erreur
    AffichageErreur: () => {
        document.getElementById('liste').innerHTML = 'Erreur de chargement'
    },

    // ----- AFFICHAGE AUCUN RÉSULTAT -----
    // Si le client n'a pas de favoris
    AffichageAucunResultat: () => {
        const liste = document.getElementById('liste')
        if (!liste) return
        liste.innerHTML = ''
        const message = document.createElement('p')
        message.classList.add('aucun-resultat')
        message.textContent = 'Vous n\'avez pas encore de favoris'
        liste.appendChild(message)
    }
}