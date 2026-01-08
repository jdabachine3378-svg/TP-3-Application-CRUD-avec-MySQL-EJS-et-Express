/**
 * Modèle Product - Gestion des opérations CRUD sur les produits
 * Utilise des méthodes statiques pour accéder directement à la classe
 */

// Importation de la connexion à la base de données
const db = require('../config/db');

/**
 * Classe Product contenant toutes les méthodes pour interagir avec la table products
 */
class Product {
  /**
   * Récupère tous les produits de la base de données
   * @returns {Promise<Array>} Tableau contenant tous les produits, triés par date de création (plus récent en premier)
   */
  static async findAll() {
    // Exécution de la requête SQL pour récupérer tous les produits
    // ORDER BY created_at DESC : trie les produits du plus récent au plus ancien
    const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
  }

  /**
   * Récupère un produit spécifique par son identifiant
   * @param {number} id - L'identifiant du produit à récupérer
   * @returns {Promise<Object|null>} L'objet produit ou null si non trouvé
   */
  static async findById(id) {
    // Utilisation de requêtes paramétrées (?) pour éviter les injections SQL
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    // Retourne le premier élément du tableau (ou undefined si aucun résultat)
    return rows[0];
  }

  /**
   * Crée un nouveau produit dans la base de données
   * @param {Object} productData - Objet contenant les données du produit (name, price, description)
   * @returns {Promise<number>} L'identifiant du produit créé (insertId)
   */
  static async create(productData) {
    // Destructuration pour extraire les propriétés nécessaires
    const { name, price, description } = productData;
    
    // Insertion du nouveau produit avec requête paramétrée
    const [result] = await db.query(
      'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
      [name, price, description]
    );
    
    // Retourne l'ID du produit nouvellement créé
    return result.insertId;
  }

  /**
   * Met à jour un produit existant dans la base de données
   * @param {number} id - L'identifiant du produit à mettre à jour
   * @param {Object} productData - Objet contenant les nouvelles données du produit
   * @returns {Promise<number>} Le nombre de lignes affectées (1 si succès, 0 si produit non trouvé)
   */
  static async update(id, productData) {
    // Destructuration pour extraire les propriétés nécessaires
    const { name, price, description } = productData;
    
    // Mise à jour du produit avec requête paramétrée
    const [result] = await db.query(
      'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
      [name, price, description, id]
    );
    
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
  }

  /**
   * Supprime un produit de la base de données
   * @param {number} id - L'identifiant du produit à supprimer
   * @returns {Promise<number>} Le nombre de lignes affectées (1 si succès, 0 si produit non trouvé)
   */
  static async delete(id) {
    // Suppression du produit avec requête paramétrée
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    
    // Retourne le nombre de lignes affectées
    return result.affectedRows;
  }
}

// Exportation de la classe Product pour utilisation dans les autres modules
module.exports = Product;

