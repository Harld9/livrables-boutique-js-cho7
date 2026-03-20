CREATE TABLE Client (
   IdClient INT AUTO_INCREMENT,
   Nom VARCHAR(50),
   Prenom VARCHAR(50), 
   Adresse VARCHAR(255), 
   Mail VARCHAR(100),
   NumeroTel VARCHAR(20), 
   PRIMARY KEY(IdClient)
);

CREATE TABLE Categorie (
   IdCategorie INT AUTO_INCREMENT,
   NomCategorie VARCHAR(50),
   PRIMARY KEY(IdCategorie)
);

CREATE TABLE Commande (
   IdCommande INT AUTO_INCREMENT,
   DateCommande DATETIME, 
   IdClient INT NOT NULL,
   PRIMARY KEY(IdCommande),
   FOREIGN KEY(IdClient) REFERENCES Client(IdClient)
);

CREATE TABLE Produit (
   IdProduit INT AUTO_INCREMENT,
   NomProduit VARCHAR(100),
   Reduction DECIMAL(5,2), 
   Type VARCHAR(50), 
   Description TEXT, 
   Prix DECIMAL(10,2), 
   Taille VARCHAR(20), 
   Genre VARCHAR(50),
   IdCategorie INT,
   Stock INT,
   Image VARCHAR(100)
   PRIMARY KEY(IdProduit),
   FOREIGN KEY(IdCategorie) REFERENCES Categorie(IdCategorie)
);

CREATE TABLE Contient (
   IdProduit INT,
   IdCommande INT,
   Quantite INT,
   PRIMARY KEY(IdProduit, IdCommande),
   FOREIGN KEY(IdProduit) REFERENCES Produit(IdProduit),
   FOREIGN KEY(IdCommande) REFERENCES Commande(IdCommande)
);