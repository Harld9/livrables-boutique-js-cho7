// Import express
const express = require('express');
const app = express();
const port = 8080;
// Appel du chemin node
const path = require("node:path");
// Le CORS autorise toutes les adresses IP
const cors = require('cors');
app.use(cors({
    origin: '*'
}))

// permet à Express de lire le contenu d'une requête POST en JSON
app.use(express.json());

//routes vers les fichiers statiques
app.use(express.static(path.join(__dirname, 'frontend/static')));

// ===== ROUTES HTML =====
// ------ INDEX ------
// On écoute les get sur l'URL / puis on retourne le fichier index.html via son chemin absolu
// path.join est nécessaire, car les chemins sont différents selon les OS — Windows utilise \ et Mac/Linux utilisent /. path.join gère ça automatiquement.
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/index.html'))
)
// ------ CATALOGUE ------
app.get('/catalogue', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/catalogue.html'))
)
// ------ PANIER ------
app.get('/panier', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/panier.html'))
)
// ------ FAVORIS ------
app.get('/favoris', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/favoris.html'))
)
// ------ COMMANDES ------
app.get('/commandes', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/commandes.html'))
)
// ------ CONNEXION ------
app.get('/connexion', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/connexion.html'))
)
// ------ INSCRIPTION ------
app.get('/inscription', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/inscription.html'))
)
// ------ À PROPOS ------
app.get('/about', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/about.html'))
)
// ------ PROFIL ------
app.get('/profil', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/profil.html'))
)
// ------ PRODUIT ------
app.get('/produit', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/produit.html'))
)

// ===== ROUTES API =====
// ------ CHAUSSETTES ------
// On ajoute le '/api' afin d'éviter les confusions entre les routes API et page HTML (JSON ou HTML)
const chaussetteRouter = require('./backend/router/chaussette')
app.use('/api', chaussetteRouter)
// pour les utilisateurs
const utilisateurRouter = require('./backend/router/utilisateur')
app.use('/api' ,utilisateurRouter)

// ===== GESTIONNAIRES 404 =====
// Placé en dernier exprès, Express parcourt toutes les routes dans l'ordre, et si aucune ne correspond à l'URL demandée, il tombe sur celle-ci et renvoie la page d'erreur.
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/erreur.html'))
})

// ====== LANCEMENT SERVER ======
app.listen(port, () => {
    console.log(`Serveur lancé sur le port : http://localhost:${port}`)
});