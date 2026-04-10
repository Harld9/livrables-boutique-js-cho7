/*
 * On gère ici la logique métier des commandes.
 * On enregistre la commande et les produits associés en base de données.
 * On vérifie le token JWT pour identifier le client connecté.
 */

const db  = require('../database/connexiondb.js')
const jwt = require('jsonwebtoken')

// ===== POST /api/commande =====
exports.passerCommande = async (req, res) => {
    try {
        // On vérifie que le token est bien présent dans le header
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ code: 401, message: 'Non autorisé — veuillez vous connecter' })
        }

        // authHeader.split(' ')[1] — extrait le token en retirant "Bearer "
        const token        = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.CLEJWT)
        const idClient     = decodedToken.id

        // On récupère les données envoyées par le front
        const { panier, adresse } = req.body

        // On vérifie que le panier n'est pas vide
        if (!panier || panier.length === 0) {
            return res.status(400).json({ code: 400, message: 'Le panier est vide' })
        }

        // On vérifie que l'adresse est renseignée
        if (!adresse || adresse.trim() === '') {
            return res.status(400).json({ code: 400, message: 'L\'adresse de livraison est obligatoire' })
        }

        // On crée la commande en base de données
        // NOW() — fonction MySQL qui retourne la date et l'heure actuelles
        const sqlCommande = `
            INSERT INTO Commande (DateCommande, IdClient, AdresseLivraison)
            VALUES (NOW(), ?, ?)
        `
        const [resultatCommande] = await db.query(sqlCommande, [idClient, adresse])

        // On récupère l'id de la commande qui vient d'être créée
        const idCommande = resultatCommande.insertId

        // On insère chaque produit du panier dans la table Contient
        for (const produit of panier) {
            const sqlContient = `
                INSERT INTO Contient (IdProduit, IdCommande, Quantite)
                VALUES (?, ?, ?)
            `
            await db.query(sqlContient, [produit.id, idCommande, produit.quantite])
        }

        res.status(201).json({
            code: 201,
            message: 'Commande passée avec succès',
            idCommande: idCommande
        })

    } catch (err) {
        console.error('ERREUR COMMANDE :', err)
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ code: 401, message: 'Session expirée — veuillez vous reconnecter' })
        }
        res.status(500).json({ code: 500, message: 'Erreur serveur' })
    }
}

// ===== GET /api/commandes =====
// Récupère toutes les commandes du client connecté
exports.getMesCommandes = async (req, res) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ code: 401, message: 'Non autorisé' })
        }

        const token        = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.CLEJWT)
        const idClient     = decodedToken.id

        // On récupère toutes les commandes avec leurs produits via des jointures
        const sql = `
            SELECT
                Commande.IdCommande,
                Commande.DateCommande,
                Commande.AdresseLivraison,
                Produit.IdProduit,
                Produit.NomProduit,
                Produit.Prix,
                Produit.Image3D,
                Categorie.NomCategorie,
                Contient.Quantite
            FROM Commande
            INNER JOIN Contient  ON Contient.IdCommande  = Commande.IdCommande
            INNER JOIN Produit   ON Produit.IdProduit    = Contient.IdProduit
            INNER JOIN Categorie ON Categorie.IdCategorie = Produit.IdCategorie
            WHERE Commande.IdClient = ?
            ORDER BY Commande.DateCommande DESC
        `
        const [resultat] = await db.query(sql, [idClient])

        // On regroupe les produits par commande
        const commandes = {}
        resultat.forEach(ligne => {
            if (!commandes[ligne.IdCommande]) {
                commandes[ligne.IdCommande] = {
                    idCommande:        ligne.IdCommande,
                    dateCommande:      ligne.DateCommande,
                    adresseLivraison:  ligne.AdresseLivraison,
                    produits:          []
                }
            }
            commandes[ligne.IdCommande].produits.push({
                idProduit:    ligne.IdProduit,
                nomProduit:   ligne.NomProduit,
                prix:         ligne.Prix,
                image:        ligne.Image3D,
                nomCategorie: ligne.NomCategorie,
                quantite:     ligne.Quantite
            })
        })

        res.status(200).json({
            code:      200,
            commandes: Object.values(commandes)
        })

    } catch (err) {
        console.error('ERREUR GET COMMANDES :', err)
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ code: 401, message: 'Session expirée' })
        }
        res.status(500).json({ code: 500, message: 'Erreur serveur' })
    }
}