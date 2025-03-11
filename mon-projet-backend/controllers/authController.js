const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config');
 


//verifier
exports.registerinsc = async (req, res) => {
  const { username, password, email, phoneNumber } = req.body;
 console.log(username);
  try {
      // Vérifier si l'utilisateur existe déjà
      const query = 'SELECT * FROM inscri WHERE email = ?';
      connection.query(query, [email], async (error, results) => {
          if (error) {
              console.error('Erreur lors de la vérification de l\'utilisateur existant :', error);
              return res.status(500).json({ message: 'Erreur serveur' });
          }
          if (results.length > 0) {
              console.log('Email déjà utilisé');
              return res.status(400).json({ message: 'Email déjà utilisé' });
          }

          // Hasher le mot de passe
          const hashedPassword = await bcrypt.hash(password, 10);

          // Insérer le nouvel utilisateur dans la base de données
          const insertQuery = 'INSERT INTO inscri (username, password, email, phoneNumber) VALUES (?, ?, ?, ?)';
          connection.query(insertQuery, [username, hashedPassword, email, phoneNumber], (err, result) => {
              if (err) {
                  console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
                  return res.status(500).json({ message: 'Erreur serveur' });
              }
              
              
          });
      });
  } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      res.status(500).json({ message: 'Erreur serveur' });
  }
};

