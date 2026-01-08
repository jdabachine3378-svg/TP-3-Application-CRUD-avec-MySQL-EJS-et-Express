/**
 * Script pour créer le fichier .env s'il n'existe pas
 */
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envExample = `# Configuration de la base de données MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=crud_app

# Port du serveur Express
PORT=3000
`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envExample);
  console.log('Fichier .env créé avec succès !');
  console.log('N\'oubliez pas de modifier DB_PASSWORD avec votre mot de passe MySQL si nécessaire.');
} else {
  console.log('Le fichier .env existe déjà.');
}

