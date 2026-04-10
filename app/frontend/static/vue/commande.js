/*
 * On gère ici l'affichage de la page commande.
 * On affiche le récap du panier et le formulaire d'adresse.
 */

const CommandeVue = {

    affichageRecap: (panier, total) => {
        const container = document.getElementById('commande-recap')
        if (!container) return

        container.innerHTML = ''

        panier.forEach(p => {
            const ligne      = document.createElement('div')
            const img        = document.createElement('img')
            const infos      = document.createElement('div')
            const nom        = document.createElement('p')
            const details    = document.createElement('p')
            const prixTotal  = document.createElement('p')

            ligne.classList.add('recap-ligne-produit')
            img.classList.add('recap-img')
            infos.classList.add('recap-infos')
            nom.classList.add('recap-nom')
            details.classList.add('recap-details')
            prixTotal.classList.add('recap-prix')

            // Attribut direct — donnée localStorage
            img.src = '/assets/imgchaussettes/' + p.dossier + p.image
            img.alt = p.nom

            // textContent — données localStorage
            nom.textContent     = p.nom
            details.textContent = 'Quantité : ' + p.quantite + ' × ' + parseFloat(p.prix).toFixed(2) + '€'

            // On calcule le prix avec réduction si besoin
            const prixFinal = p.reduction > 0
                ? parseFloat(p.prix) * (1 - parseFloat(p.reduction))
                : parseFloat(p.prix)
            prixTotal.textContent = (prixFinal * p.quantite).toFixed(2) + '€'

            infos.appendChild(nom)
            infos.appendChild(details)
            ligne.appendChild(img)
            ligne.appendChild(infos)
            ligne.appendChild(prixTotal)
            container.appendChild(ligne)
        })

        // On affiche le total
        const totalEl = document.getElementById('commande-total')
        if (totalEl) totalEl.textContent = total.toFixed(2) + '€'
    },

    // Pre-remplie l'adresse si elle est sauvegardée
    preremplirAdresse: (adresse) => {
        const input = document.getElementById('adresse-livraison')
        if (input && adresse) {
            input.value = adresse
            // On coche la case remember me si une adresse est déjà sauvegardée
            const checkbox = document.getElementById('remember-adresse')
            if (checkbox) checkbox.checked = true
        }
    },

    affichageErreur: (message) => {
        const erreur = document.getElementById('commande-erreur')
        if (!erreur) return
        erreur.textContent  = message
        erreur.style.display = 'block'
    },

    affichageSucces: (idCommande) => {
        const container = document.getElementById('commande-container')
        if (!container) return

        container.innerHTML = ''

        const succes  = document.createElement('div')
        const icone   = document.createElement('p')
        const titre   = document.createElement('h2')
        const message = document.createElement('p')
        const numero  = document.createElement('p')
        const bouton  = document.createElement('a')

        succes.classList.add('commande-succes')
        icone.classList.add('succes-icone')
        titre.classList.add('succes-titre')
        message.classList.add('succes-message')
        numero.classList.add('succes-numero')
        bouton.classList.add('primaire', 'succes-bouton')

        icone.textContent   = '✅'
        titre.textContent   = 'Commande confirmée !'
        message.textContent = 'Votre commande a bien été enregistrée.'
        numero.textContent  = 'Numéro de commande : #' + idCommande
        bouton.textContent  = 'Continuer mes achats'
        bouton.href         = '/catalogue'

        succes.appendChild(icone)
        succes.appendChild(titre)
        succes.appendChild(message)
        succes.appendChild(numero)
        succes.appendChild(bouton)
        container.appendChild(succes)
    }
}