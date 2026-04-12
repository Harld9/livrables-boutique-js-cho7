/*
 * On gère ici l'affichage de la page panier.
 * On construit le HTML à partir des données du modèle.
 * On émet des événements pour que le controller réagisse aux actions.
 */

const PanierVue = {

    affichage: (panier, total) => {
        const container = document.getElementById('panier-liste')
        const totalEl = document.getElementById('panier-total')
        if (!container) return

        container.innerHTML = ''

        if (panier.length === 0) {
            PanierVue.affichageVide()
            return
        }

        panier.forEach(p => {
            const ligne = document.createElement('div')
            const img = document.createElement('img')
            const infos = document.createElement('div')
            const nom = document.createElement('p')
            const prixUnite = document.createElement('p')
            const quantiteWrapper = document.createElement('div')
            const btnMoins = document.createElement('button')
            const quantiteEl = document.createElement('span')
            const btnPlus = document.createElement('button')
            const prixTotal = document.createElement('p')
            const btnSuppr = document.createElement('button')

            ligne.classList.add('panier-ligne')
            img.classList.add('panier-img')
            infos.classList.add('panier-infos')
            nom.classList.add('panier-nom')
            prixUnite.classList.add('panier-prix-unite')
            quantiteWrapper.classList.add('panier-quantite')
            btnMoins.classList.add('btn-quantite')
            quantiteEl.classList.add('quantite-valeur')
            btnPlus.classList.add('btn-quantite')
            prixTotal.classList.add('panier-prix-total')
            btnSuppr.classList.add('btn-supprimer')

            // Attributs directs — données localStorage
            img.src = '/assets/imgchaussettes/' + p.dossier + p.image
            img.alt = p.nom

            // textContent — données localStorage
            nom.textContent = p.nom
            // calcule le prix réduit si réduction > 0
            const prixFinal = p.reduction > 0
                ? parseFloat(p.prix) * (1 - parseFloat(p.reduction))
                : parseFloat(p.prix)

            // Prix unitaire — barré si réduction
            if (p.reduction > 0) {
                prixUnite.textContent = 'Prix unitaire : ' + parseFloat(p.prix).toFixed(2) + '€'
                prixUnite.classList.add('barrer')

                const prixReduit = document.createElement('p')
                prixReduit.classList.add('panier-prix-reduit')
                prixReduit.textContent = 'Prix réduit : ' + prixFinal.toFixed(2) + '€'
                infos.appendChild(prixReduit)
            } else {
                prixUnite.textContent = 'Prix unitaire : ' + prixFinal.toFixed(2) + '€'
            }
            btnMoins.textContent = '−'
            quantiteEl.textContent = p.quantite
            btnPlus.textContent = '+'
            // Prix total avec réduction appliquée
            prixTotal.textContent = (prixFinal * p.quantite).toFixed(2) + '€'
            btnSuppr.textContent = '🗑'

            // dataset — stocke l'id pour le controller
            btnMoins.dataset.id = p.id
            btnPlus.dataset.id = p.id
            btnSuppr.dataset.id = p.id

            // Events — le controller écoute ces boutons via délégation
            btnMoins.addEventListener('click', () => {
                PanierController.modifierQuantite(p.id, p.quantite - 1)
            })
            btnPlus.addEventListener('click', () => {
                PanierController.modifierQuantite(p.id, p.quantite + 1)
            })
            btnSuppr.addEventListener('click', () => {
                PanierController.supprimer(p.id)
            })

            // Clic sur la ligne → page produit
            ligne.addEventListener('click', () => {
                window.location.href = '/produit?id=' + p.id
            })

            // Empêche la propagation des boutons vers la ligne
            btnMoins.addEventListener('click', e => e.stopPropagation())
            btnPlus.addEventListener('click', e => e.stopPropagation())
            btnSuppr.addEventListener('click', e => e.stopPropagation())

            // Assemblage
            quantiteWrapper.appendChild(btnMoins)
            quantiteWrapper.appendChild(quantiteEl)
            quantiteWrapper.appendChild(btnPlus)

            infos.appendChild(nom)
            infos.appendChild(prixUnite)
            infos.appendChild(quantiteWrapper)
            infos.appendChild(prixTotal)

            ligne.appendChild(img)
            ligne.appendChild(infos)
            ligne.appendChild(btnSuppr)

            container.appendChild(ligne)
        })

        // Met à jour le total
        if (totalEl) totalEl.textContent = total.toFixed(2) + '€'
    },

    affichageVide: () => {
        const container = document.getElementById('panier-liste')
        const totalEl = document.getElementById('panier-total')
        if (!container) return

        container.innerHTML = ''
        const message = document.createElement('p')
        message.classList.add('panier-vide')
        message.textContent = 'Votre panier est vide'
        container.appendChild(message)

        if (totalEl) totalEl.textContent = '0.00€'
    }
}