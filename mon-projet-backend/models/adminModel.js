const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pfe'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = {
  getByEmail: function(email, callback) {
    const query = 'SELECT * FROM adminstrateur WHERE email = ?';
    connection.query(query, [email], callback);
  }
  // Vous pouvez ajouter d'autres méthodes ici selon les besoins, comme créer un nouvel administrateur, supprimer un administrateur, etc.
};
