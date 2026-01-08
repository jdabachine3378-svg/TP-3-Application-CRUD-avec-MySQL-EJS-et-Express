# TP-3-Application-CRUD-avec-MySQL-EJS-et-Express

# Application CRUD avec Express.js, MySQL et EJS

Ce projet est une application web complète qui implémente toutes les opérations CRUD (Create, Read, Update, Delete) pour la gestion de produits. Elle utilise Express.js comme framework web, MySQL comme base de données et EJS comme moteur de templates.

##  Table des matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Structure du projet](#structure-du-projet)
- [Utilisation](#utilisation)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Améliorations possibles](#améliorations-possibles)

##  Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 14 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **MySQL** (version 5.7 ou supérieure) - [Télécharger MySQL](https://www.mysql.com/downloads/)
- **npm** (généralement inclus avec Node.js)

##  Installation

### 1. Cloner ou télécharger le projet

```bash
# Si vous avez cloné depuis un dépôt Git
git clone <url-du-repo>

# Sinon, décompressez l'archive du projet
cd "TP 3  Application CRUD avec MySQL, EJS et Express.js"
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande installera tous les packages nécessaires :
- `express` : Framework web pour Node.js
- `mysql2` : Driver MySQL optimisé avec support des promesses
- `ejs` : Moteur de templates pour générer du HTML dynamique
- `body-parser` : Middleware pour analyser le corps des requêtes HTTP
- `dotenv` : Pour charger les variables d'environnement depuis un fichier `.env`
- `express-ejs-layouts` : Support des layouts pour EJS

## ⚙️ Configuration

### 1. Configuration de la base de données MySQL

#### Créer la base de données et la table

Exécutez le script SQL fourni dans `database.sql` :

```sql
-- Création de la base de données
CREATE DATABASE IF NOT EXISTS crud_app;
USE crud_app;

-- Création de la table products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de données de test
INSERT INTO products (name, price, description) VALUES
('Ordinateur portable', 899.99, 'Ordinateur portable haute performance'),
('Smartphone', 499.99, 'Smartphone dernière génération'),
('Casque audio', 129.99, 'Casque audio sans fil avec réduction de bruit');
```

Vous pouvez exécuter ce script via :
- **phpMyAdmin** : Importez le fichier `database.sql`
- **MySQL Workbench** : Ouvrez et exécutez le fichier
- **Ligne de commande MySQL** : `mysql -u root -p < database.sql`

### 2. Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet (copiez `.env.example` et renommez-le en `.env`) :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=crud_app
PORT=3000
```

**Important** : Remplacez `votre_mot_de_passe` par votre mot de passe MySQL réel. Si vous n'avez pas de mot de passe, laissez le champ vide.

##  Structure du projet

```
crud-express-mysql/
│
├── config/
│   └── db.js                 # Configuration de la connexion MySQL
│
├── controllers/
│   └── productController.js  # Logique de traitement des requêtes
│
├── models/
│   └── product.js            # Logique d'accès aux données (CRUD)
│
├── views/
│   ├── layout.ejs            # Layout principal
│   ├── error.ejs             # Page d'erreur
│   ├── partials/
│   │   ├── header.ejs        # En-tête réutilisable
│   │   └── footer.ejs        # Pied de page réutilisable
│   └── products/
│       ├── index.ejs         # Liste des produits
│       ├── details.ejs       # Détails d'un produit
│       ├── create.ejs        # Formulaire de création
│       └── edit.ejs          # Formulaire de modification
│
├── public/
│   └── css/
│       └── style.css         # Feuilles de style CSS
│
├── .env                      # Variables d'environnement (à créer)
├── .env.example              # Exemple de fichier .env
├── .gitignore               # Fichiers à ignorer par Git
├── app.js                   # Fichier principal de l'application
├── package.json             # Métadonnées et dépendances du projet
├── database.sql             # Script SQL pour créer la base de données
└── README.md                # Ce fichier
```

## 🚀 Utilisation

### 1. Démarrer l'application

```bash
node app.js
```

Ou avec npm :

```bash
npm start
```

### 2. Accéder à l'application

Ouvrez votre navigateur et accédez à :

```
http://localhost:3000
```


##  Fonctionnalités

### Create (Créer)
- ✅ Formulaire de création avec validation des champs
- ✅ Insertion des données dans la base MySQL
- ✅ Redirection vers la liste après création

### Read (Lire)
- ✅ Liste de tous les produits avec formatage des données
- ✅ Affichage détaillé d'un produit spécifique
- ✅ Formatage des prix et dates

### Update (Mettre à jour)
- ✅ Formulaire pré-rempli avec les données existantes
- ✅ Validation des champs
- ✅ Mise à jour dans la base de données

### Delete (Supprimer)
- ✅ Confirmation avant suppression
- ✅ Suppression de la base de données
- ✅ Redirection vers la liste après suppression

## 🏗️ Architecture

Cette application suit l'architecture **MVC** (Model-View-Controller) :

- **Model** (`models/product.js`) : Gère l'accès aux données et les opérations CRUD sur la base de données
- **View** (`views/`) : Templates EJS qui génèrent le HTML affiché à l'utilisateur
- **Controller** (`controllers/productController.js`) : Fait le lien entre les routes Express, le modèle et les vues

### Flux de données

1. L'utilisateur fait une requête HTTP (GET ou POST)
2. Express route la requête vers le contrôleur approprié
3. Le contrôleur appelle les méthodes du modèle pour interagir avec la base de données
4. Le modèle exécute les requêtes SQL et retourne les résultats
5. Le contrôleur rend la vue EJS appropriée avec les données
6. La vue génère le HTML final qui est envoyé au navigateur

##  Sécurité

- ✅ **Requêtes paramétrées** : Protection contre les injections SQL
- ✅ **Variables d'environnement** : Informations sensibles stockées dans `.env`
- ✅ **Validation HTML5** : Validation côté client des formulaires

##  Technologies utilisées

- **Backend** : Node.js, Express.js
- **Base de données** : MySQL
- **Templates** : EJS (Embedded JavaScript)
- **CSS Framework** : Bootstrap 5
- **Architecture** : MVC (Model-View-Controller)

##  Améliorations possibles

### 1. Validation des données
Installez `express-validator` pour valider les données côté serveur :
```bash
npm install express-validator
```

### 2. Pagination
Pour gérer de grandes quantités de données, implémentez la pagination dans le modèle et le contrôleur.

### 3. Recherche et tri
Ajoutez des fonctionnalités de recherche et de tri des produits.

### 4. Authentification
Implémentez l'authentification avec Passport.js :
```bash
npm install passport passport-local express-session bcrypt
```

### 5. Upload d'images
Ajoutez la possibilité de télécharger des images pour les produits :
```bash
npm install multer
```

### 6. API REST
Créez une API REST parallèlement à l'interface utilisateur pour permettre l'accès aux données via des requêtes JSON.

## 🐛 Dépannage

### Erreur de connexion à la base de données

1. Vérifiez que MySQL est démarré
2. Vérifiez les informations dans le fichier `.env`
3. Vérifiez que la base de données `crud_app` existe
4. Vérifiez que la table `products` existe

### Port déjà utilisé

Si le port 3000 est déjà utilisé, modifiez le port dans le fichier `.env` :
```env
PORT=3001
```

### Module non trouvé

Si vous obtenez une erreur "Cannot find module", réinstallez les dépendances :
```bash
npm install
```

##  Ressources

- [Documentation Express.js](https://expressjs.com/)
- [Documentation MySQL2](https://github.com/sidorares/node-mysql2)
- [Documentation EJS](https://ejs.co/)
- [Documentation Bootstrap](https://getbootstrap.com/)


##  Auteur
DABACHINE JAMILA
Projet réalisé dans le cadre d'un TP sur Express.js, MySQL et EJS.

---


