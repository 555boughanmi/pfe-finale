const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const xlsx = require('xlsx');
const multer = require('multer');
const path = require('path');
const connection = require('./config');
const route = require('./routes/autroute');
const { log } = require('console');

app.use(bodyParser.json());

// Configuration CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Autorise l'origine du frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Autorise les méthodes HTTP
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Autorise les en-têtes HTTP
  next();
});

app.use('/', route);



/*

app.post('/upload2', upload2.single('excelFile'), (req, res) => {
  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const username = req.body.username;
    const mois = data[1][13];
    console.log('mois :', mois);
    //kpi
    //VDSL
    //PRO
const kpi3_11_pro_VDSL = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'VDSL' && row[3] === 'PRO' ).length;

    const kpi_Pro_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'VDSL' && row[3] === 'PRO');
    const KPI2_6_Pro_VDSL= kpi_Pro_VDSL.length;
    console.log('kpi2.6 pro :', KPI2_6_Pro_VDSL);

    const { i_VDSL, j_VDSL, p_VDSL, m_VDSL } = kpi_Pro_VDSL.reduce((acc, row) => {
      const duration = row[2] - row[1];

      if (duration < 1) acc.i++;
      else if (duration >= 1 && duration < 2) acc.j_VDSL++;
      else if (duration >= 2 && duration < 3) acc.p_VDSL++;
      else acc.m_VDSL++;
      return acc;
    }, { i_VDSL: 0, j_VDSL: 0, p_VDSL: 0, m_VDSL: 0 });

    const KPI2_2_Pro_VDSL = i_VDSL / KPI2_6_Pro_VDSL;
    const KPI2_3_Pro_VDSL = j_VDSL / KPI2_6_Pro_VDSL;
    const KPI2_4_Pro_VDSL = p_VDSL / KPI2_6_Pro_VDSL;
    const KPI2_5_Pro_VDSL = m_VDSL / KPI2_6_Pro_VDSL;

 // Résidentiel  
const kpi3_11_Res_VDSL = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'VDSL' && row[3] === 'Résidentiel' ).length;

    const kpi_Res_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'VDSL' && row[3] === 'Résidentiel');
    const KPI2_6_Res_VDSL = kpi_Res_VDSL.length;
    console.log('kpi2.6 Résidentiel :', KPI2_6_Res_VDSL);

    const { ir_VDSL, jr_VDSL, pr_VDSL, mr_VDSL } = kpi_Res_VDSL.reduce((acc, row) => {
      const duration = row[2] - row[1];

      if (duration < 1) acc.ir_VDSL++;
      else if (duration >= 1 && duration < 2) acc.jr_VDSL++;
      else if (duration >= 2 && duration < 3) acc.pr_VDSL++;
      else acc.mr_VDSL++;
      return acc;
    }, { ir_VDSL: 0, jr_VDSL: 0, pr_VDSL: 0, mr_VDSL: 0 });

    const KPI2_2_Res_VDSL = ir_VDSL / KPI2_6_Res_VDSL;
    const KPI2_3_Res_VDSL = jr_VDSL / KPI2_6_Res_VDSL;
    const KPI2_4_Res_VDSL = pr_VDSL / KPI2_6_Res_VDSL;
    const KPI2_5_Res_VDSL = mr_VDSL / KPI2_6_Res_VDSL;

    const insertQuery_VDSL = `INSERT INTO crm (
      idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
      KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
      KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values_VDSL = [username, mois, 'VDSL', kpi3_11_pro_VDSL, kpi3_11_Res_VDSL, 0, 0, KPI2_2_Pro_VDSL, KPI2_2_Res_VDSL, KPI2_3_Pro_VDSL, KPI2_3_Res_VDSL, KPI2_4_Pro_VDSL, KPI2_4_Res_VDSL, KPI2_5_Pro_VDSL, KPI2_5_Res_VDSL, KPI2_6_Pro_VDSL, KPI2_6_Res_VDSL];

    connection.query(insertQuery_VDSL, values_VDSL, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.status(200).json({ message: 'Données insérées avec succès' });
    });






       //_ADSL
       //PRO
       const kpi3_11_pro_ADSL = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'ADSL' && row[3] === 'PRO' ).length;
       const kpi_Pro_ADSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'ADSL' && row[3] === 'PRO');
       const KPI2_6_Pro_ADSL= kpi_Pro_ADSL.length;
       console.log('kpi2.6 :', KPI2_6_Pro_ADSL);
   
       const { i_ADSL, j_ADSL, p_ADSL, m_ADSL } = kpi_Pro_ADSL.reduce((acc, row) => {
         const duration = row[2] - row[1];
   
         if (duration < 1) acc.i++;
         else if (duration >= 1 && duration < 2) acc.j++;
         else if (duration >= 2 && duration < 3) acc.p++;
         else acc.m++;
         return acc;
       }, { i_ADSL: 0, j_ADSL: 0, p_ADSL: 0, m_ADSL: 0 });
   
       const KPI2_2_Pro_ADSL = i_ADSL / KPI2_6_Pro_ADSL;
       const KPI2_3_Pro_ADSL = j_ADSL / KPI2_6_Pro_ADSL;
       const KPI2_4_Pro_ADSL = p_ADSL / KPI2_6_Pro_ADSL;
       const KPI2_5_Pro_ADSL = m_ADSL / KPI2_6_Pro_ADSL;
       //res
       const kpi3_11_Res_ADSL = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'ADSL' && row[3] === 'Résidentiel' ).length;
       const kpi_Res_ADSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'ADSL' && row[3] === 'Résidentiel');
       const KPI2_6_Res_ADSL = kpi_Res_ADSL.length;
       console.log('kpi2.6 Résidentiel :', KPI2_6_Res_ADSL);
   
       const { ir_ADSL, jr_ADSL, pr_ADSL, mr_ADSL } = kpi_Res_ADSL.reduce((acc, row) => {
         const duration = row[2] - row[1];
   
         if (duration < 1) acc.ir_ADSL++;
         else if (duration >= 1 && duration < 2) acc.jr_ADSL++;
         else if (duration >= 2 && duration < 3) acc.pr_ADSL++;
         else acc.mr_ADSL++;
         return acc_ADSL;
       }, { ir_ADSL: 0, jr_ADSL: 0, pr_ADSL: 0, mr_ADSL: 0 });
   
       const KPI2_2_Res_ADSL = ir_ADSL / KPI2_6_Res_ADSL;
       const KPI2_3_Res_ADSL = jr_ADSL / KPI2_6_Res_ADSL;
       const KPI2_4_Res_ADSL = pr_ADSL / KPI2_6_Res_ADSL;
       const KPI2_5_Res_ADSL = mr_ADSL / KPI2_6_Res_ADSL;
   
       const insertQuery_ADSL = `INSERT INTO crm (
         idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
         KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
         KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
   
       const values_ADSL = [username, mois, 'ADSL', kpi3_11_pro_ADSL, kpi3_11_Res_ADSL, 0, 0, KPI2_2_Pro_ADSL, KPI2_2_Res_ADSL, KPI2_3_Pro_ADSL, KPI2_3_Res_ADSL, KPI2_4_Pro_ADSL, KPI2_4_Res_ADSL, KPI2_5_Pro_ADSL, KPI2_5_Res_ADSL, KPI2_6_Pro_ADSL, KPI2_6_Res_ADSL];

       connection.query(insertQuery_ADSL, values_ADSL, (err, result) => {
         if (err) {
           console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
           return res.status(500).json({ message: 'Erreur serveur' });
         }
         res.status(200).json({ message: 'Données insérées avec succès' });
       });

   //kpi
    //SDSL
    //PRO
    const kpi3_11_pro_SDSL = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'SDSL' && row[3] === 'PRO' ).length;

    const kpi_Pro_SDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'SDSL' && row[3] === 'PRO');
    const KPI2_6_Pro_SDSL= kpi_Pro_SDSL.length;
    console.log('kpi2.6 pro :', KPI2_6_Pro_SDSL);

    const { i_SDSL, j_SDSL, p_SDSL, m_SDSL } = kpi_Pro_SDSL.reduce((acc, row) => {
      const duration = row[2] - row[1];

      if (duration < 1) acc.i++;
      else if (duration >= 1 && duration < 2) acc.j_SDSL++;
      else if (duration >= 2 && duration < 3) acc.p_SDSL++;
      else acc.m_SDSL++;
      return acc;
    }, { i_SDSL: 0, j_SDSL: 0, p_SDSL: 0, m_SDSL: 0 });

    const KPI2_2_Pro_SDSL = i_SDSL / KPI2_6_Pro_SDSL;
    const KPI2_3_Pro_SDSL = j_SDSL / KPI2_6_Pro_SDSL;
    const KPI2_4_Pro_SDSL = p_SDSL / KPI2_6_Pro_SDSL;
    const KPI2_5_Pro_SDSL = m_SDSL / KPI2_6_Pro_SDSL;

 // Résidentiel  
const kpi3_11_Res_SDSL = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'SDSL' && row[3] === 'Résidentiel' ).length;

    const kpi_Res_SDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'SDSL' && row[3] === 'Résidentiel');
    const KPI2_6_Res_SDSL = kpi_Res_SDSL.length;
    console.log('kpi2.6 Résidentiel :', KPI2_6_Res_SDSL);

    const { ir_SDSL, jr_SDSL, pr_SDSL, mr_SDSL } = kpi_Res_SDSL.reduce((acc, row) => {
      const duration = row[2] - row[1];

      if (duration < 1) acc.ir_SDSL++;
      else if (duration >= 1 && duration < 2) acc.jr_SDSL++;
      else if (duration >= 2 && duration < 3) acc.pr_SDSL++;
      else acc.mr_SDSL++;
      return acc;
    }, { ir_SDSL: 0, jr_SDSL: 0, pr_SDSL: 0, mr_SDSL: 0 });

    const KPI2_2_Res_SDSL = ir_SDSL / KPI2_6_Res_SDSL;
    const KPI2_3_Res_SDSL = jr_SDSL / KPI2_6_Res_SDSL;
    const KPI2_4_Res_SDSL = pr_SDSL / KPI2_6_Res_SDSL;
    const KPI2_5_Res_SDSL = mr_SDSL / KPI2_6_Res_SDSL;

    const insertQuery_SDSL = `INSERT INTO crm (
      idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
      KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
      KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values_SDSL = [username, mois, 'SDSL', kpi3_11_pro_SDSL, kpi3_11_Res_SDSL, 0, 0, KPI2_2_Pro_SDSL, KPI2_2_Res_SDSL, KPI2_3_Pro_SDSL, KPI2_3_Res_SDSL, KPI2_4_Pro_SDSL, KPI2_4_Res_SDSL, KPI2_5_Pro_SDSL, KPI2_5_Res_SDSL, KPI2_6_Pro_SDSL, KPI2_6_Res_SDSL];

    connection.query(insertQuery_SDSL, values_SDSL, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.status(200).json({ message: 'Données insérées avec succès' });
    });

       //_FTTH
       //PRO
       const kpi3_11_pro_FTTH = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'FTTH' && row[3] === 'PRO' ).length;
       const kpi_Pro_FTTH = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'FTTH' && row[3] === 'PRO');
       const KPI2_6_Pro_FTTH= kpi_Pro_FTTH.length;
       console.log('kpi2.6 :', KPI2_6_Pro_FTTH);
   
       const { i_FTTH, j_FTTH, p_FTTH, m_FTTH } = kpi_Pro_FTTH.reduce((acc, row) => {
         const duration = row[2] - row[1];
   
         if (duration < 1) acc.i++;
         else if (duration >= 1 && duration < 2) acc.j++;
         else if (duration >= 2 && duration < 3) acc.p++;
         else acc.m++;
         return acc;
       }, { i_FTTH: 0, j_FTTH: 0, p_FTTH: 0, m_FTTH: 0 });

       const KPI2_2_Pro_FTTH = i_FTTH / KPI2_6_Pro_FTTH;
       const KPI2_3_Pro_FTTH = j_FTTH / KPI2_6_Pro_FTTH;
       const KPI2_4_Pro_FTTH = p_FTTH / KPI2_6_Pro_FTTH;
       const KPI2_5_Pro_FTTH = m_FTTH / KPI2_6_Pro_FTTH;



       //Résidentiel
       const kpi3_11_Res_FTTH = data.slice(1).filter(row => row[11] === 'True'&& row[4] === 'FTTH' && row[3] === 'PRO' ).length;
       const kpi_Res_FTTH = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[4] === 'FTTH' && row[3] === 'PRO');
       const KPI2_6_Res_FTTH= kpi_Res_FTTH.length;
       console.log('kpi2.6 :', KPI2_6_Res_FTTH);
   
       const { ir_FTTH, jr_FTTH, pr_FTTH, mr_FTTH } = kpi_Res_FTTH.reduce((acc, row) => {
         const duration = row[2] - row[1];
   
         if (duration < 1) acc.i++;
         else if (duration >= 1 && duration < 2) acc.jr++;
         else if (duration >= 2 && duration < 3) acc.pr++;
         else acc.mr++;
         return acc;
       }, { ir_FTTH: 0, jr_FTTH: 0, pr_FTTH: 0, mr_FTTH: 0 });
       const KPI2_2_Res_FTTH = ir_FTTH / KPI2_6_Res_FTTH;
       const KPI2_3_Res_FTTH = jr_FTTH / KPI2_6_Res_FTTH;
       const KPI2_4_Res_FTTH = pr_FTTH / KPI2_6_Res_FTTH;
       const KPI2_5_Res_FTTH = mr_FTTH / KPI2_6_Res_FTTH;

       const insertQuery_FTTH = `INSERT INTO crm (
        idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
        KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
        KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      const values_FTTH = [username, mois, 'FTTH', kpi3_11_pro_FTTH, kpi3_11_Res_FTTH, 0, 0, KPI2_2_Pro_FTTH, KPI2_2_Res_FTTH, KPI2_3_Pro_FTTH, KPI2_3_Res_FTTH, KPI2_4_Pro_FTTH, KPI2_4_Res_FTTH, KPI2_5_Pro_FTTH, KPI2_5_Res_FTTH, KPI2_6_Pro_FTTH, KPI2_6_Res_FTTH];
  
      connection.query(insertQuery_FTTH, values_FTTH, (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(200).json({ message: 'Données insérées avec succès' });
      });





  } catch (error) {
    console.error('Erreur lors du traitement du fichier :', error);
    res.status(500).send('Erreur lors du traitement du fichier : ' + error.message);
  }
});

*/













