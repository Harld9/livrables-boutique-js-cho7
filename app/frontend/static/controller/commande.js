/*
 * On fait ici le lien entre le modèle et la vue de la page commande.
 * On vérifie la connexion, affiche le récap et gère la validation.
 */

const CommandeController = {

    init: () => {
        // On vérifie que l'utilisateur est connecté
        const token = localStorage.getItem('token') || sessionStorage.getItem('token')
        if (!token) {
            // window.location.href — redirige vers la connexion si non connecté
            window.location.href = '/connexion'
            return
        }

        // On vérifie que le panier n'est pas vide
        const panier = PanierModele.getPanier()
        if (panier.length === 0) {
            window.location.href = '/panier'
            return
        }

        // On affiche le récap du panier
        const total = PanierModele.calculerTotal(panier)
        CommandeVue.affichageRecap(panier, total)

        // On pré-remplit l'adresse si elle est sauvegardée
        const adresseSauvegardee = CommandeModele.getAdresseSauvegardee()
        CommandeVue.preremplirAdresse(adresseSauvegardee)

        // On initialise l'autocomplétion d'adresse
        CommandeController.initAutocomplete()

        // On initialise le bouton de validation
        CommandeController.initValidation()
    },

    // Autocomplétion via l'API Adresse gouvernementale
    initAutocomplete: () => {
        const input       = document.getElementById('adresse-livraison')
        const suggestions = document.getElementById('suggestions-adresse')
        if (!input || !suggestions) return

        let timer
        input.addEventListener('input', () => {
            clearTimeout(timer)
            const valeur = input.value

            if (valeur.length < 5) {
                suggestions.innerHTML = ''
                return
            }

            // setTimeout — attend 300ms après la dernière frappe avant d'appeler l'API
            timer = setTimeout(() => {
                fetch('https://api-adresse.data.gouv.fr/search/?q=' + encodeURIComponent(valeur) + '&limit=5')
                    .then(res => res.json())
                    .then(data => {
                        suggestions.innerHTML = ''

                        data.features.forEach(feature => {
                            const li = document.createElement('li')
                            li.classList.add('suggestion-item')
                            // textContent — donnée externe (API gouvernementale)
                            li.textContent = feature.properties.label

                            li.addEventListener('click', () => {
                                input.value          = feature.properties.label
                                suggestions.innerHTML = ''
                            })

                            suggestions.appendChild(li)
                        })
                    })
            }, 300)
        })

        // On ferme les suggestions si on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target)) suggestions.innerHTML = ''
        })
    },

    initValidation: () => {
        const btnValider = document.getElementById('btn-valider-commande')
        if (!btnValider) return

        btnValider.addEventListener('click', async () => {
            const adresse  = document.getElementById('adresse-livraison').value.trim()
            const remember = document.getElementById('remember-adresse').checked
            const panier   = PanierModele.getPanier()

            // On vérifie que l'adresse est renseignée
            if (!adresse) {
                CommandeVue.affichageErreur('Veuillez renseigner une adresse de livraison.')
                return
            }

            // On sauvegarde ou supprime l'adresse selon la case remember me
            if (remember) {
                CommandeModele.sauvegarderAdresse(adresse)
            } else {
                CommandeModele.supprimerAdresse()
            }

            // On désactive le bouton pour éviter le double clic
            btnValider.disabled     = true
            btnValider.textContent  = 'Traitement en cours...'

            // On envoie la commande à l'API
            const reponse = await CommandeModele.passerCommande(panier, adresse)

            if (reponse.status === 201) {
                // On vide le panier après la commande
                PanierModele.vider()
                PanierModele.mettreAJourPointrouge()
                // On affiche la page de confirmation
                CommandeVue.affichageSucces(reponse.data.idCommande)

            } else if (reponse.status === 401) {
                window.location.href = '/connexion'

            } else {
                CommandeVue.affichageErreur(reponse.data.message || 'Erreur lors de la commande.')
                btnValider.disabled    = false
                btnValider.textContent = 'Valider ma commande'
            }
        })
    }
}

CommandeController.init()