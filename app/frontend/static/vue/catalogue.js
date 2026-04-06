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
            /* doit suivre ce template :
            <div class="produit">
                <img class="imgProd" src="/assets/imgchaussettes/CatMeme/cho7-meme-3d-1.png" alt="">
                <div class="infos">
                    <h3 class="nom">Nom Produit</h3>
                    <div class="prix-reduction">
                        <p class="prix">Prix</p>
                        <p class="reduction">réduction</p>
                    </div>
                    <div class="categorie-genre">
                        <p class="categorie">Catégorie</p>
                        <p class="genre ">genre</p>
                    </div>
                    <div class="divBtn">
                        <button class="btnProd">Ajouter panier</button>
                    </div>
                </div>
            </div>
             */
            const produit = document.createElement('div')

            const imgProd = document.createElement('img')

            const infos = document.createElement('div')
            const nom = document.createElement('h3')

            const prixReduction = document.createElement('div')
            const prix = document.createElement('p')
            const reduction = document.createElement('p')

            const categorieGenre = document.createElement('div')
            const categorie = document.createElement('p')
            const genre = document.createElement('p')

            const divBtn = document.createElement('div')
            const bouton = document.createElement('button')

            const dossier = (() => {
                switch (c.NomCategorie) {
                    case 'Memes': return 'CatMeme/'
                    case 'Unies': return 'CatUni/'
                    case 'Motifs': return 'CatMotif/'
                    default:       return ''
                }
            })()

            produit.addEventListener('click', () => {
                window.location.href = '/produit?id=' + c.IdProduit
            })

            // Empêche le clic sur le bouton d'ajout au panier de rediriger vers la page produit
            bouton.addEventListener('click', (event) => {
                event.stopPropagation() // ← bloque la propagation vers produit
                // ton code panier ici plus tard
            })
            // Ajout des classes CSS
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

            // textContent pour toutes les données BDD
            // Image
            const src3D     = '/assets/imgchaussettes/' + dossier + c.Image3D
            const srcPortee = '/assets/imgchaussettes/' + dossier + c.ImagePortee

            imgProd.src = src3D
            imgProd.alt = c.NomProduit

            // Event pour le hover de l'image
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

            // Infos
            nom.textContent = c.NomProduit
            // Prix et Réduction
            prix.textContent = c.Prix + '€'
            if (c.Reduction > 0) {
                prix.classList.add('barrer')
                reduction.textContent = (c.Prix * (1 - c.Reduction)).toFixed(2) + '€'
            }
            // Catégorie et Genre
            categorie.textContent = c.NomCategorie
            genre.textContent = c.Genre

            // Bouton
            bouton.textContent = 'Ajouter au panier'

            // Attribut direct pour la donnée BDD
            bouton.dataset.id = c.IdProduit

            // Assemblage

            prixReduction.appendChild(prix)
            prixReduction.appendChild(reduction)
            categorieGenre.appendChild(categorie)
            categorieGenre.appendChild(genre)
            divBtn.appendChild(bouton)

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
    // Si le controller renvoie une erreur, on affiche cette erreur
    AffichageErreur: () => {
        document.getElementById('liste').innerHTML = 'Erreur de chargement'
    }
}