const ProduitVue = {

    affichage: (produit) => {
        const container = document.getElementById('produit')
        if (!container) return

        // Dossier image selon catégorie
        const dossier = (() => {
            switch (produit.NomCategorie.trim()) {
                case 'Memes':
                    return 'CatMeme/'
                case 'Unies':
                    return 'CatUni/'
                case 'Motifs':
                    return 'CatMotif/'
                default:
                    return ''
            }
        })()

        container.innerHTML = ''

        // ===== STRUCTURE =====
        const wrapper = document.createElement('div')
        const colonneImg = document.createElement('div')
        const img = document.createElement('img')
        const colonneInfos = document.createElement('div')

        // Fil d'ariane
        const filAriane  = document.createElement('p')
        const lienAccueil   = document.createElement('a')
        const sep1          = document.createElement('span')
        const lienCatalogue = document.createElement('a')
        const sep2          = document.createElement('span')
        const nomProduit    = document.createElement('span')

        // Catégorie badge
        const badge = document.createElement('span')

        // Nom
        const nom = document.createElement('h1')

        // Prix
        const prixWrapper = document.createElement('div')
        const prix = document.createElement('p')
        const reduction = document.createElement('p')

        // Description
        const description = document.createElement('p')

        // Infos supplémentaires
        const infosSupp = document.createElement('div')
        const longueur = document.createElement('p')
        const pointure = document.createElement('p')
        const genre = document.createElement('p')
        const stock = document.createElement('p')

        // Bouton
        const bouton = document.createElement('button')

        // ===== CLASSES CSS =====
        wrapper.classList.add('produit-wrapper')
        colonneImg.classList.add('colonne-img')
        colonneInfos.classList.add('colonne-infos')
        filAriane.classList.add('fil-ariane')
        badge.classList.add('badge-categorie')
        nom.classList.add('produit-nom')
        prixWrapper.classList.add('prix-wrapper')
        prix.classList.add('produit-prix')
        reduction.classList.add('produit-reduction')
        description.classList.add('produit-description')
        infosSupp.classList.add('infos-supp')
        bouton.classList.add('primaire', 'btn-panier')

        // ===== CONTENU =====
        // ===== CARROUSEL =====
        const carrousel = document.createElement('div')
        const imgPrincipale = document.createElement('img')
        const thumbnailsWrapper = document.createElement('div')

        carrousel.classList.add('carrousel')
        imgPrincipale.classList.add('img-principale')
        thumbnailsWrapper.classList.add('thumbnails')

        // Les deux images disponibles
        const images = [
            '/assets/imgchaussettes/' + dossier + produit.Image3D,
            '/assets/imgchaussettes/' + dossier + produit.ImagePortee
        ]

        // Image affichée par défaut
        imgPrincipale.src = images[0]
        imgPrincipale.alt = produit.NomProduit

        // Génère les thumbnails
        images.forEach((src, index) => {
            const thumb = document.createElement('img')
            thumb.src = src
            thumb.alt = produit.NomProduit + ' vue ' + (index + 1)
            thumb.classList.add('thumbnail')

            // Première thumbnail active par défaut
            if (index === 0) thumb.classList.add('active')

            // Clic sur thumbnail → change l'image principale
            thumb.addEventListener('click', () => {
                // Change l'image principale avec fondu
                imgPrincipale.style.opacity = '0'
                setTimeout(() => {
                    imgPrincipale.src = src
                    imgPrincipale.style.opacity = '1'
                }, 150)

                // Met à jour la thumbnail active
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'))
                thumb.classList.add('active')
            })

            thumbnailsWrapper.appendChild(thumb)
        })

        carrousel.appendChild(imgPrincipale)
        carrousel.appendChild(thumbnailsWrapper)
        colonneImg.appendChild(carrousel)

        // Fil d'ariane
        lienAccueil.href        = '/'
        lienAccueil.textContent = 'Accueil'

        sep1.textContent = ' > '

        lienCatalogue.href        = '/catalogue'
        lienCatalogue.textContent = 'Catalogue'

        sep2.textContent = ' > '

        nomProduit.textContent = produit.NomProduit

        filAriane.appendChild(lienAccueil)
        filAriane.appendChild(sep1)
        filAriane.appendChild(lienCatalogue)
        filAriane.appendChild(sep2)
        filAriane.appendChild(nomProduit)

        // Badge Catégorie
        badge.textContent = produit.NomCategorie

        // Nom
        nom.textContent = produit.NomProduit

        // Prix et réduction
        if (produit.Reduction > 0) {
            prix.classList.add('barrer')
            prix.textContent = produit.Prix + '€'
            reduction.textContent = (produit.Prix * (1 - produit.Reduction)).toFixed(2) + '€'
        } else {
            prix.textContent = produit.Prix + '€'
        }

        description.textContent = produit.Description

        longueur.textContent = 'Longueur : ' + produit.Longueur
        pointure.textContent = 'Pointure : ' + produit.Pointure
        genre.textContent = 'Genre : ' + produit.Genre
        stock.textContent = produit.Stock > 0 ? 'En stock ✓' : 'Rupture de stock'
        stock.classList.add(produit.Stock > 0 ? 'en-stock' : 'rupture')

        bouton.textContent = 'Ajouter au panier'
        bouton.dataset.id = produit.IdProduit

        // ===== ASSEMBLAGE =====
        prixWrapper.appendChild(prix)
        prixWrapper.appendChild(reduction)

        infosSupp.appendChild(longueur)
        infosSupp.appendChild(pointure)
        infosSupp.appendChild(genre)
        infosSupp.appendChild(stock)

        colonneInfos.appendChild(filAriane)
        colonneInfos.appendChild(badge)
        colonneInfos.appendChild(nom)
        colonneInfos.appendChild(prixWrapper)
        colonneInfos.appendChild(description)
        colonneInfos.appendChild(infosSupp)
        colonneInfos.appendChild(bouton)

        wrapper.appendChild(colonneImg)
        wrapper.appendChild(colonneInfos)

        container.appendChild(wrapper)
    },

    affichageVariantes: (variantes, idActuel) => {
        const colonneInfos = document.querySelector('.colonne-infos')
        if (!colonneInfos) return

        const wrapper = document.createElement('div')
        const label   = document.createElement('label')
        const select  = document.createElement('select')

        wrapper.classList.add('variantes-wrapper')
        label.classList.add('variantes-label')
        select.classList.add('variantes-select')

        label.textContent = 'Choisir un modèle'
        label.setAttribute('for', 'variantes')
        select.id = 'variantes'

        // Génère les options
        variantes.forEach(v => {
            const option = document.createElement('option')

            // Attribut direct — donnée BDD
            option.value = v.IdProduit

            // textContent — donnée BDD
            option.textContent = v.NomProduit

            // Marque le produit actuel comme sélectionné
            if (v.IdProduit === idActuel) {
                option.selected = true
            }

            select.appendChild(option)
        })

        // Redirige vers le produit sélectionné
        select.addEventListener('change', () => {
            window.location.href = '/produit?id=' + select.value
        })

        wrapper.appendChild(label)
        wrapper.appendChild(select)

        // Insère avant le bouton ajouter au panier
        const bouton = document.querySelector('.btn-panier')
        colonneInfos.insertBefore(wrapper, bouton)
    },

    affichageErreur: () => {
        document.getElementById('produit').innerHTML = 'Produit introuvable'
    }

}