/**
 * Contrôleur Product - Gestion de la logique métier et des requêtes HTTP
 * Fait le lien entre les routes Express, le modèle Product et les vues EJS
 */

// Importation du modèle Product
const Product = require('../models/product');

/**
 * Affiche la liste de tous les produits
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.getAllProducts = async (req, res) => {
  try {
    // Récupération de tous les produits depuis la base de données
    const products = await Product.findAll();
    
    // Rendu de la vue avec les produits récupérés
    res.render('products/index', {
      title: 'Liste des produits',
      products: products
    });
  } catch (error) {
    // Gestion des erreurs : affichage dans la console et page d'erreur
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de la récupération des produits'
    });
  }
};

/**
 * Affiche les détails d'un produit spécifique
 * @param {Object} req - Objet de requête Express (contient req.params.id)
 * @param {Object} res - Objet de réponse Express
 */
exports.getProductById = async (req, res) => {
  try {
    // Récupération du produit par son ID depuis l'URL
    const product = await Product.findById(req.params.id);
    
    // Vérification si le produit existe
    if (!product) {
      return res.status(404).render('error', {
        title: 'Erreur',
        message: 'Produit non trouvé'
      });
    }
    
    // Rendu de la vue de détails avec le produit
    res.render('products/details', {
      title: product.name,
      product: product
    });
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de la récupération du produit'
    });
  }
};

/**
 * Affiche le formulaire de création d'un nouveau produit
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
exports.showCreateForm = async (req, res) => {
  try {
    // Rendu du formulaire de création (sans données pré-remplies)
    res.render('products/create', {
      title: 'Ajouter un produit'
    });
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de l\'affichage du formulaire:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de l\'affichage du formulaire'
    });
  }
};

/**
 * Traite la soumission du formulaire de création
 * @param {Object} req - Objet de requête Express (contient req.body avec les données du formulaire)
 * @param {Object} res - Objet de réponse Express
 */
exports.createProduct = async (req, res) => {
  try {
    // Extraction des données du formulaire depuis req.body
    const { name, price, description } = req.body;
    
    // Création du nouveau produit dans la base de données
    await Product.create({ name, price, description });
    
    // Redirection vers la liste des produits après création réussie
    res.redirect('/products');
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la création du produit:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de la création du produit'
    });
  }
};

/**
 * Affiche le formulaire de modification d'un produit existant
 * @param {Object} req - Objet de requête Express (contient req.params.id)
 * @param {Object} res - Objet de réponse Express
 */
exports.showEditForm = async (req, res) => {
  try {
    // Récupération du produit à modifier par son ID
    const product = await Product.findById(req.params.id);
    
    // Vérification si le produit existe
    if (!product) {
      return res.status(404).render('error', {
        title: 'Erreur',
        message: 'Produit non trouvé'
      });
    }
    
    // Rendu du formulaire de modification avec les données du produit pré-remplies
    res.render('products/edit', {
      title: 'Modifier le produit',
      product: product
    });
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de la récupération du produit'
    });
  }
};

/**
 * Traite la soumission du formulaire de modification
 * @param {Object} req - Objet de requête Express (contient req.params.id et req.body)
 * @param {Object} res - Objet de réponse Express
 */
exports.updateProduct = async (req, res) => {
  try {
    // Extraction des données du formulaire
    const { name, price, description } = req.body;
    
    // Mise à jour du produit dans la base de données
    const updated = await Product.update(req.params.id, { name, price, description });
    
    // Vérification si la mise à jour a réussi (updated > 0 signifie qu'une ligne a été modifiée)
    if (updated) {
      // Redirection vers la liste des produits après mise à jour réussie
      res.redirect('/products');
    } else {
      // Si aucune ligne n'a été modifiée, le produit n'existe probablement pas
      res.status(404).render('error', {
        title: 'Erreur',
        message: 'Produit non trouvé'
      });
    }
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de la mise à jour du produit'
    });
  }
};

/**
 * Supprime un produit de la base de données
 * @param {Object} req - Objet de requête Express (contient req.params.id)
 * @param {Object} res - Objet de réponse Express
 */
exports.deleteProduct = async (req, res) => {
  try {
    // Suppression du produit par son ID
    const deleted = await Product.delete(req.params.id);
    
    // Vérification si la suppression a réussi (deleted > 0 signifie qu'une ligne a été supprimée)
    if (deleted) {
      // Redirection vers la liste des produits après suppression réussie
      res.redirect('/products');
    } else {
      // Si aucune ligne n'a été supprimée, le produit n'existe probablement pas
      res.status(404).render('error', {
        title: 'Erreur',
        message: 'Produit non trouvé'
      });
    }
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).render('error', {
      title: 'Erreur',
      message: 'Erreur lors de la suppression du produit'
    });
  }
};

