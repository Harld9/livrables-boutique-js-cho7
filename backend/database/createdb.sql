CREATE TABLE Client(
   IdClient INT AUTO_INCREMENT,
   Nom VARCHAR(50) NOT NULL,
   Prenom VARCHAR(50) NOT NULL,
   Adresse VARCHAR(255),
   Mail VARCHAR(100) NOT NULL,
   NumeroTel VARCHAR(20),
   PRIMARY KEY(IdClient)
);

CREATE TABLE Categorie(
   IdCategorie INT AUTO_INCREMENT,
   NomCategorie VARCHAR(50) NOT NULL,
   PRIMARY KEY(IdCategorie)
);

CREATE TABLE Commande(
   IdCommande INT AUTO_INCREMENT,
   DateCommande DATETIME NOT NULL,
   IdClient INT NOT NULL,
   PRIMARY KEY(IdCommande),
   FOREIGN KEY(IdClient) REFERENCES Client(IdClient)
);

CREATE TABLE Produit(
   IdProduit INT AUTO_INCREMENT,
   NomProduit VARCHAR(100) NOT NULL,
   Prix DECIMAL(10,2) NOT NULL,
   Taille INT,
   Genre VARCHAR(50),
   IdCategorie INT NOT NULL,
   PRIMARY KEY(IdProduit),
   FOREIGN KEY(IdCategorie) REFERENCES Categorie(IdCategorie)
);

CREATE TABLE Contient(
   IdProduit INT,
   IdCommande INT,
   Quantite INT NOT NULL,
   PRIMARY KEY(IdProduit, IdCommande),
   FOREIGN KEY(IdProduit) REFERENCES Produit(IdProduit),
   FOREIGN KEY(IdCommande) REFERENCES Commande(IdCommande)
);