//////////////////////////////




















app.post('/searchTable', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId|| !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId1, mois, Annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  let query = `SELECT * FROM votre_table WHERE userId = ? AND MoisDepot = ? AND annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche:', err);
      return res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
    res.json(results);
  });
});

app.post('/searchTable2', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId || !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId, mois, annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  let query = `SELECT * FROM votre_table2 WHERE userId = ? AND MOIS = ? AND Annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche:', err);
      return res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
    res.json(results);
  });
});




app.post('/searchTable3', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId || !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId, mois, Annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  let query = `SELECT * FROM votre_table3 WHERE userId = ? AND mois_pwc	 = ? AND Annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche:', err);
      return res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
    res.json(results);
  });
});




app.post('/searchTable4', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId || !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId, mois, Annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  let query = `SELECT * FROM votre_table4 WHERE userId = ? AND mois_pwc = ? AND Annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche:', err);
      return res.status(500).json({ error: 'Erreur lors de la recherche' });
    }
    res.json(results);
  });
});

//////////////////////////

app.delete('/searchTable', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId || !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId, mois, annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  const query = `DELETE FROM votre_table WHERE userId = ? AND MoisDepot = ? AND Annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête delete Table1 avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
    res.json(results);
  });
});


app.delete('/searchTable2', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId || !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId, mois, annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  const query = `DELETE FROM votre_table2 WHERE userId = ? AND MOIS = ? AND Annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
    res.json(results);
  });
});

