-- Script SQL pour créer la base de données et la table products
-- Exécutez ce script dans votre client MySQL (phpMyAdmin, MySQL Workbench, etc.)

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS crud_app;
USE crud_app;

-- Création de la table products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,                    -- Identifiant unique auto-incrémenté (clé primaire)
    name VARCHAR(255) NOT NULL,                          -- Nom du produit (chaîne de caractères, obligatoire)
    price DECIMAL(10, 2) NOT NULL,                       -- Prix du produit (nombre décimal avec 2 chiffres après la virgule, obligatoire)
    description TEXT,                                     -- Description du produit (texte long, optionnel)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP       -- Date et heure de création (valeur par défaut: date et heure actuelles)
);

-- Insertion de données de test
INSERT INTO products (name, price, description) VALUES
('Ordinateur portable', 899.99, 'Ordinateur portable haute performance'),
('Smartphone', 499.99, 'Smartphone dernière génération'),
('Casque audio', 129.99, 'Casque audio sans fil avec réduction de bruit');

