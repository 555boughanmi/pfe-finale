/*
import React, { useState } from 'react';
import { Card, Form, DropdownButton, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';
import kpiImage from './kpi.PNG';

const SearchForm = ({ Username }) => {
  const [idfsi] = useState(Username);
  const [mois, setMois] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false, 6: false,
    7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
  });
  const [results, setResults] = useState([]);
  const [technologies, setTechnologies] = useState({
    VDSL: false, SDSL: false, ADSL: false, FTTH: false, 'LS-FO': false,
 });
  const [selectedColumns, setSelectedColumns] = useState({
    KPI3_11: false, KPI2_1: false, KPI2_2: false, KPI2_3: false,
    KPI2_4: false, KPI2_5: false, KPI2_6: false,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedTechnologies = Object.keys(technologies).filter(
      (tech) => technologies[tech]
    );
    const selectedMois = Object.keys(mois).filter(
      (moi) => mois[moi]
    );
    console.log({ idfsi, selectedMois, selectedTechnologies })
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

  const handleReset = () => {
    setMois(Object.fromEntries(Object.keys(mois).map(key => [key, false])));
    setTechnologies(Object.fromEntries(Object.keys(technologies).map(key => [key, false])));
    setSelectedColumns(Object.fromEntries(Object.keys(selectedColumns).map(key => [key, false])));
    setColumnSelection('both');
    setResults([]);
  };

  return (
     <div style={{ marginLeft: "20px" }}>
      <p></p>
      <Form onSubmit={handleSubmit}>
        <Row>
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
          <Col>
            <Card style={{ width: '22rem', marginBottom: '20px'  }}>
              <Card.Img src={folderImage} alt="Folder Image" style={{ maxHeight: '150px' }} />
              <Card.ImgOverlay>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Card.Title>Mois:</Card.Title>
                  <DropdownButton variant="dark" title="Sélectionner">
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
                  Sélectionnez les mois à afficher.
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
                  <DropdownButton variant="dark" title="Sélectionner">
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
                  Sélectionnez les technologies à afficher.
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
                  <DropdownButton variant="dark" title="Sélectionner">
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
                  Sélectionnez les KPI à afficher.
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
                    {columnSelection === 'pro' && <th>{column} Pro</th>}
                    {columnSelection === 'res' && <th>{column} Res</th>}
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
    </div>
  );
};

export default SearchForm;*/
import React, { useState } from 'react';
import { Card, Form, DropdownButton, Dropdown, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';
import kpiImage from './kpi.PNG';

const SearchForm = ({ Username }) => {
  const [idfsi] = useState(Username);
  const [annee, setAnnee] = useState("");
  const [mois, setMois] = useState({
    1: false, 2: false, 3: false, 4: false, 5: false, 6: false,
    7: false, 8: false, 9: false, 10: false, 11: false, 12: false,
  });
  const [results, setResults] = useState([]);
  const [technologies, setTechnologies] = useState({
    VDSL: false, SDSL: false, ADSL: false, FTTH: false, 'LS-FO': false,
  });
  const [selectedColumns, setSelectedColumns] = useState({
    KPI3_11: false, KPI2_1: false, KPI2_2: false, KPI2_3: false,
    KPI2_4: false, KPI2_5: false, KPI2_6: false,
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

  const handleChangeAnnee = (value) => {
    setAnnee(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedTechnologies = Object.keys(technologies).filter(
      (tech) => technologies[tech]
    );
    const selectedMois = Object.keys(mois).filter(
      (moi) => mois[moi]
    );

    if (!annee || selectedMois.length === 0 || selectedTechnologies.length === 0) {
      console.error('Veuillez sélectionner une année, au moins un mois et une technologie.');
      return;
    }

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

  const handleReset = () => {
    setMois(Object.fromEntries(Object.keys(mois).map(key => [key, false])));
    setTechnologies(Object.fromEntries(Object.keys(technologies).map(key => [key, false])));
    setSelectedColumns(Object.fromEntries(Object.keys(selectedColumns).map(key => [key, false])));
    setColumnSelection('both');
    setResults([]);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <p></p>
      <Form onSubmit={handleSubmit}>
        <Row>
         
         
      
          <Col>
            <Card style={{ width: '22rem', marginBottom: '20px' }}>
              <Card.Img src={folderImage} alt="Folder Image" style={{ maxHeight: '150px' }} />
              <Card.ImgOverlay>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Card.Title>KPI:</Card.Title>
                  <DropdownButton variant="dark" title="Sélectionner">
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
                  Sélectionnez les KPI à afficher.
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
                  <DropdownButton variant="dark" title="Sélectionner">
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
                  Sélectionnez les technologies à afficher.
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
                  <DropdownButton variant="dark" title="Sélectionner">
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
                  Sélectionnez les mois à afficher.
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
                    {columnSelection === 'pro' && <th>{column} Pro</th>}
                    {columnSelection === 'res' && <th>{column} Res</th>}
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
    </div>
  );
};

export default SearchForm;