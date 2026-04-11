/*
 * On configure ici le serveur Express principal.
 * On définit les middlewares, les routes HTML et les routes API.
 * On lance le serveur sur le port défini.
 */

// On importe Express et on crée l'application
const express = require('express')
const app     = express()
const port    = 8080

// On importe path pour construire les chemins de fichiers
// node: est le préfixe moderne pour les modules natifs Node.js
const path = require('node:path')

// On importe cors pour autoriser les requêtes depuis d'autres origines
const cors = require('cors')

// On importe express-rate-limit pour protéger l'API contre les abus
const rateLimit = require('express-rate-limit')

// ===== RATE LIMIT =====
// On configure un limiteur de requêtes pour protéger toutes les routes /api
const limiteurAPI = rateLimit({
    // On définit une fenêtre de 10 minutes (en millisecondes)
    windowMs: 10 * 60 * 1000,
    // On autorise 50 requêtes maximum par fenêtre de 10 minutes par IP
    max: 50,
    // On renvoie ce message si la limite est dépassée
    message: 'Oups ! Trop de requêtes envoyées depuis cette adresse IP. Veuillez réessayer dans 10 minutes.',
    // On envoie le nombre de requêtes restantes dans les headers HTTP modernes
    standardHeaders: true,
    // On désactive les anciens headers — obsolètes et inutiles
    legacyHeaders: false,
})

// ===== MIDDLEWARES =====
// On applique le limiteur sur toutes les routes qui commencent par /api
app.use('/api', limiteurAPI)

// On autorise toutes les origines — à restreindre en production
app.use(cors({ origin: '*' }))

// On permet à Express de lire le JSON envoyé dans le body des requêtes POST
app.use(express.json())

// On sert tous les fichiers statiques (CSS, JS, images) depuis frontend/static
// Express les rend accessibles via leur chemin depuis la racine ex: /css/main.css
app.use(express.static(path.join(__dirname, 'frontend/static')))

// ===== ROUTES HTML =====
// On écoute les GET sur chaque URL et on renvoie le fichier HTML correspondant
// path.join gère les différences de séparateurs entre Windows (\) et Mac/Linux (/)

// On sert la page d'accueil
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/index.html'))
)

// On sert la page catalogue
app.get('/catalogue', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/catalogue.html'))
)

// On sert la page panier
app.get('/panier', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/panier.html'))
)

// On sert la page favoris
app.get('/favoris', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/favoris.html'))
)

// On sert la page suivi des commandes (historique)
app.get('/suivi-commandes', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/suivi-commandes.html'))
)

// On sert la page de commande (validation + adresse)
app.get('/commandes', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/commandes.html'))
)

// On sert la page de connexion
app.get('/connexion', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/connexion.html'))
)

// On sert la page d'inscription
app.get('/inscription', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/inscription.html'))
)

// On sert la page à propos
app.get('/about', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/about.html'))
)

// On sert la page profil
app.get('/profil', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/profil.html'))
)

// On sert la page détail d'un produit
// L'id du produit est passé en query parameter → /produit?id=1
app.get('/produit', (req, res) =>
    res.sendFile(path.join(__dirname, 'frontend/pages/produit.html'))
)

// ===== ROUTES API =====
// On importe et branche le router des chaussettes sur /api
// Toutes les routes de chaussetteRouter seront préfixées par /api
const chaussetteRouter = require('./backend/router/chaussette')
app.use('/api', chaussetteRouter)

// On importe et branche le router des utilisateurs sur /api
// Toutes les routes de utilisateurRouter seront préfixées par /api
const utilisateurRouter = require('./backend/router/utilisateur')
app.use('/api', utilisateurRouter)

// On importe et branche le router des commandes sur /api
const commandeRouter = require('./backend/router/commande')
app.use('/api', commandeRouter)

// ===== GESTIONNAIRE 404 =====
// On place ce gestionnaire en dernier — Express parcourt toutes les routes dans l'ordre
// Si aucune route ne correspond à l'URL demandée, on renvoie la page d'erreur
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/erreur.html'))
})

// ===== LANCEMENT DU SERVEUR =====
// On démarre le serveur et on affiche l'URL dans le terminal
app.listen(port, () => {
    console.log(`Serveur lancé sur le port : http://localhost:${port}`)
})