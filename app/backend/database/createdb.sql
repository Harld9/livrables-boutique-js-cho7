CREATE DATABASE IF NOT EXISTS cho7;
USE cho7;

-- ===== TABLE CLIENT =====
CREATE TABLE Client (
IdClient   INT AUTO_INCREMENT,
		Nom        VARCHAR(50),
		Prenom     VARCHAR(50),
		Adresse    VARCHAR(255),
		Mail       VARCHAR(100) UNIQUE,
		NumeroTel  VARCHAR(20),
		MotDePasse VARCHAR(255) NOT NULL,
		PRIMARY KEY(IdClient)
);

-- ===== TABLE CATEGORIE =====
CREATE TABLE Categorie (
    IdCategorie  INT AUTO_INCREMENT,
    NomCategorie VARCHAR(50),
    PRIMARY KEY(IdCategorie)
);

-- ===== TABLE PRODUIT =====
CREATE TABLE Produit (
    IdProduit      INT AUTO_INCREMENT,
    NomProduit     VARCHAR(100),
    Longueur       ENUM('Courte', 'Moyenne', 'Haute', 'Longue'),
    Prix           DECIMAL(5,2),
    IdCategorie    INT,
    Reduction      DECIMAL(5,2) DEFAULT 0.00,
    Description    TEXT,
    Pointure       VARCHAR(20),
    Genre          ENUM('Homme', 'Femme', 'Unisexe') DEFAULT 'Unisexe',
    Stock          INT DEFAULT 0,
    Image3D        VARCHAR(255),
    ImagePortee    VARCHAR(255),
    Couleur        VARCHAR(50),
    IdModeleParent INT,    
    PRIMARY KEY(IdProduit),
    FOREIGN KEY(IdCategorie) REFERENCES Categorie(IdCategorie),
    FOREIGN KEY(IdModeleParent) REFERENCES Produit(IdProduit) 
);

-- ===== TABLE COMMANDE =====
CREATE TABLE Commande (
    IdCommande    INT AUTO_INCREMENT,
    DateCommande  DATETIME,
    IdClient      INT NOT NULL,
    PRIMARY KEY(IdCommande),
    FOREIGN KEY(IdClient) REFERENCES Client(IdClient)
);

-- ===== TABLE CONTIENT =====
CREATE TABLE Contient (
    IdProduit  INT,
    IdCommande INT,
    Quantite   INT,
    PRIMARY KEY(IdProduit, IdCommande),
    FOREIGN KEY(IdProduit)  REFERENCES Produit(IdProduit),
    FOREIGN KEY(IdCommande) REFERENCES Commande(IdCommande)
);

-- ===== TABLE FAVORIS =====
CREATE TABLE Favoris (
    IdClient  INT,
    IdProduit INT,
    PRIMARY KEY(IdClient, IdProduit),
    FOREIGN KEY(IdClient) REFERENCES Client(IdClient) ON DELETE CASCADE,
    FOREIGN KEY(IdProduit) REFERENCES Produit(IdProduit) ON DELETE CASCADE
);