//config.js

const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost', // Adresse IPv4 de votre machine hôte
    user: 'root',     // Utilisateur MySQL
    password: '', // Mot de passe
    database: 'pfe1'        // Nom de la base de données
  
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = connection;

  
