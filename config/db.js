/**
 * Configuration de la connexion à la base de données MySQL
 * Utilise un pool de connexions pour améliorer les performances
 */

// Importation du module mysql2 avec support des promesses
const mysql = require('mysql2/promise');

// Chargement des variables d'environnement depuis le fichier .env
require('dotenv').config();

/**
 * Création d'un pool de connexions MySQL
 * Un pool permet de réutiliser les connexions et d'améliorer les performances
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,           // Adresse du serveur MySQL
  user: process.env.DB_USER,           // Nom d'utilisateur MySQL
  password: process.env.DB_PASSWORD,   // Mot de passe MySQL
  database: process.env.DB_NAME,       // Nom de la base de données
  waitForConnections: true,            // Mettre en file d'attente si toutes les connexions sont utilisées
  connectionLimit: 10,                 // Nombre maximum de connexions dans le pool
  queueLimit: 0                        // Nombre maximum de requêtes en file d'attente (0 = illimité)
});

// Exportation du pool pour utilisation dans les autres modules
module.exports = pool;

