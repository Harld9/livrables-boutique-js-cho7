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
            
            // gestion bouton favoris
            const boutonFavoris = document.createElement('button')
            boutonFavoris.classList.add('boutonFavoris')
            
            // conversion de la liste d'id en texte pour comparer
            const favorisTexte = CatalogueController.favorisIds.map(id => id.toString());
            // conversiond de l'id actuel de la chaussette en string
            const idProduitTexte = c.IdProduit.toString();

            // si l'id de la chaussette est dans la liste de favoris on met le coeur en rouge
            if (favorisTexte.includes(idProduitTexte)) {
                boutonFavoris.textContent = '❤️'; 
            } else {
                boutonFavoris.textContent = '🤍'; 
            }

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

            boutonFavoris.addEventListener('click', (event) => {
                
                // empêche la redirection vers le produit quand on clique sur le coeur
                event.stopPropagation(); 

                // on appelle le modele pour ajoute ou supprimer
                CatalogueModele.toggleFavori(c.IdProduit)
                    .then(reponse => {
                        if (reponse.status === 200) {
                            if (reponse.data.favori === true) {
                                event.target.textContent = '❤️';
                            } else {
                                event.target.textContent = '🤍';
                            }
                        } else if (reponse.status === 401) {
                            window.location.href = '/connexion';
                        }
                    })
                    .catch(err => console.error("Erreur favoris :", err));
            });

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

            // On ajoute le produit au panier lors du clic sur le bouton
            bouton.addEventListener('click', (e) => {
                e.stopPropagation()

                // On prépare l'objet produit à ajouter au panier
                PanierModele.ajouter({
                    id:     c.IdProduit,
                    nom:    c.NomProduit,
                    prix:   c.Prix,
                    reduction: c.Reduction,
                    image:  c.Image3D,
                    dossier: (() => {
                        switch (c.NomCategorie) {
                            case 'Memes':  return 'CatMeme/'
                            case 'Unies':  return 'CatUni/'
                            case 'Motifs': return 'CatMotif/'
                            default:       return ''
                        }
                    })()
                })

                // On met à jour le point rouge de la navbar
                PanierModele.mettreAJourPointrouge()

                // On donne un feedback visuel à l'utilisateur
                bouton.textContent = '✓ Ajouté !'
                bouton.style.backgroundColor = 'green'
                setTimeout(() => {
                    bouton.textContent = 'Ajouter au panier'
                    bouton.style.backgroundColor = ''
                }, 1500)
            })

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
    // Si le controller renvoie une erreur, on affiche cette erreur
    AffichageErreur: () => {
        document.getElementById('liste').innerHTML = 'Erreur de chargement'
    },

    AffichageAucunResultat: () => {
        const liste = document.getElementById('liste')
        if (!liste) return
        liste.innerHTML = ''

        const message = document.createElement('p')
        message.classList.add('aucun-resultat')
        message.textContent = 'Aucun produit ne correspond à votre recherche'
        liste.appendChild(message)
    },
}