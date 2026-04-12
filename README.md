# 🧦 Cho7 — Boutique de chaussettes

Projet e-commerce développé en JavaScript Vanilla, Node.js et Express dans le cadre d'un projet Ynov.  
Sans framework frontend — architecture MVC côté front et back.

---

## 👥 Équipe

| Membre | Rôle |
|--------|------|
| Membre 1 | Développeur fullstack |
| Membre 2 | Développeur fullstack |
| Membre 3 | Développeur fullstack |

---

## ✨ Fonctionnalités

- 🧦 Catalogue de chaussettes avec affichage dynamique
- 🔍 Filtres par catégorie et par longueur
- ↕️ Tri par prix croissant / décroissant
- 👟 Page détail produit avec carrousel d'images et produits similaires
- 📦 Gestion des stocks
- 🏷️ Gestion des promotions et réductions
- 🛒 Panier d'achat (localStorage — sans compte requis)
- ❤️ Favoris (base de données — compte requis)
- 🔐 Authentification JWT (inscription / connexion / remember me)
- 📦 Passer une commande avec adresse de livraison (remember me adresse)
- 📋 Suivi des commandes — historique et détail de chaque commande
- 📱 Responsive mobile, tablette et desktop
- ⚠️ Gestion des erreurs HTTP
- 🛡️ Protection des routes API (rate limiting, JWT, injections SQL)

---

## 🛠️ Stack technique

| Côté | Technologies |
|------|-------------|
| Frontend | HTML, CSS, JavaScript Vanilla |
| Backend | Node.js, Express |
| Base de données | MySQL (MAMP) |
| Authentification | JWT, bcrypt |
| Autres | mysql2, cors, dotenv, express-rate-limit |

---

## 📁 Structure du projet

```
app/
├── app.js                          ← Point d'entrée du serveur
├── .env                            ← Variables d'environnement (non versionné)
├── .env.example                    ← Exemple de configuration
├── package.json
│
├── backend/
│   ├── controller/
│   │   ├── chaussette.js           ← Produits, variantes, similaires, favoris
│   │   ├── utilisateur.js          ← Inscription, connexion, profil
│   │   └── commande.js             ← Passer et consulter les commandes
│   ├── router/
│   │   ├── chaussette.js           ← Routes API produits et favoris
│   │   ├── utilisateur.js          ← Routes API utilisateurs
│   │   └── commande.js             ← Routes API commandes
│   └── database/
│       ├── connexiondb.js          ← Connexion MySQL via mysql2/promise
│       ├── migrations/
│       │   └── createdb.sql        ← Création des tables
│       └── insertion/
│           └── insertion.sql       ← Données initiales (30 produits)
│
└── frontend/
    ├── pages/                      ← Fichiers HTML
    │   ├── index.html              ← Accueil avec carrousel
    │   ├── catalogue.html          ← Liste des produits avec filtres
    │   ├── produit.html            ← Détail d'un produit
    │   ├── panier.html             ← Panier d'achat
    │   ├── commandes.html          ← Passer une commande
    │   ├── suivi.html              ← Historique des commandes
    │   ├── favoris.html            ← Liste des favoris
    │   ├── connexion.html          ← Formulaire de connexion
    │   ├── inscription.html        ← Formulaire d'inscription
    │   ├── profil.html             ← Page profil utilisateur
    │   ├── about.html              ← À propos du projet
    │   └── erreur.html             ← Page 404
    └── static/                     ← Fichiers servis par Express
        ├── css/
        │   ├── main.css            ← Styles globaux + variables CSS + navbar
        │   ├── index.css           ← Styles page accueil
        │   ├── catalogue.css       ← Styles catalogue et filtres
        │   ├── produit.css         ← Styles page produit
        │   ├── panier.css          ← Styles page panier
        │   ├── commande.css        ← Styles page commande
        │   ├── suivi.css           ← Styles page suivi commandes
        │   ├── connexion.css       ← Styles formulaire connexion
        │   ├── inscription.css     ← Styles formulaire inscription
        │   └── about.css           ← Styles page à propos
        ├── assets/
        │   ├── imglogo/            ← Logo du site
        │   ├── imgchaussettes/     ← Photos produits (3D et portées)
        │   │   ├── CatUni/
        │   │   ├── CatMotif/
        │   │   └── CatMeme/
        │   └── icons/              ← Icônes navbar
        ├── script/
        │   ├── main.js             ← Burger menu + navbar dynamique selon connexion
        │   ├── connexion.js        ← Logique formulaire connexion
        │   └── inscription.js      ← Logique formulaire inscription
        ├── modele/                 ← Appels API et localStorage
        │   ├── catalogue.js        ← Fetch produits + cache + favoris
        │   ├── produit.js          ← Fetch produit par id + variantes
        │   ├── panier.js           ← CRUD panier localStorage + point rouge
        │   ├── commande.js         ← Fetch commandes + adresse localStorage
        │   └── favoris.js          ← Fetch favoris
        ├── vue/                    ← Génération du HTML (createElement)
        │   ├── catalogue.js
        │   ├── produit.js
        │   ├── panier.js
        │   ├── commande.js
        │   ├── suivi.js
        │   └── favoris.js
        └── controller/             ← Orchestration modele + vue
            ├── catalogue.js        ← Filtres, tri, favoris
            ├── produit.js          ← Détail + variantes + similaires
            ├── panier.js           ← Actions panier + point rouge navbar
            ├── commande.js         ← Validation + autocomplétion adresse API
            ├── suivi.js            ← Historique commandes
            └── favoris.js          ← Liste favoris
```