app.delete('/searchTable3', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId || !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId, mois, annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  const query = `DELETE FROM votre_table3 WHERE userId = ? AND mois_pwc = ? AND Annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
    res.json(results);
  });
});

app.delete('/searchTable4', (req, res) => {
  const { userId, mois, annee } = req.body;

  // Vérifier si les paramètres sont bien fournis
  if (!userId || !mois || !annee) {
    return res.status(400).json({ error: 'Tous les champs (userId, mois, annee) sont requis.' });
  }

  // Construire la requête SQL dynamiquement
  const query = `DELETE FROM votre_table4 WHERE userId = ? AND mois_pwc = ? AND Annee = ?`;
  const queryParams = [userId, mois, annee];

  console.log('Exécution de la requête avec :', queryParams);

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la suppression:', err);
      return res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
    res.json(results);
  });
});


//////////////////////////
app.post('/search', (req, res) => {
  // Extraire les paramètres du corps de la requête
  const { idfsi, annee, mois, technologies } = req.body;

  // Convertir les chaînes de caractères en tableaux
  const moisArray = mois.split(','); 
  const techArray = technologies.split(',');

  // Préparer les placeholders pour les requêtes SQL
  const moisPlaceholders = moisArray.map(() => '?').join(',');
  const techPlaceholders = techArray.map(() => '?').join(',');

  // Construire la requête SQL avec les placeholders
  const query = `
    SELECT * FROM crm 
    WHERE idfsi = ? 
      AND Annee = ?
      AND Mois IN (${moisPlaceholders}) 
      AND Technologie IN (${techPlaceholders})
  `;
  console.log('Annee',annee);

  // Combiner idfsi, moisArray, et techArray en un seul tableau de paramètres
  const queryParams = [idfsi, annee, ...moisArray, ...techArray];

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche:', err);
      return res.status(500).send('Erreur lors de la recherche');
    }
    res.json(results);
  });
});

app.post('/search2', (req, res) => {
  // Extraire les paramètres du corps de la requête
  const { idfsi, annee, mois, technologies } = req.body;
  console.log('annee :', annee);


  // Convertir les chaînes de caractères en tableaux
  const moisArray = mois.split(','); 
  const techArray = technologies.split(',');
  const idfsiArray = idfsi.split(',');

  // Préparer les placeholders pour les requêtes SQL
  const moisPlaceholders = moisArray.map(() => '?').join(',');
  const techPlaceholders = techArray.map(() => '?').join(',');
  const idfsiPlaceholders = idfsiArray.map(() => '?').join(',');

  // Construire la requête SQL avec les placeholders
  const query = `
    SELECT * FROM crm 
    WHERE idfsi IN (${idfsiPlaceholders})
      AND Annee = ?
      AND Mois IN (${moisPlaceholders}) 
      AND Technologie IN (${techPlaceholders})
  `;

  console.log('Recherche en cours...');

  // Combiner idfsi, moisArray, et techArray en un seul tableau de paramètres
  const queryParams = [...idfsiArray, annee,...moisArray, ...techArray];

  // Exécuter la requête SQL
  connection.query(query, queryParams, (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche:', err);
      return res.status(500).send('Erreur lors de la recherche');
    }
    res.json(results);
  });
});


















//kpi

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.join(__dirname, 'uploads')); },
  filename: function (req, file, cb) { cb(null, file.originalname); }
});

const upload = multer({ storage: storage });
app.post('/upload', upload.single('excelFile'), (req, res) => {
  // Lire le fichier Excel
  const workbook = xlsx.readFile(req.file.path);
  const sheet_name = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheet_name];

  // Convertir la feuille en tableau JSON
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  // Parcourir les lignes et appliquer les formules
  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // Convertir les dates en objets Date
    const dateDepot = new Date(row[2]);
    const dateValidation = new Date(row[3]);
    const dateConfirmation = new Date(row[4]);
    const dateMESTT = new Date(row[5]);
    const dateEtatMESFSI = new Date(row[6]);

    // Calculer PwC1
    const pwc1 = (dateConfirmation - dateValidation) + (dateEtatMESFSI - dateMESTT);
    row[10] = pwc1; // Mettre à jour PwC1

    // Calculer PwC2
    const pwc2 = (dateValidation - dateDepot) + (dateMESTT - dateConfirmation);
    row[11] = pwc2; // Mettre à jour PwC2
  }

  // Récupérer le nom d'utilisateur à partir du corps de la requête
  const username = req.body.username;

  // SQL pour l'insertion des données
  const sql = 'INSERT INTO votre_table (RefDemande, Etat, DateDepot, DateValidation, DateConfirmation, DateMESTT, DateEtatMESFSI, TypeClient, TypeOffre, MoisDepot, PwC1, PwC2, Annee, userId) VALUES ?';
  
  // Préparer les valeurs pour l'insertion
  const values = data.slice(1).map(row => [...row, username]);

  // Exécuter la requête SQL
  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données dans MySQL :', err.message);
      return res.status(500).send('Erreur lors de l\'insertion des données dans MySQL : ' + err.message);
    }
    console.log('Données insérées dans MySQL :', result);
    res.status(200).send('Fichier téléchargé et données insérées dans MySQL');
  });
});







const processData = (data, technology, type) => {
  const filteredData = data.slice(1).filter(row => row[11] === 'True' && row[3] === technology && row[4] === type);
  const kpi3_11 = filteredData.length;
  console.log('kpi3_11 :', kpi3_11);

  const kpi = filteredData.filter(row => row[5] === 'Clôturé' && row[7] === 'T');
  const KPI2_6 = kpi.length;
  console.log('kpi2_6 :', KPI2_6);

  const { ik, jk, pk, mk } = kpi.reduce((acc, row) => {
    const duration = row[2] - row[1];
    if (duration < 1) acc.ik++;
    else if (duration >= 1 && duration < 2) acc.jk++;
    else if (duration >= 2 && duration < 3) acc.pk++;
    else acc.mk++;
    return acc;
  }, { ik: 0, jk: 0, pk: 0, mk: 0 });

    // Gestion du cas où KPI2_6 est égal à 0
    const KPI2_2 = KPI2_6 === 0 ? 0 : ik / KPI2_6;
    console.log('kpi2_2:', KPI2_2);
    console.log('kpi2_2:', ik);
  
    const KPI2_3 = KPI2_6 === 0 ? 0 : jk / KPI2_6;
    console.log('kpi2_3 :', KPI2_3);
    console.log('kpi2_3:', jk);
  
    const KPI2_4 = KPI2_6 === 0 ? 0 : pk / KPI2_6;
    console.log('kpi2_4 :', KPI2_4);
    console.log('kpi2_4:', pk);
  
    const KPI2_5 = KPI2_6 === 0 ? 0 : mk / KPI2_6;
    console.log('kpi2_5 :', KPI2_5);
    console.log('kpi2_5:', mk);

  return { kpi3_11, KPI2_6, KPI2_2, KPI2_3, KPI2_4, KPI2_5 };
};

const insertData = async (connection, username, mois, technology, proData, resData, annee) => {
  const insertQuery = `INSERT INTO crm (
    idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
    KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
    KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res, Annee
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    username, mois, technology, proData.kpi3_11, resData.kpi3_11, 0, 0, 
    proData.KPI2_2, resData.KPI2_2, proData.KPI2_3, resData.KPI2_3, 
    proData.KPI2_4, resData.KPI2_4, proData.KPI2_5, resData.KPI2_5, 
    proData.KPI2_6, resData.KPI2_6, annee
  ];

  await new Promise((resolve, reject) => {
    connection.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Erreur MySQL :', err.message);
        return reject(err);
      }
      console.log('Données insérées avec succès :', result);
      resolve(result);
    });
  });
};

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads2'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload2 = multer({ storage: storage2 });

