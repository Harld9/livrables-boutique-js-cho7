const SuiviCommandesVue = {
    afficherCommandes: function (commandes) {
        const container = document.getElementById('suivi-conteneur');

        if (!commandes || commandes.length === 0) {
            container.innerHTML = `
                <div class="suivi-vide">
                    <div class="suivi-vide-icone">📭</div>
                    <div class="suivi-vide-titre">Aucune commande</div>
                    <div class="suivi-vide-texte">Vous n'avez pas encore passé de commande</div>
                </div>
            `;
            return;
        }

        let html = '';

        commandes.forEach(commande => {
            const statut = this.obtenirStatutLivraison(commande);
            const pourcentage = this.calculerPourcentageProgression(commande);
            const total = commande.produits.reduce((sum, p) => sum + (p.prix * p.quantite), 0);

            const date = new Date(commande.dateCommande);
            const dateFormatee = date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            html += `
                <div class="commande-item">
                    <div class="commande-entete">
                        <div>
                            <div class="commande-numero">Commande #${commande.idCommande}</div>
                            <div class="commande-date">📅 ${dateFormatee}</div>
                        </div>
                        <span class="commande-statut ${statut.classe}">${statut.texte}</span>
                    </div>

                    <div class="progression-livraison">
                        <div class="progression-livraison-bar" style="width: ${pourcentage}%"></div>
                    </div>

                    <div class="commande-produits">
            `;

            commande.produits.forEach(produit => {
                html += `
                    <div class="commande-produit">
                        <div>
                            <div class="commande-produit-nom">${produit.nomProduit}</div>
                            <div class="commande-produit-qte">Quantité: ${produit.quantite}</div>
                        </div>
                        <div class="commande-produit-prix">${(produit.prix * produit.quantite).toFixed(2)}€</div>
                    </div>
                `;
            });

            html += `
                    </div>

                    <div class="commande-footer">
                        <div>
                            <div class="commande-total">Montant total</div>
                            <div class="commande-total-montant">${total.toFixed(2)}€</div>
                        </div>
                    </div>
            `;

            if (statut.delai) {
                html += `<div class="commande-statut ${statut.classe}" style="margin-top: 12px; display: block;">${statut.delai}</div>`;
            }

            if (commande.adresseLivraison) {
                html += `<div class="commande-adresse">📍 Livraison à: ${commande.adresseLivraison}</div>`;
            }

            html += '</div>';
        });

        container.innerHTML = html;
    },

    obtenirStatutLivraison: function (commande) {
        const delaiMs = this.obtenirDelaiMs(commande);
        const maintenant = Date.now();
        const dateCommande = new Date(commande.dateCommande).getTime();
        const ecouleMilisec = maintenant - dateCommande;

        if (ecouleMilisec >= delaiMs) {
            return {
                texte: '✓ Livrée',
                classe: 'statut-livree',
                delai: 'Commande livrée'
            };
        } else {
            const tempRestant = delaiMs - ecouleMilisec;
            const joursRestants = Math.ceil(tempRestant / (1000 * 60 * 60 * 24));
            return {
                texte: '⏱ En cours',
                classe: 'statut-en-cours',
                delai: `Livraison estimée dans ${joursRestants} jour${joursRestants > 1 ? 's' : ''}`
            };
        }
    },

    obtenirDelaiMs: function (commande) {
        const cleDelai = `commande_delai_${commande.idCommande}`;
        const delaiStocke = localStorage.getItem(cleDelai);

        if (delaiStocke) {
            return parseInt(delaiStocke);
        }

        const delaiAleatoire = Math.floor(Math.random() * 7) + 1;
        const delaiMs = delaiAleatoire * 24 * 60 * 60 * 1000;
        localStorage.setItem(cleDelai, delaiMs);

        return delaiMs;
    },

    calculerPourcentageProgression: function (commande) {
        const delaiMs = this.obtenirDelaiMs(commande);
        const maintenant = Date.now();
        const dateCommande = new Date(commande.dateCommande).getTime();
        const ecouleMilisec = maintenant - dateCommande;

        const pourcentage = Math.min(100, (ecouleMilisec / delaiMs) * 100);
        return pourcentage;
    }
};
