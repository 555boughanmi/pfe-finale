
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Row, Col, Button, Table, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
const SearchForm = () => {
  const [idfsi, setIdfsi] = useState([]);
  const [annee, setAnnee] = useState("");
  const [mois, setMois] = useState(Object.fromEntries([...Array(12).keys()].map((m) => [m + 1, false])));
  const [results, setResults] = useState([]);
  const [technologies, setTechnologies] = useState({
    VDSL: false, SDSL: false, ADSL: false, FTTH: false, 'LS-FO': false,
  });
  const [selectedColumns, setSelectedColumns] = useState({
    KPI3_11: false, KPI2_1: false, KPI2_2: false, KPI2_3: false, KPI2_4: false,
    KPI2_5: false, KPI2_6: false,
  });
    const [selectedRow, setSelectedRow] = useState(null); // État pour stocker la ligne sélectionnée
    const moisEnString = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
  
  const [users, setUsers] = useState([]);
  const [columnSelection, setColumnSelection] = useState('both'); // 'pro', 'res', 'both'
  const [error, setError] = useState(null); // Pour afficher les erreurs

  // Récupérer les utilisateurs FSI
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4972/listfsi');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs FSI :', error);
        setError('Erreur lors de la récupération des utilisateurs FSI.');
      }
    };
    fetchUsers();
  }, []);

  // Gestion des changements de technologies
  const handleChangeTechnologies = useCallback((e) => {
    const { name, checked } = e.target;
    setTechnologies((prev) => ({ ...prev, [name]: checked }));
  }, []);

  // Gestion des changements de mois
  const handleChangeMois = useCallback((e) => {
    const { name, checked } = e.target;
    setMois((prev) => ({ ...prev, [name]: checked }));
  }, []);

  // Gestion des changements d'année
  const handleChangeAnnee = (value) => {
    const year = parseInt(value, 10);
    if (!isNaN(year) && year >= 2000 && year <= 2100) {
      setAnnee(year);
      setError(null); // Réinitialiser l'erreur
    } else {
      setAnnee("");
      setError("Veuillez saisir une année valide (entre 2000 et 2100).");
    }
  };

  // Gestion des changements de FSI
  const handleChangeIdfsi = useCallback((e) => {
    const { name, checked } = e.target;
    setIdfsi((prev) => (checked ? [...prev, name] : prev.filter((id) => id !== name)));
  }, []);

  // Gestion des changements de colonnes sélectionnées
  const handleCheckboxChange = useCallback((columnName) => {
    setSelectedColumns((prev) => ({ ...prev, [columnName]: !prev[columnName] }));
  }, []);

  // Gestion de la sélection des colonnes (Pro, Res, Les deux)
  const handleColumnSelection = useCallback((selection) => {
    setColumnSelection(selection);
  }, []);

  // Soumission du formulaire
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const selectedTechnologies = Object.keys(technologies).filter((tech) => technologies[tech]);
      const selectedMois = Object.keys(mois).filter((moi) => mois[moi]);

      if (!annee || selectedMois.length === 0 || selectedTechnologies.length === 0 || idfsi.length === 0) {
        setError('Veuillez sélectionner une année, au moins un mois, une technologie et un FSI.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:4972/search2', {
          idfsi: idfsi.join(','),
          mois: selectedMois.join(','),
          annee,
          technologies: selectedTechnologies.join(','),
        });
        setResults(response.data);
        setError(null); // Réinitialiser l'erreur en cas de succès
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        setError('Erreur lors de la recherche. Veuillez réessayer.');
      }
    },
    [idfsi, mois, technologies, annee]
  );

  // Réinitialisation du formulaire
  const handleReset = useCallback(() => {
    setIdfsi([]);
    setMois(Object.fromEntries([...Array(12).keys()].map((m) => [m + 1, false])));
    setTechnologies(Object.fromEntries(Object.keys(technologies).map((key) => [key, false])));
    setSelectedColumns(Object.fromEntries(Object.keys(selectedColumns).map((key) => [key, false])));
    setColumnSelection('both');
    setSelectedRow(null); // Réinitialiser la ligne sélectionnée

    setResults([]);
    setError(null);
  }, [technologies, selectedColumns]);
    // Fonction pour récupérer le username à partir de idfsi
    const getUsernameByIdfsi = (idfsi) => {
      if (!idfsi || !Array.isArray(users) || users.length === 0) {
        return 'N/A';
      }
      const user = users.find((user) => String(user.id) === String(idfsi));
      return user ? user.username : 'N/A';
    };

    // Fonction pour générer les données du graphique
    const generateChartData = (row, type) => {
      const labels = ['KPI 2.2', 'KPI 2.3', 'KPI 2.4', 'KPI 2.5'];
      const data = labels.map((label, index) => {
        const kpiKey = `KPI2_${index + 2}_${type}`; // Génère la clé (ex: KPI2_2_Pro)
        return row[kpiKey] || 0; // Retourne la valeur ou 0 si non définie
      });
  
      return {
        labels: labels.map(label => `${label} ${type}`),
        datasets: [
          {
            label: `Valeur des KPIs (%) - ${type}`,
            data: data,
            backgroundColor: ['#f7bd40', '#ffb303', '#f55f02', '#c9630a'],
            borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
            borderWidth: 5,
          },
        ],
      };
    };

  return (
    <div style={{ marginLeft: "10px" }}>
      <p> </p>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
          <Card style={{ width: "17rem", marginBottom: "20px" }}>
          <Card.Img src={folderImage} alt="Folder" style={{ maxHeight: '135px' }} />
              <Card.ImgOverlay>
                <Card.Title>FSI</Card.Title>
                <DropdownButton variant="dark" title="Sélectionnez FSI">
                  <Col sm="10">
                    {users.map((user) => (
                      <Form.Check
                        key={user.id}
                        type="checkbox"
                        name={String(user.id)}
                        label={user.username}
                        checked={idfsi.includes(String(user.id))}
                        onChange={handleChangeIdfsi}
                      />
                    ))}
                  </Col>
                </DropdownButton>
                <Card.Text>Sélectionnez les FSI à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
          <Card style={{ width: "17rem", marginBottom: "20px" }}>
          <Card.Img src={folderImage} alt="Folder" style={{ maxHeight: '135px' }} />
              <Card.ImgOverlay>
                <Card.Title>Technologie:</Card.Title>
                <DropdownButton variant="dark" title="Sélectionnez Technologie">
                  <Col sm="10">
                    {Object.keys(technologies).map((tech) => (
                      <Form.Check
                        key={tech}
                        type="checkbox"
                        name={tech}
                        label={tech}
                        checked={technologies[tech]}
                        onChange={handleChangeTechnologies}
                      />
                    ))}
                  </Col>
                </DropdownButton>
                <Card.Text>Sélectionnez les technologies à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
          <Card style={{ width: "17rem", marginBottom: "20px" }}>
          <Card.Img src={folderImage} alt="Folder" style={{ maxHeight: '135px' }} />
              <Card.ImgOverlay>
                <Card.Title>KPI:</Card.Title>
                <DropdownButton variant="dark" title="Sélectionnez KPI">
                  <Col sm="10">
                    {Object.keys(selectedColumns).map((column) => (
                      <Form.Check
                        key={column}
                        type="checkbox"
                        name={column}
                        label={column}
                        checked={selectedColumns[column]}
                        onChange={() => handleCheckboxChange(column)}
                      />
                    ))}
                  </Col>
                </DropdownButton>
                <Card.Text>Sélectionnez les KPI à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
          <Card style={{ width: "17rem", marginBottom: "20px" }}>
          <Card.Img src={folderImage} alt="Folder" style={{ maxHeight: '135px' }} />
              <Card.ImgOverlay>
                <Card.Title>Mois:</Card.Title>
                <DropdownButton variant="dark" title="Sélectionnez Mois">
                  <Col sm="10">
                    {[...Array(12).keys()].map((month) => (
                      <Form.Check
                        key={month + 1}
                        type="checkbox"
                        name={(month + 1).toString()}
                        label={new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(2000, month))}
                        checked={mois[month + 1]}
                        onChange={handleChangeMois}
                      />
                    ))}
                  </Col>
                </DropdownButton>
                <Card.Text>Sélectionnez les mois à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
          <Card style={{ width: "17rem", marginBottom: "20px" }}>
          <Card.Img src={folderImage} alt="Folder" style={{ maxHeight: '135px' }} />
            <Card.ImgOverlay>
                <Card.Title>Année :</Card.Title>
                <Form.Control
        type="number"
        placeholder="Saisir l'année"
        value={annee}
        onChange={(e) => handleChangeAnnee(e.target.value)}
        min="2000"
        max="2100"
      />
                <Card.Text>Sélectionnez l'année à afficher.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit" variant="warning">Rechercher</Button>
            <Button variant="secondary" onClick={handleReset}>Réinitialiser</Button>
          </Col>
          <Col>
            <Col className="text-end" >
              <Button variant={columnSelection === 'pro' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('pro')}>Pro</Button>
              <Button variant={columnSelection === 'res' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('res')}>Res</Button>
              <Button variant={columnSelection === 'both' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('both')}>Les deux</Button>
            </Col>
          </Col>
        </Row>
      </Form>

      {error && <div className="text-danger mb-3">{error}</div>}

      {results.length > 0 && (
        <div>
          <p></p>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>FSI</th>
                <th>Mois</th>
                <th>Technologie</th>
                {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                  <React.Fragment key={column}>
                    {columnSelection === 'both' && <th colSpan={2}>{column}</th>}
                    {columnSelection === 'pro' && <th>{column} Pro</th>}
                    {columnSelection === 'res' && <th>{column} Res</th>}
                  </React.Fragment>
                ))}
               <th>Actions</th> 

              </tr>
              {columnSelection === 'both' && (
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                    <React.Fragment key={column}>
                      <th>Pro</th>
                      <th>Res</th>
                    </React.Fragment>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={`${row.idfsi}-${moisEnString[row.Mois - 1]}-${row.Technologie}-${index}`}>
                  <td> {getUsernameByIdfsi(row.idfsi)}  </td>
                  <td>{moisEnString[row.Mois - 1]}</td>
                  <td>{row.Technologie}</td>
                  {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                    <React.Fragment key={column}>
                      {columnSelection === 'both' && ( <> <td>{row[column + "_Pro"]}</td>   <td>{row[column + "_Res"]}</td> </>)}
                      {columnSelection === 'pro' && <td>{row[column + "_Pro"]}</td>}
                      {columnSelection === 'res' && <td>{row[column + "_Res"]}</td>}
                    </React.Fragment>
                  ))}
                       <td>
                                <Button size="sm" variant="warning"  onClick={() => setSelectedRow(index)}  >
                      
                                                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16">
                                                         <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                                                         <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
                                                         </svg> 
                                                    </Button>
                               
                              </td>
                </tr>
              ))}
            </tbody>
          </Table>
            {selectedRow !== null && (
                      <div style={{ marginTop: '20px' }}>
                          
                       
                        {columnSelection === 'pro' && (
                           <Card style={{ width: '20rem' , position: 'absolute', right: '10px' }}>
                           <Card.Body>
                           <div style={{ position: 'absolute', top: '10px', right: '10px' }}>   
          
          <Button variant="secondary" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer',}}  onClick={() => setSelectedRow(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  fill="#000000" className="bi bi-eye-slash-fill" viewBox="0 0 16 16" >
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
          </svg> 
          </Button> </div>
                        <Card.Title> {getUsernameByIdfsi(results[selectedRow].idfsi)} - {moisEnString[results[selectedRow].Mois - 1]} - {results[selectedRow].Technologie}</Card.Title>
                      
                          <Card.Subtitle className="mb-2 text-muted">Graphique Pro</Card.Subtitle>
                            <Doughnut data={generateChartData(results[selectedRow], 'Pro')} />
                         
                          </Card.Body>
                                  </Card>
                        )}
                                        
          
                        {columnSelection === 'res' && (
                              <Card style={{ width: '20rem' , position: 'absolute', right: '10px' }}>
                              <Card.Body>
                              <div style={{ position: 'absolute', top: '10px', right: '10px' }}>   
             
             <Button variant="secondary" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer',}}  onClick={() => setSelectedRow(null)}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  fill="#000000" className="bi bi-eye-slash-fill" viewBox="0 0 16 16" >
             <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
             <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
             </svg> 
             </Button> </div>
                        <Card.Title>{getUsernameByIdfsi(results[selectedRow].idfsi)} - {moisEnString[results[selectedRow].Mois - 1]}- {results[selectedRow].Technologie}</Card.Title>
          
                          <Card.Subtitle className="mb-2 text-muted">Graphique Res</Card.Subtitle>
                            <Doughnut data={generateChartData(results[selectedRow], 'Res')} />
                          
                            </Card.Body>
                                  </Card>
                        )}
                        {columnSelection === 'both' && (
                           <Card style={{ width: '40rem' , position: 'absolute', right: '10px' }}>
                           <Card.Body>
                           <div style={{ position: 'absolute', top: '10px', right: '10px' }}>   
          
          <Button variant="secondary" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer',}}  onClick={() => setSelectedRow(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  fill="#000000" className="bi bi-eye-slash-fill" viewBox="0 0 16 16" >
          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
          </svg> 
          </Button> </div>
                       
                        <Card.Title>{getUsernameByIdfsi(results[selectedRow].idfsi)} - {moisEnString[results[selectedRow].Mois - 1]}- {results[selectedRow].Technologie}</Card.Title>
                          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>
                            <Card.Subtitle className="mb-2 text-muted">Graphique Pro</Card.Subtitle>
                            <Doughnut data={generateChartData(results[selectedRow], 'Pro')} />
                            </div>
                            <div>
                            <Card.Subtitle className="mb-2 text-muted">Graphique Res</Card.Subtitle>
          
                              <Doughnut data={generateChartData(results[selectedRow], 'Res')} />
                            </div>
                          </div>
                      
                          </Card.Body>
                                  </Card>
                        )}
                        
                                  
                      </div>
                    )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;