//verifier
exports.listinsc = async (req, res) => {
  try {
    const listQuery = 'SELECT * FROM inscri ';
    connection.query(listQuery, (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération de la liste des comptes inscr :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste des comptes inscr  :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
//verifier
exports.deleteinsc = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteQuery = 'DELETE FROM inscri WHERE id = ?';
    connection.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur inscri :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      console.log('Utilisateur FSI supprimé avec succès !');
      res.status(200).json({ message: 'Utilisateur inscri supprimé avec succès' });
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur inscri :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


//verifier
exports.updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { username, password, email, phoneNumber } = req.body;

  try {
    // Vérifier d'abord si l'administrateur avec cet ID existe
    const checkQuery = 'SELECT * FROM adminstrateur WHERE id = ?';
    connection.query(checkQuery, [id], async (error, results) => {
      if (error) {
        console.error('Erreur lors de la vérification de l\'administrateur :', error);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Administrateur non trouvé' });
      }

      // Si l'administrateur existe, procéder à la mise à jour
      const adminstrateur = results[0];

      // Hacher le nouveau mot de passe si fourni
      let hashedPassword = adminstrateur.password; // Conserver le mot de passe existant par défaut
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Effectuer la mise à jour dans la base de données
      const updateQuery = 'UPDATE adminstrateur SET username = ?, password = ?, email = ?, phoneNumber = ? WHERE id = ?';
      connection.query(updateQuery, [username, hashedPassword, email, phoneNumber,id], (err, result) => {
        if (err) {
          console.error('Erreur lors de la mise à jour de l\'administrateur :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        res.status(200).json({ message: 'Administrateur mis à jour avec succès' });
        console.log('Administrateur mis à jour avec succès');
      });
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

//verifier
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Rechercher l'utilisateur dans la base de données
    const query = 'SELECT * FROM adminstrateur WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Erreur lors de la recherche de l'utilisateur :", error);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email incorrect' });
      }
      const adminstrateur = results[0];
      // Vérifier le mot de passe
      const passwordMatch = await bcrypt.compare(password, adminstrateur.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
      }
      // Générer un token JWT
      const token = jwt.sign({ Id: adminstrateur.id, username: adminstrateur.username }, 'votre_clé_secrète', { expiresIn: '1h' });
      res.status(200).json({ token, Id: adminstrateur.id, username: adminstrateur.username, type: adminstrateur.type });
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.registerFSI = async (req, res) => {
  const { username, password, email, phoneNumber } = req.body;
  const type = 'FSI';

  try {
    // Vérifier si l'email existe déjà
    const query = 'SELECT * FROM adminstrateur WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Erreur lors de la vérification de l'email :", error);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer le nouvel adminstrateur dans la base de données
      const insertQuery = 'INSERT INTO adminstrateur (username, password, email, phoneNumber, type) VALUES (?, ?, ?, ?, ?)';
      connection.query(insertQuery, [username, hashedPassword, email, phoneNumber, type], (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion de l'administrateur :", err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        res.status(201).json({ message: 'Administrateur créé avec succès' });
        console.log('Administrateur créé avec succès');
      });
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.accepter = async (req, res) => {
  const id = req.params.id;
  const type = 'sous-admin';
  try {
    const checkQuery = 'SELECT * FROM inscri WHERE id = ?';
    connection.query(checkQuery, [id], async (error, results) => {
      if (error) {
        console.error('Erreur lors de la vérification de l\'inscription :', error);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Inscription non trouvée' });
      }

      // Récupérer les informations de l'inscription
      const { username, password, email, phoneNumber } = results[0];

      // Insérer les données dans la table adminstrateur
      const insertQuery = 'INSERT INTO adminstrateur (username, password, email, phoneNumber, type) VALUES (?, ?, ?, ?, ?)';
      connection.query(insertQuery, [username, password, email, phoneNumber, type], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'administrateur :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        // Suppression de l'inscription après insertion
        const deleteQuery = 'DELETE FROM inscri WHERE id = ?';
        connection.query(deleteQuery, [id], (deleteError) => {
          if (deleteError) {
            console.error('Erreur lors de la suppression de l\'inscription :', deleteError);
            return res.status(500).json({ message: 'Erreur serveur' });
          }

          res.status(201).json({ message: 'Administrateur créé avec succès' });
          console.log('Administrateur créé avec succès');
        });
      });
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};





exports.registerAdmin = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const query = 'SELECT * FROM adminstrateur WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error('Erreur lors de la vérification de l\'email :', error);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer le nouvel administrateur dans la base de données
      const insertQuery = 'INSERT INTO adminstrateur (username, password, email) VALUES (?, ?, ?)';
      connection.query(insertQuery, [username, hashedPassword, email], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'administrateur :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        res.status(201).json({ message: 'Administrateur créé avec succès' });
        console.log('Administrateur créé avec succès');

      });
    });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};






  //verifier
  exports.deleteFSI = async (req, res) => {
    const id = req.params.id;
    try {
      const deleteQuery = 'DELETE FROM adminstrateur WHERE id = ?';
      connection.query(deleteQuery, [id], (err, result) => {
        if (err) {
          console.error('Erreur lors de la suppression de l\'utilisateur FSI :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        console.log('Utilisateur FSI supprimé avec succès !');
        res.status(200).json({ message: 'Utilisateur FSI supprimé avec succès' });
      });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur FSI :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };



//verifier
exports.updateFSI = async (req, res) => {
  const { username, email, phoneNumber } = req.body;
  const { id } = req.params;
  if (!id) {
      return res.status(400).json({ message: "L'ID est requis pour la mise à jour" });
  }

  const updateQuery = 'UPDATE adminstrateur SET username = ?, email = ?, phoneNumber = ? WHERE id = ?';

  connection.query(updateQuery, [username, email, phoneNumber, id], (err, result) => {
      if (err) {
          console.error("Erreur lors de la mise à jour de l'utilisateur FSI :", err);
          return res.status(500).json({ message: "Erreur serveur" });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet ID" });
      }

      console.log("Utilisateur FSI mis à jour avec succès !");
      res.status(200).json({ message: "Utilisateur FSI mis à jour avec succès" });
  });
};

//verifier
  exports.listFSI = async (req, res) => {
    try {
      const listQuery = "SELECT * FROM adminstrateur WHERE type = 'FSI' ";
      connection.query(listQuery, (err, results) => {
        if (err) {
          console.error('Erreur lors de la récupération de la liste des comptes FSI :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(200).json(results);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de la liste des comptes FSI :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };







