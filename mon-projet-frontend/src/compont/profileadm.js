/*
import React, { useState } from 'react';
import { Card, Form, Row, Col, Button, Table, Alert, DropdownButton} from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';
import kpiImage from './kpi.PNG';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
function App({ ID }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [annee, setAnnee] = useState("");
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [idfsi] = useState(ID);
  const [selectedRow, setSelectedRow] = useState(null); // État pour stocker la ligne sélectionnée
  const moisEnString = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const [mois, setMois] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
  });

  const [results, setResults] = useState([]);
  const [technologies, setTechnologies] = useState({
    VDSL: false,
    SDSL: false,
    ADSL: false,
    FTTH: false, 
    'LS-FO': false,
  });

  const [selectedColumns, setSelectedColumns] = useState({
    KPI3_11: false,
    KPI2_1: false,
    KPI2_2: false,
    KPI2_3: false,
    KPI2_4: false,
    KPI2_5: false,
    KPI2_6: false,
  });

  const [columnSelection, setColumnSelection] = useState('both'); // 'pro', 'res', 'both'
  const [error, setError] = useState(null); // Ajoutez cette ligne
  const handleChangeTechnologies = (e) => {
    const { name, checked } = e.target;
    setTechnologies({ ...technologies, [name]: checked });
  };

  const handleChangeMois = (e) => {
    const { name, checked } = e.target;
    setMois({ ...mois, [name]: checked });
  };

  const handleCheckboxChange = (columnName) => {
    setSelectedColumns({
      ...selectedColumns,
      [columnName]: !selectedColumns[columnName],
    });
  };

  const handleColumnSelection = (selection) => {
    setColumnSelection(selection);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const selectedTechnologies = Object.keys(technologies).filter(
      (tech) => technologies[tech]
    );
    const selectedMois = Object.keys(mois).filter(
      (moi) => mois[moi]
    );

    try {
      const response = await axios.post('http://localhost:4972/search', {
        idfsi,
        annee,
        mois: selectedMois.join(','),
        technologies: selectedTechnologies.join(','),
      });
      setResults(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

   // Gestion des changements d'année
   const handleChangeAnnee = (value) => {
    const year = parseInt(value, 10);
    if (!isNaN(year) && year >= 2000 && year <= 2100) {
      setAnnee(year);
      setError(null); // Réinitialiser l'erreur
    } else {
      setAnnee("");
      //setError("Veuillez saisir une année valide (entre 2000 et 2100).");
    }
  };

  const handleReset = () => {
    setMois({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
    });
    setTechnologies({
      VDSL: false, SDSL: false, ADSL: false, FTTH: false, 'LS-FO': false,      
    });
    setSelectedColumns({
      KPI3_11: false, KPI2_1: false, KPI2_2: false, KPI2_3: false,
      KPI2_4: false, KPI2_5: false, KPI2_6: false,
    });
    setColumnSelection('both');
    setSelectedRow(null); // Réinitialiser la ligne sélectionnée

    setResults([]);

  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4972/updateAdmin/${ID}`, {
        username,
        password,
        email,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
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

  if (show) {
    return (
      <div className="App">
        <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
          <p>{message}</p>
        </Alert>
        <h1>Mettre à jour mes coordonnées</h1>
        <Form onSubmit={handleUpdateSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="warning" type="submit">
            Mettre à jour
          </Button>
        </Form>

        {message && <Alert variant="info"><p>{message}</p></Alert>}
      </div>
    );
  }

  return (
    <div style={{ marginLeft: "10px" }}>
      <p></p>
      <Form onSubmit={handleSearchSubmit}>
        <Row>
          <Col>
            <Card style={{ width: '22rem', marginBottom: '20px' }}>
              <Card.Img src={folderImage} alt="Folder Image" style={{ maxHeight: '150px' }} />
              <Card.ImgOverlay>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Card.Title>KPI:</Card.Title>
                  <DropdownButton variant="dark" title="Cliquez ici">
                    <Col sm="10">
                      {Object.keys(selectedColumns).map((column) => (
                        <label key={column} className="mr-2" htmlFor={column}>
                          <input
                            type="checkbox"
                            id={column}
                            checked={selectedColumns[column]}
                            onChange={() => handleCheckboxChange(column)}
                          />
                          {column}
                        </label>
                      ))}
                    </Col>
                  </DropdownButton>
                </div>
                <Card.Text>
                  Sélectionnez les listes des KPI qui conviennent à votre affichage.
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '22rem', marginBottom: '20px' }}>
              <Card.Img src={kpiImage} alt="KPI Image" style={{ maxHeight: '150px' }} />
              <Card.ImgOverlay>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Card.Title>Technologie:</Card.Title>
                  <DropdownButton variant="dark" title="Cliquez ici">
                    <Col sm="10">
                      {['VDSL', 'SDSL', 'ADSL', 'FTTH', 'LS-FO'].map((tech) => (
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
                </div>
                <Card.Text>
                  Sélectionnez la technologie qui convient le mieux à votre affichage.
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '22rem', marginBottom: '20px' }}>
              <Card.Img src={folderImage} alt="Folder Image" style={{ maxHeight: '150px' }} />
              <Card.ImgOverlay>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Card.Title>Mois:</Card.Title>
                  <DropdownButton variant="dark" title="Cliquez ici">
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
                </div>
                <Card.Text>
                  Sélectionnez les mois qui conviennent le mieux à votre affichage.
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
            <Card style={{ width: "22rem", marginBottom: "20px" }}>
              <Card.Img src={kpiImage} alt="KPI Image" style={{ maxHeight: "150px" }} />
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
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" variant="warning">Rechercher</Button>
              <Button variant="secondary" onClick={handleReset}>Réinitialiser</Button>
            </Col>
          </Col>

          <Col>
            <Col className="text-end" sm="10">
              <Button variant={columnSelection === 'pro' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('pro')}>Pro</Button>
              <Button variant={columnSelection === 'res' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('res')}>Res</Button>
              <Button variant={columnSelection === 'both' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('both')}>Les deux</Button>
            </Col>
          </Col>
        </Row>
      </Form>

      {results.length > 0 && (
        <div>
          <p></p>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Mois</th>
                <th>Technologie</th>
                {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                  <React.Fragment key={column}>
                    {columnSelection === 'both' && <th colSpan={2}>{column}</th>}
                    {columnSelection !== 'both' && <th>{column}</th>}
                  </React.Fragment>
                ))}
              <th>Actions</th> 

              </tr>
              {columnSelection === 'both' && (
                <tr>
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
                <tr key={index}>
                  <td>{moisEnString[row.Mois - 1]}</td>
                  <td>{row.Technologie}</td>
                  {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                    <React.Fragment key={column}>
                      {columnSelection === 'both' && (
                        <>
                          <td>{row[column + "_Pro"]}</td>
                          <td>{row[column + "_Res"]}</td>
                        </>
                      )}
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
                        <Card.Title>{moisEnString[results[selectedRow].Mois - 1]}- {results[selectedRow].Technologie}</Card.Title>
                      
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
                        <Card.Title>{moisEnString[results[selectedRow].Mois - 1]}- {results[selectedRow].Technologie}</Card.Title>
          
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
                       
                        <Card.Title>{moisEnString[results[selectedRow].Mois - 1]}- {results[selectedRow].Technologie}</Card.Title>
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
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <Button size="lg" variant="warning" onClick={() => setShow(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            className="bi bi-person-fill-gear"
            viewBox="0 0 16 16"
          >
           <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default App;


*/

