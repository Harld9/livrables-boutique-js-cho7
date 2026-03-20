CREATE TABLE Client(
   IdClient COUNTER,
   Nom VARCHAR(50),
   Prénom VARCHAR(50),
   Adresse VARCHAR(50),
   Mail VARCHAR(50),
   NumeroTel INT,
   PRIMARY KEY(IdClient)
);

CREATE TABLE Categorie(
   IdCategorie COUNTER,
   NomCategorie VARCHAR(50),
   PRIMARY KEY(IdCategorie)
);

CREATE TABLE Commande(
   IdCommande COUNTER,
   Date_ VARCHAR(50),
   IdClient INT NOT NULL,
   PRIMARY KEY(IdCommande),
   FOREIGN KEY(IdClient) REFERENCES Client(IdClient)
);

CREATE TABLE Produit(
   IdProduit COUNTER,
   NomProduit VARCHAR(50),
   Prix CURRENCY,
   Taille INT,
   Genre VARCHAR(50),
   IdCategorie INT,
   PRIMARY KEY(IdProduit),
   FOREIGN KEY(IdCategorie) REFERENCES Categorie(IdCategorie)
);

CREATE TABLE Contient(
   IdProduit INT,
   IdCommande INT,
   Quantite INT,
   PRIMARY KEY(IdProduit, IdCommande),
   FOREIGN KEY(IdProduit) REFERENCES Produit(IdProduit),
   FOREIGN KEY(IdCommande) REFERENCES Commande(IdCommande)
);