
/*import React, { useState } from 'react';
import { Card, Form, DropdownButton, Row, Col, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';
import kpiImage from './kpi.PNG';

function App({ ID }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 // const [annee, setAnnee] = useState("");
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [idfsi] = useState(ID);
  //const [id, setId] = useState(ID);
  //const [id] = useState(ID);

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
        mois: selectedMois.join(','),
        technologies: selectedTechnologies.join(','),
      });
      setResults(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
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
    <div style={{ marginLeft: "100px" }}>
      
      <p></p>
      <Form onSubmit={handleSearchSubmit}>
        <Row>
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
                  <Card.Title>KPI:</Card.Title>
                  <DropdownButton variant="dark" title="Cliquez ici">
                    <Col sm="10">
                      {Object.keys(selectedColumns).map((column) => (
                        <label key={column} className="mr-2">
                          <input
                            type="checkbox"
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
              <Button variant={columnSelection === 'both' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('both')}>both</Button>
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
                  <td>{row.Mois}</td>
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
                </tr>
              ))}
            </tbody>
          </Table>
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
import React, { useState } from 'react';
import { Card, Form, DropdownButton, Dropdown, Row, Col, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';
import kpiImage from './kpi.PNG';

function App({ ID }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [annee, setAnnee] = useState("");
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [idfsi] = useState(ID);

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

  const handleChangeAnnee = (value) => {
    setAnnee(value);
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
                <Dropdown onSelect={handleChangeAnnee}>
                  <Dropdown.Toggle variant="dark">
                    {annee ? annee : "Sélectionner"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {["2024", "2023", "2025"].map((year) => (
                      <Dropdown.Item key={year} eventKey={year}>
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
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
                  <td>{row.Mois}</td>
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
                </tr>
              ))}
            </tbody>
          </Table>
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




