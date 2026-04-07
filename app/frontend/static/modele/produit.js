const ProduitModele = {

    getById: () => {
        const id = new URLSearchParams(window.location.search).get('id')
        if (!id) return Promise.reject('Aucun id dans l URL')
        return fetch('/api/chaussette/' + id)
            .then(res => res.json())
    },

    getVariantes: (id) => {
        return fetch('/api/chaussettes/variantes/' + id)
            .then(res => res.json())
    },

    getSimilaires: (id) => {
        return fetch('/api/chaussettes/similaires/' + id)
            .then(res => res.json())
    }

}