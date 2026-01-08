/**
 * Application Express principale
 * Configure le serveur, les middlewares, les routes et la gestion des erreurs
 */

// Importation des modules nécessaires
const express = require('express');                    // Framework web Express
const path = require('path');                          // Module pour manipuler les chemins de fichiers
const bodyParser = require('body-parser');             // Middleware pour analyser le corps des requêtes HTTP
const ejsLayouts = require('express-ejs-layouts');     // Support des layouts pour EJS
require('dotenv').config();                            // Chargement des variables d'environnement depuis .env

// Création de l'application Express
const app = express();

// Configuration du port (depuis .env ou 3000 par défaut)
const PORT = process.env.PORT || 3000;

// ==================== Configuration du moteur de templates EJS ====================

// Définit EJS comme moteur de templates
app.set('view engine', 'ejs');

// Définit le dossier contenant les vues EJS
app.set('views', path.join(__dirname, 'views'));

// Active le middleware de layouts pour EJS
app.use(ejsLayouts);

// Définit le layout par défaut (layout.ejs)
app.set('layout', 'layout');

// ==================== Configuration des middlewares ====================

// Middleware pour analyser les données de formulaire (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware pour servir les fichiers statiques depuis le dossier 'public'
// Les fichiers dans public/ seront accessibles directement (ex: /css/style.css)
app.use(express.static(path.join(__dirname, 'public')));

// ==================== Importation du contrôleur ====================

// Importation du contrôleur Product qui gère la logique métier
const productController = require('./controllers/productController');

// ==================== Définition des routes ====================

// Route racine : redirige vers la liste des produits
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Route GET : Affiche la liste de tous les produits
app.get('/products', productController.getAllProducts);

// Route GET : Affiche le formulaire de création d'un produit
app.get('/products/create', productController.showCreateForm);

// Route POST : Traite la soumission du formulaire de création
app.post('/products/create', productController.createProduct);

// Route GET : Affiche les détails d'un produit spécifique (par ID)
app.get('/products/:id', productController.getProductById);

// Route GET : Affiche le formulaire de modification d'un produit
app.get('/products/edit/:id', productController.showEditForm);

// Route POST : Traite la soumission du formulaire de modification
app.post('/products/:id/update', productController.updateProduct);

// Route POST : Supprime un produit
app.post('/products/:id/delete', productController.deleteProduct);

// ==================== Gestion des erreurs ====================

// Middleware pour gérer les routes non trouvées (404)
// Doit être placé après toutes les routes définies
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page non trouvée',
    message: 'La page que vous recherchez n\'existe pas.'
  });
});

// Middleware pour gérer les erreurs serveur (500)
// Doit avoir 4 paramètres (err, req, res, next) pour être reconnu comme gestionnaire d'erreur
app.use((err, req, res, next) => {
  // Affichage de l'erreur dans la console pour le débogage
  console.error(err.stack);
  
  // Rendu de la page d'erreur avec le statut 500
  res.status(500).render('error', {
    title: 'Erreur serveur',
    message: 'Une erreur est survenue sur le serveur.'
  });
});

// ==================== Démarrage du serveur ====================

// Démarre le serveur et écoute sur le port configuré
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

