// Namespace qui regroupe toutes les fonctions d'affichage liées à la page catalogue.
const CatalogueVue = {
    // ===== FONCTIONS =====
    // ----- AFFICHAGE -----
    // Affiche la liste des chaussettes avec les informations du controller (→ modèle)
    Affichage: (chaussettes) => {
        // On prend l'élément HTML <ul> (id= liste)
        const liste = document.getElementById('liste')
        
        // verification que la balise existe
        if (liste) {
            // On vide le contenu de la liste. Pas de donnée utilisateur donc pas de faille XSS.
            liste.innerHTML = ''

            let htmlContenu = '';
            
            // Pour chaque élément de 'chaussettes'
            chaussettes.forEach(c => {
                // on injecte le code HTML
                htmlContenu += `<div class="produit">
                    <h3>${c.NomProduit}</h3>
                    <p>Prix: ${c.Prix}€</p>
                    <p>Taille: ${c.Taille}</p>
                    <p>Genre: ${c.Genre}</p>
                    <button data-id="${c.IdProduit}">Ajouter au panier</button>
                </div>`;
            })
            
            // Ajout des balises dans la liste
            liste.innerHTML = htmlContenu;
        }
    },
    // ----- AFFICHAGE ERREUR -----
    // Si le controller renvoie une erreur, on affiche cette erreur
    AffichageErreur: () => {
        document.getElementById('liste').innerHTML = 'Erreur de chargement'
    }
}