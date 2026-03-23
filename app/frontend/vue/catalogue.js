// Génère du HTML
const CatalogueVue = {

    render: (chaussettes) => {
        const liste = document.getElementById('liste')
        liste.innerHTML = ''

        chaussettes.forEach(c => {
            liste.innerHTML += `
                <li>
                    <a href="/produit?id=${c.id}">${c.nom}</a>
                    <span>${c.prix}€</span>
                </li>
            `
        })
    },

    renderErreur: () => {
        document.getElementById('liste').innerHTML = 'Erreur de chargement'
    }

}