app.post('/upload2', upload2.single('excelFile'), async (req, res) => {
  try {
    // Lecture du fichier Excel
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    const username = req.body.username;

    // Requête SQL pour insérer les données dans votre_table2
    const sql = `INSERT INTO votre_table2 (
      id_contrat, date_ouverture, date_cloture, type_offre, type_client, etat_ticket, 
      sujet, type_incident, indisponibilite, derangement, facturation, 
      internet_fixe, id_client, MOIS, Annee, userId	
    ) VALUES ?`;

    const values = data.slice(1).map(row => [...row.slice(0, 15), username]);

    await new Promise((resolve, reject) => {
      connection.query(sql, [values], (err, result) => {
        if (err) {
          console.error('Erreur MySQL :', err.message);
          return reject(err);
        }
        console.log('Données insérées avec succès :', result);
        resolve(result);
      });
    });

    // Calcul des KPI
    const mois = data[1][13];
    const annee = data[1][14];

    console.log('mois :', mois);
    console.log('annee :', annee);

    const technologies = ['SDSL', 'ADSL', 'VDSL', 'FTTH'];

    for (const technology of technologies) {
      console.log('********', technology);

      console.log('Pro');
      const proData = processData(data, technology, 'Pro');

      console.log('Résidentiel');
      const resData = processData(data, technology, 'Résidentiel');

      await insertData(connection, username, mois, technology, proData, resData, annee);
    }

    res.status(200).json({ message: 'Données insérées avec succès' });

  } catch (error) {
    console.error('Erreur serveur :', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});






const storage3 = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.join(__dirname, 'uploads3'));}, 
  filename: function (req, file, cb) { cb(null, file.originalname); } });

