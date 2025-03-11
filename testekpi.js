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
      const kpi3_11_pro_VDSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'VDSL' && row[4] === 'Pro' ).length;
      console.log('kpi3_11_pro_VDSL :', kpi3_11_pro_VDSL);
  
      const kpi_Pro_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'VDSL' && row[4] === 'Pro');
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
  
      const kpi3_11_Res_VDSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'VDSL' && row[4] === 'Résidentiel' ).length;
      console.log('kpi3.11 Résidentiel :', kpi3_11_Res_VDSL);
      
          const kpi_Res_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'VDSL' && row[4] === 'Résidentiel');
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
  
  
  
  
    } catch (error) {
      console.error('Erreur lors du traitement du fichier :', error);
      res.status(500).send('Erreur lors du traitement du fichier : ' + error.message);
    }
  });
  
  /*
  
  

const processData = (data, technology, type) => {
  const filteredData = data.slice(1).filter(row => row[11] === 'True' && row[4] === technology && row[3] === type);
  const kpi3_11 = filteredData.length;

  const kpi = filteredData.filter(row => row[5] === 'Clôturé' && row[7] === 'T');
  const KPI2_6 = kpi.length;

  const { i, j, p, m } = kpi.reduce((acc, row) => {
    const duration = row[2] - row[1];
    if (duration < 1) acc.i++;
    else if (duration >= 1 && duration < 2) acc.j++;
    else if (duration >= 2 && duration < 3) acc.p++;
    else acc.m++;
    return acc; }, { i: 0, j: 0, p: 0, m: 0 });

  const KPI2_2 = i / KPI2_6;
  const KPI2_3 = j / KPI2_6;
  const KPI2_4 = p / KPI2_6;
  const KPI2_5 = m / KPI2_6;

  return { kpi3_11, KPI2_6, KPI2_2, KPI2_3, KPI2_4, KPI2_5 };
};

const insertData = (connection, username, mois, technology, proData, resData) => {
  const insertQuery = `INSERT INTO crm (
    idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
    KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
    KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    username, mois, technology, proData.kpi3_11, resData.kpi3_11, 0, 0, 
    proData.KPI2_2, resData.KPI2_2, proData.KPI2_3, resData.KPI2_3, 
    proData.KPI2_4, resData.KPI2_4, proData.KPI2_5, resData.KPI2_5, 
    proData.KPI2_6, resData.KPI2_6 ];

  connection.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.status(200).json({ message: 'Données insérées avec succès' });
  });
};

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.join(__dirname, 'uploads2')); },
  filename: function (req, file, cb) { cb(null, file.originalname);  }
});


const upload2 = multer({ storage: storage2 });

app.post('/upload2', upload2.single('excelFile'), (req, res) => {
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
      console.log('mois :', mois);

    const technologies = ['VDSL', 'ADSL', 'SDSL', 'FTTH'];

    technologies.forEach(technology => {
      const proData = processData(data, technology, 'Pro');
      const resData = processData(data, technology, 'Résidentiel');
      insertData(connection, username, mois, technology, proData, resData);
    });

  } catch (error) {
    console.error('Erreur lors du traitement du fichier :', error);
    res.status(500).send('Erreur lors du traitement du fichier : ' + error.message);
  }
});

  
  
  


















/////////////////////////////////////////////////////////////////////////////





const storage2 = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, path.join(__dirname, 'uploads2')); },
  filename: function (req, file, cb) { cb(null, file.originalname);  }
});
const upload2 = multer({ storage: storage2 });


// Route pour l'upload de fichier
app.post('/upload2', upload2.single('excelFile'), (req, res) => {
  try {
    // Lecture du fichier Excel
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const username = req.body.username;

    // Insertion des données dans la table principale
    const sql = `INSERT INTO votre_table2 (
      id_contrat, date_ouverture, date_cloture, type_offre, type_client, etat_ticket, 
      sujet, type_incident, indisponibilite, derangement, facturation, 
      internet_fixe, id_client, MOIS, Annee, userId	
    ) VALUES ?`;

    const values = data.slice(1).map(row => [...row.slice(0, 14), username]);

    connection.query(sql, [values], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion des données dans MySQL :', err.message);
        return res.status(500).send('Erreur lors de l\'insertion des données dans MySQL : ' + err.message);
      }
      console.log('Données insérées dans MySQL :', result);
    });

    // Calcul des KPI pour les clients Pro VDSL
    const mois = data[1][13];
    console.log('mois :', mois);

    const kpi3_11_pro_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[3] === 'VDSL' && row[4] === 'Pro').length;
    console.log('kpi3_11_pro_VDSL :', kpi3_11_pro_VDSL);

    const kpi_Pro_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'VDSL' && row[4] === 'Pro');
    const KPI2_6_Pro_VDSL = kpi_Pro_VDSL.length;
    console.log('kpi2.6 pro :', KPI2_6_Pro_VDSL);

    const { i_VDSL, j_VDSL, p_VDSL, m_VDSL } = kpi_Pro_VDSL.reduce((acc, row) => {
      const duration = row[2] - row[1];

      if (duration < 1) acc.i_VDSL++;
      else if (duration >= 1 && duration < 2) acc.j_VDSL++;
      else if (duration >= 2 && duration < 3) acc.p_VDSL++;
      else acc.m_VDSL++;
      return acc;
    }, { i_VDSL: 0, j_VDSL: 0, p_VDSL: 0, m_VDSL: 0 });

    const KPI2_2_Pro_VDSL = i_VDSL / KPI2_6_Pro_VDSL;
    console.log('kpi2.2 Pro :', KPI2_2_Pro_VDSL);

    const KPI2_3_Pro_VDSL = j_VDSL / KPI2_6_Pro_VDSL;
    console.log('kpi2.3 Pro :', KPI2_3_Pro_VDSL);

    const KPI2_4_Pro_VDSL = p_VDSL / KPI2_6_Pro_VDSL;
    console.log('kpi2.4 Pro :', KPI2_4_Pro_VDSL);

    const KPI2_5_Pro_VDSL = m_VDSL / KPI2_6_Pro_VDSL;
    console.log('kpi2.5 Pro :', KPI2_5_Pro_VDSL);

    // Calcul des KPI pour les clients Résidentiels VDSL
    const kpi3_11_Res_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[3] === 'VDSL' && row[4] === 'Résidentiel').length;
    console.log('kpi3.11 Résidentiel :', kpi3_11_Res_VDSL);

    const kpi_Res_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'VDSL' && row[4] === 'Résidentiel');
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
    console.log('kpi2.2 Résidentiel :', KPI2_2_Res_VDSL);

    const KPI2_3_Res_VDSL = jr_VDSL / KPI2_6_Res_VDSL;
    console.log('kpi2.3 Résidentiel :', KPI2_3_Res_VDSL);

    const KPI2_4_Res_VDSL = pr_VDSL / KPI2_6_Res_VDSL;
    console.log('kpi2.4 Résidentiel :', KPI2_4_Res_VDSL);

    const KPI2_5_Res_VDSL = mr_VDSL / KPI2_6_Res_VDSL;
    console.log('kpi2.5 Résidentiel :', KPI2_5_Res_VDSL);

    // Insertion des KPI dans la table CRM
    const insertQuery_VDSL = `INSERT INTO crm (
      idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
      KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
      KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values_VDSL = [username, mois, 'VDSL', kpi3_11_pro_VDSL, kpi3_11_Res_VDSL, 0, 0, KPI2_2_Pro_VDSL, KPI2_2_Res_VDSL, KPI2_3_Pro_VDSL, KPI2_3_Res_VDSL, KPI2_4_Pro_VDSL, KPI2_4_Res_VDSL, KPI2_5_Pro_VDSL, KPI2_5_Res_VDSL, KPI2_6_Pro_VDSL, KPI2_6_Res_VDSL];
    console.log(values_VDSL);

    connection.query(insertQuery_VDSL, values_VDSL, (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'insertion des KPI dans la table CRM :', err);
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
  ////correcte 
  
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
      console.log('mois :', mois);
       //PRO
       const kpi3_11_pro_VDSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'VDSL' && row[4] === 'Pro' ).length;
       console.log('kpi3_11_pro_VDSL :', kpi3_11_pro_VDSL);
   
       const kpi_Pro_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'VDSL' && row[4] === 'Pro');
       const KPI2_6_Pro_VDSL= kpi_Pro_VDSL.length;
       console.log('kpi2.6 pro :', KPI2_6_Pro_VDSL);
   
       const { i_VDSL, j_VDSL, p_VDSL, m_VDSL } = kpi_Pro_VDSL.reduce((acc, row) => {
         const duration = row[2] - row[1];
   
         if (duration < 1) acc.i_VDSL++;
         else if (duration >= 1 && duration < 2) acc.j_VDSL++;
         else if (duration >= 2 && duration < 3) acc.p_VDSL++;
         else acc.m_VDSL++;
         return acc;
       }, { i_VDSL: 0, j_VDSL: 0, p_VDSL: 0, m_VDSL: 0 });
   
       const KPI2_2_Pro_VDSL = i_VDSL /KPI2_6_Pro_VDSL;
       console.log('kpi2.2 pro :', KPI2_2_Pro_VDSL);

       const KPI2_3_Pro_VDSL = j_VDSL /KPI2_6_Pro_VDSL ;
       console.log('kpi2.3 pro :', KPI2_3_Pro_VDSL);

       const KPI2_4_Pro_VDSL = p_VDSL /KPI2_6_Pro_VDSL ;
       console.log('kpi2.4 pro :', KPI2_4_Pro_VDSL);

       const KPI2_5_Pro_VDSL = m_VDSL  /KPI2_6_Pro_VDSL;
       console.log('kpi2.5 pro :', KPI2_5_Pro_VDSL);

   
       const kpi3_11_Res_VDSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'VDSL' && row[4] === 'Résidentiel' ).length;
       console.log('kpi3.11 Résidentiel :', kpi3_11_Res_VDSL);
       
           const kpi_Res_VDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'VDSL' && row[4] === 'Résidentiel');
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
       console.log('kpi2.2 Résidentiel :', KPI2_2_Res_VDSL);

       const KPI2_3_Res_VDSL = jr_VDSL / KPI2_6_Res_VDSL;
       console.log('kpi2.3 Résidentiel :', KPI2_3_Res_VDSL);

       const KPI2_4_Res_VDSL = pr_VDSL / KPI2_6_Res_VDSL;
       console.log('kpi2.4 Résidentiel :', KPI2_4_Res_VDSL);

       const KPI2_5_Res_VDSL = mr_VDSL / KPI2_6_Res_VDSL;
       console.log('kpi2.5 Résidentiel :', KPI2_5_Res_VDSL);


      const insertQuery_CRM = `INSERT INTO crm (
          idfsi, Mois, Technologie, KPI3_11_Pro, KPI3_11_Res, KPI2_1_Pro, 
          KPI2_1_Res, KPI2_2_Pro, KPI2_2_Res, KPI2_3_Pro, KPI2_3_Res, KPI2_4_Pro, 
          KPI2_4_Res, KPI2_5_Pro, KPI2_5_Res, KPI2_6_Pro, KPI2_6_Res
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      
      const values_VDSL = [username, mois, 'VDSL', kpi3_11_pro_VDSL, kpi3_11_Res_VDSL, 0, 0, KPI2_2_Pro_VDSL, KPI2_2_Res_VDSL, KPI2_3_Pro_VDSL, KPI2_3_Res_VDSL, KPI2_4_Pro_VDSL, KPI2_4_Res_VDSL, KPI2_5_Pro_VDSL, KPI2_5_Res_VDSL, KPI2_6_Pro_VDSL, KPI2_6_Res_VDSL];
      await new Promise((resolve, reject) => {
          connection.query(insertQuery_CRM, values_VDSL, (err, result) => {
              if (err) {
                  console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
                  return reject(err);
              }
              resolve(result);
          });
      });


      const kpi3_11_pro_SDSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'ADSL' && row[4] === 'Pro' ).length;

      const kpi_Pro_SDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'ADSL' && row[4] === 'Pro');
      const KPI2_6_Pro_SDSL= kpi_Pro_SDSL.length;
      console.log('kpi2.6 pro TEST :', KPI2_6_Pro_SDSL);
  
      const { i_SDSL, j_SDSL, p_SDSL, m_SDSL } = kpi_Pro_SDSL.reduce((acc, row) => {
        const duration = row[2] - row[1];
  
        if (duration < 1) acc.i_SDSL++;
        else if (duration >= 1 && duration < 2) acc.j_SDSL++;
        else if (duration >= 2 && duration < 3) acc.p_SDSL++;
        else acc.m_SDSL++;
        return acc;
      }, { i_SDSL: 0, j_SDSL: 0, p_SDSL: 0, m_SDSL: 0 });
  
      const KPI2_2_Pro_SDSL = i_SDSL / KPI2_6_Pro_SDSL;
      console.log('kpi2.2 pro  TEST  :', i_SDSL);

      const KPI2_3_Pro_SDSL = j_SDSL / KPI2_6_Pro_SDSL;
      console.log('kpi2.3 pro  TEST :', j_SDSL);

      const KPI2_4_Pro_SDSL = p_SDSL / KPI2_6_Pro_SDSL;
      console.log('kpi2.4 pro  TEST  :', p_SDSL);


      const KPI2_5_Pro_SDSL = m_SDSL / KPI2_6_Pro_SDSL;
      console.log('kpi2.5 pro  TEST :', m_SDSL);

  
   // Résidentiel  
  const kpi3_11_Res_SDSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'SDSL' && row[4] === 'Résidentiel' ).length;
  
      const kpi_Res_SDSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'SDSL' && row[4] === 'Résidentiel');
      const KPI2_6_Res_SDSL = kpi_Res_SDSL.length;
      console.log('kpi2.6 Résidentiel  TEST  :', KPI2_6_Res_SDSL);
  
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
  




      const values_SDSL = [username, mois, 'SDSL', kpi3_11_pro_SDSL, kpi3_11_Res_SDSL, 0, 0, KPI2_2_Pro_SDSL, KPI2_2_Res_SDSL, KPI2_3_Pro_SDSL, KPI2_3_Res_SDSL, KPI2_4_Pro_SDSL, KPI2_4_Res_SDSL, KPI2_5_Pro_SDSL, KPI2_5_Res_SDSL, KPI2_6_Pro_SDSL, KPI2_6_Res_SDSL];

      await new Promise((resolve, reject) => {
          connection.query(insertQuery_CRM, values_SDSL, (err, result) => {
              if (err) {
                  console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
                  return reject(err);
              }
              resolve(result);
          });
      });




















      const kpi3_11_Res_ADSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'ADSL' && row[4] === 'Résidentiel' ).length;
      const kpi3_11_pro_ADSL = data.slice(1).filter(row => row[11] === 'True'&& row[3] === 'ADSL' && row[4] === 'Pro' ).length;
  
      const kpi_Pro_ADSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'ADSL' && row[4] === 'Pro');
      const KPI2_6_Pro_ADSL= kpi_Pro_ADSL.length;
      console.log('kpi2.6 :', KPI2_6_Pro_ADSL);
  
      const { i_ADSL, j_ADSL, p_ADSL, m_ADSL } = kpi_Pro_ADSL.reduce((acc, row) => {
        const duration = row[2] - row[1];
  
        if (duration < 1) acc.i_ADSL++;
        else if (duration >= 1 && duration < 2) acc.j_ADSL++;
        else if (duration >= 2 && duration < 3) acc.p_ADSL++;
        else acc.m_ADSL++;
        return acc;
      }, { i_ADSL: 0, j_ADSL: 0, p_ADSL: 0, m_ADSL: 0 });
  
      const KPI2_2_Pro_ADSL = i_ADSL / KPI2_6_Pro_ADSL;
      console.log('kpi2.2 Pro :', KPI2_2_Pro_ADSL);

      const KPI2_3_Pro_ADSL = j_ADSL / KPI2_6_Pro_ADSL;
      const KPI2_4_Pro_ADSL = p_ADSL / KPI2_6_Pro_ADSL;
      const KPI2_5_Pro_ADSL = m_ADSL / KPI2_6_Pro_ADSL;
  
      const kpi_Res_ADSL = data.slice(1).filter(row => row[11] === 'True' && row[5] === 'Clôturé' && row[7] === 'T' && row[3] === 'ADSL' && row[4] === 'Résidentiel');
      const KPI2_6_Res_ADSL = kpi_Res_ADSL.length;
      console.log('kpi2.6 Résidentiel :', KPI2_6_Res_ADSL);
  
      const { ir_ADSL, jr_ADSL, pr_ADSL, mr_ADSL } = kpi_Res_ADSL.reduce((acc, row) => {
        const duration = row[2] - row[1];
  
        if (duration < 1) acc.ir_ADSL++;
        else if (duration >= 1 && duration < 2) acc.jr_ADSL++;
        else if (duration >= 2 && duration < 3) acc.pr_ADSL++;
        else acc.mr_ADSL++;
        return acc;
      }, { ir_ADSL: 0, jr_ADSL: 0, pr_ADSL: 0, mr_ADSL: 0 });
  
      const KPI2_2_Res_ADSL = ir_ADSL / KPI2_6_Res_ADSL;
      console.log('kpi2.2 Résidentiel :', KPI2_2_Res_ADSL);

      const KPI2_3_Res_ADSL = jr_ADSL / KPI2_6_Res_ADSL;
      const KPI2_4_Res_ADSL = pr_ADSL / KPI2_6_Res_ADSL;
      const KPI2_5_Res_ADSL = mr_ADSL / KPI2_6_Res_ADSL;
  
    
  
      const values_ADSL = [username, mois, 'ADSL', kpi3_11_pro_ADSL, kpi3_11_Res_ADSL, 0, 0, KPI2_2_Pro_ADSL, KPI2_2_Res_ADSL, KPI2_3_Pro_ADSL, KPI2_3_Res_ADSL, KPI2_4_Pro_ADSL, KPI2_4_Res_ADSL, KPI2_5_Pro_ADSL, KPI2_5_Res_ADSL, KPI2_6_Pro_ADSL, KPI2_6_Res_ADSL];
  

      await new Promise((resolve, reject) => {
        connection.query(insertQuery_CRM, values_ADSL, (err, result) => {
            if (err) {
                console.error('Erreur lors de l\'insertion de l\'utilisateur :', err);
                return reject(err);
            }
            resolve(result);
        });
    });



      res.status(200).json({ message: 'Données insérées avec succès' });

  } catch (error) {
      console.error('Erreur serveur :', error);
      res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

  


  