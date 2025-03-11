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
    const query = 'SELECT * FROM fsi WHERE email = ?';
    connection.query(query, [email], callback);
  },
  createUser: function(userData, callback) {
    const { usernameFSI, password, email, phoneNumber } = userData;
    const insertQuery = 'INSERT INTO fsi (usernameFSI, password, email, phoneNumber) VALUES (?, ?, ?, ?)';
    connection.query(insertQuery, [usernameFSI, password, email, phoneNumber], callback);
  }
};
