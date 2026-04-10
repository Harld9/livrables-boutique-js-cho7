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
- 📱 Responsive mobile, tablette et desktop
- ⚠️ Gestion des erreurs HTTP

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
├── app.js                      ← Point d'entrée du serveur
├── .env                        ← Variables d'environnement (non versionné)
├── .env.example                ← Exemple de configuration
├── package.json
│
├── backend/
│   ├── controller/
│   │   ├── chaussette.js       ← Logique métier produits et favoris
│   │   └── utilisateur.js      ← Logique métier utilisateurs
│   ├── router/
│   │   ├── chaussette.js       ← Routes API produits
│   │   └── utilisateur.js      ← Routes API utilisateurs
│   └── database/
│       ├── connexiondb.js      ← Connexion MySQL
│       ├── migrations/
│       │   └── createdb.sql    ← Création des tables
│       └── insertion/
│           └── insertion.sql   ← Données initiales
│
└── frontend/
    ├── pages/                  ← Fichiers HTML
    │   ├── index.html
    │   ├── catalogue.html
    │   ├── produit.html
    │   ├── panier.html
    │   ├── favoris.html
    │   ├── connexion.html
    │   ├── inscription.html
    │   ├── commandes.html
    │   ├── profil.html
    │   ├── about.html
    │   └── erreur.html
    └── static/                 ← Fichiers servis par Express
        ├── css/
        ├── assets/
        ├── script/
        │   ├── main.js         ← Burger menu + navbar dynamique
        │   ├── connexion.js
        │   └── inscription.js
        ├── modele/             ← Appels API et localStorage
        ├── vue/                ← Génération du HTML
        └── controller/        ← Orchestration modele + vue
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

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/chaussettes` | Toutes les chaussettes |
| GET | `/api/chaussette/:id` | Une chaussette par id |
| GET | `/api/chaussettes/variantes/:id` | Variantes (même longueur + catégorie) |
| GET | `/api/chaussettes/similaires/:id` | Produits similaires |
| GET | `/api/chaussettes/favoris` | Favoris du client connecté |
| POST | `/api/chaussettes/favoris` | Ajouter / retirer un favori |

### Utilisateurs

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/api/inscription` | Créer un compte |
| POST | `/api/connexion` | Se connecter |
| GET | `/api/utilisateur/:id` | Récupérer un utilisateur |

---

## 🗄️ Base de données

```
Client          ← utilisateurs
Categorie       ← Unies / Motifs / Memes
Produit         ← chaussettes (FK → Categorie)
Commande        ← commandes (FK → Client)
Contient        ← table de liaison Commande ↔ Produit
Favoris         ← table de liaison Client ↔ Produit
```

---

## 🔐 Authentification

L'authentification utilise **JWT (JSON Web Token)** :

1. L'utilisateur se connecte → le serveur crée un token signé valable 24h
2. Le token est stocké dans `localStorage` (remember me) ou `sessionStorage`
3. Chaque requête sensible envoie le token dans le header `Authorization: Bearer <token>`
4. Le serveur vérifie et décode le token avant d'autoriser la requête

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