---

## ⚙️ Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- [MAMP](https://www.mamp.info/) (ou tout autre serveur MySQL local)
- [Git](https://git-scm.com/)

---

### 1. Cloner le repository

```bash
git clone https://github.com/ton-repo/cho7.git
cd cho7/app
```

---

### 2. Installer les dépendances

```bash
npm install
```

Les packages installés sont :

```bash
npm install express cors dotenv mysql2 bcrypt jsonwebtoken express-rate-limit
```

---

### 3. Configurer MAMP

1. Ouvre **MAMP** et démarre les serveurs (Apache + MySQL)
2. Ouvre **phpMyAdmin** → `http://localhost/phpmyadmin`
3. Crée une base de données nommée `cho7`
4. Importe les fichiers SQL dans cet ordre :
   - `backend/database/migrations/createdb.sql` → crée les tables
   - `backend/database/insertion/insertion.sql` → insère les données

> ⚠️ Sur **Mac**, le port MySQL par défaut de MAMP est `8889`.  
> Sur **Windows**, c'est `3306`.

---

### 4. Configurer les variables d'environnement

Crée un fichier `.env` à la racine du dossier `app/` en copiant `.env.example` :

```bash
cp .env.example .env
```

Remplis les valeurs dans `.env` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=cho7
DB_PORT=3306
CLEJWT=une_cle_secrete_longue_et_aleatoire
```

> ⚠️ Ne jamais committer le fichier `.env` — il est dans le `.gitignore`

---

### 5. Lancer le serveur

```bash
node app.js
```

Ou avec **nodemon** pour le rechargement automatique :

```bash
npm install -g nodemon
nodemon app.js
```

Le serveur démarre sur :

```
http://localhost:8080
```

---

## 🔌 Routes API

### Chaussettes

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| GET | `/api/chaussettes` | ❌ | Toutes les chaussettes |
| GET | `/api/chaussette/:id` | ❌ | Une chaussette par id |
| GET | `/api/chaussettes/variantes/:id` | ❌ | Variantes (même longueur + catégorie) |
| GET | `/api/chaussettes/similaires/:id` | ❌ | Produits similaires |
| GET | `/api/chaussettes/favoris` | ✅ JWT | Favoris du client connecté |
| POST | `/api/chaussettes/favoris` | ✅ JWT | Ajouter / retirer un favori |

### Utilisateurs

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/api/inscription` | ❌ | Créer un compte |
| POST | `/api/connexion` | ❌ | Se connecter |
| GET | `/api/utilisateur/:id` | ✅ JWT | Récupérer un utilisateur |

### Commandes

| Méthode | Route | Auth | Description |
|---------|-------|------|-------------|
| POST | `/api/commande` | ✅ JWT | Passer une commande |
| GET | `/api/commandes` | ✅ JWT | Historique des commandes |

---

## 🗄️ Base de données

```
Client          ← utilisateurs (Nom, Prenom, Mail, MotDePasse...)
Categorie       ← Unies / Motifs / Memes
Produit         ← chaussettes (FK → Categorie)
Commande        ← commandes (FK → Client, AdresseLivraison, DateCommande)
Contient        ← table de liaison Commande ↔ Produit (Quantite)
Favoris         ← table de liaison Client ↔ Produit
```

---

## 🔐 Authentification

L'authentification utilise **JWT (JSON Web Token)** :

1. L'utilisateur se connecte → le serveur crée un token signé valable **24h**
2. Le token est stocké dans :
   - `localStorage` si **Remember Me coché** → persiste après fermeture du navigateur
   - `sessionStorage` si **Remember Me décoché** → supprimé à la fermeture de l'onglet
3. Chaque requête sensible envoie le token dans le header `Authorization: Bearer <token>`
4. Le serveur vérifie et décode le token avant d'autoriser la requête

---

## 🛡️ Sécurité

| Mesure | Description |
|--------|-------------|
| JWT | Authentification sans session serveur |
| bcrypt | Mots de passe hachés (10 rounds) |
| Requêtes préparées | `?` dans les SQL — protection injections SQL |
| Rate limiting | 50 requêtes max / 10 minutes par IP sur `/api` |
| XSS | `textContent` et attributs directs — jamais `innerHTML` avec données BDD |
| CORS | Configuré sur toutes les routes API |

---

## 📋 Pages et fonctionnement

| Page | URL | Connexion requise | Description |
|------|-----|-------------------|-------------|
| Accueil | `/` | ❌ | Hero + carrousel produits du moment |
| Catalogue | `/catalogue` | ❌ | Liste produits + filtres + tri |
| Produit | `/produit?id=X` | ❌ | Détail + carrousel + variantes + similaires |
| Panier | `/panier` | ❌ | Gestion panier localStorage |
| Commande | `/commandes` | ✅ | Récap panier + adresse + validation |
| Suivi commandes | `/suivi` | ✅ | Historique et détail des commandes passées |
| Favoris | `/favoris` | ✅ | Liste des produits favoris |
| Connexion | `/connexion` | ❌ | Formulaire connexion + remember me |
| Inscription | `/inscription` | ❌ | Formulaire inscription |
| Profil | `/profil` | ✅ | Données du compte |
| À propos | `/about` | ❌ | Présentation du projet |

---

## 📦 Panier

Le panier est stocké dans le **localStorage** du navigateur — sans compte requis :

- Ajout depuis le catalogue ou la page produit
- Modification des quantités et suppression depuis la page panier
- Le point rouge de la navbar se met à jour automatiquement
- Le panier est vidé automatiquement après validation d'une commande

---

## 📋 Suivi des commandes

La page suivi (`/suivi`) permet de :

- Voir toutes ses commandes passées avec leur date
- Voir le détail de chaque commande (produits, quantités, total)
- Voir l'adresse de livraison de chaque commande
- Accès réservé aux utilisateurs connectés — redirection vers `/connexion` sinon

---

## 🚀 Démarrage rapide (résumé)

```bash
# 1. Cloner
git clone https://github.com/ton-repo/cho7.git && cd cho7/app

# 2. Installer
npm install

# 3. Configurer .env (voir section ci-dessus)

# 4. Lancer MAMP + importer les SQL

# 5. Démarrer
node app.js

# 6. Ouvrir dans le navigateur
# http://localhost:8080
```

---

## Lien vers la présentation

https://gamma.app/docs/Cho7-Presentation-vnw60ftv1qs1emc