const upload3 = multer({ storage: storage3 });

app.post('/upload3', upload3.single('excelFile'), (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheet_name = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheet_name];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  const username = req.body.username;
  
  const sql = 'INSERT INTO votre_table3 (created_at, mois_pwc, duree_pwc, last_user_reply_at, categories, mapping_pwc, closed, Annee ,userId ) VALUES ?';
  const values = data.slice(1).map(row => [...row, username]); // Ajouter username à chaque ligne de données

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données dans MySQL :', err.message);
      return res.status(500).send('Erreur lors de l\'insertion des données dans MySQL : ' + err.message);
    }
    console.log('Données insérées dans MySQL :', result);
    res.status(200).send('Fichier téléchargé et données insérées dans MySQL');
  });
}); 


const storage4 = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.join(__dirname, 'uploads4')); },
  filename: function (req, file, cb) { cb(null, file.originalname);}
});

const upload4 = multer({ storage: storage4 });

app.post('/upload4', upload4.single('excelFile'), (req, res) => {
  const workbook = xlsx.readFile(req.file.path);
  const sheet_name = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheet_name];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  const username = req.body.username;
  const sql = 'INSERT INTO votre_table4 (node_session_sequence, call_start_time, queue_time, ring_time, talk_time, type_client, type_offre, mois_pwc, pwc_3_4, pwc_3_5, Annee, userId ) VALUES ?';
  const values = data.slice(1).map(row => [...row, username]); // Ajouter username à chaque ligne de données

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion des données dans MySQL :', err.message);
      return res.status(500).send('Erreur lors de l\'insertion des données dans MySQL : ' + err.message);
    }
    console.log('Données insérées dans MySQL :', result);
    res.status(200).send('Fichier téléchargé et données insérées dans MySQL');
  });
});


const port = process.env.PORT || 4972;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});













