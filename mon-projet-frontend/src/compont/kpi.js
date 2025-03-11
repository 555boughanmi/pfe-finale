

/*
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, DropdownButton, Dropdown, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';
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
    setAnnee(value);
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
    setResults([]);
    setError(null);
  }, [technologies, selectedColumns]);

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
                        label={user.id}
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
            <Button type="submit" variant="warning">Rechercher</Button>
            <Button variant="secondary" onClick={handleReset}>Réinitialiser</Button>
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
                <tr key={`${row.idfsi}-${row.Mois}-${row.Technologie}-${index}`}>
                  <td>{row.idfsi}</td>
                  <td>{row.Mois}</td>
                  <td>{row.Technologie}</td>
                  {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                    <React.Fragment key={column}>
                      {columnSelection === 'both' && ( <> <td>{row[column + "_Pro"]}</td>   <td>{row[column + "_Res"]}</td> </>)}
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
*/
/*
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, DropdownButton, Dropdown, Row, Col, Button, Table } from 'react-bootstrap';
import folderImage from './fsi.PNG';
import axios from 'axios';
import { Statistic, Progress } from 'antd';
import Chart from 'react-apexcharts';

const Dashboard = () => {
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
  const [users, setUsers] = useState([]);
  const [columnSelection, setColumnSelection] = useState('both'); // 'pro', 'res', 'both'
  const [error, setError] = useState(null); // Pour afficher les erreurs

  // Données pour les graphiques
  const [barChartSeries, setBarChartSeries] = useState([{ name: 'Ventes', data: [] }]);
  const [lineChartSeries, setLineChartSeries] = useState([{ name: 'Utilisateurs', data: [] }]);

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
    setAnnee(value);
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

        // Mettre à jour les données pour les graphiques
        const salesData = response.data.map((row) => row.sales);
        const usersData = response.data.map((row) => row.users);

        setBarChartSeries([{ name: 'Ventes', data: salesData }]);
        setLineChartSeries([{ name: 'Utilisateurs', data: usersData }]);

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
    setResults([]);
    setError(null);
  }, [technologies, selectedColumns]);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px', color: '#FFA500' }}>Tableau de bord</h1>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Utilisateurs"
              value={1128}
              valueStyle={{ color: '#FFA500' }} // Orange
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Ventes"
              value={9324}
              valueStyle={{ color: '#FFD700' }} // Jaune
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Performances"
              value={98}
              valueStyle={{ color: '#FF8C00' }} // Orange foncé
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <h3>Taux de conversion</h3>
            <Progress
              type="circle"
              percent={75}
              strokeColor="#FFA500" // Orange
              format={(percent) => `${percent}%`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <h3>Taux de rétention</h3>
            <Progress
              type="circle"
              percent={85}
              strokeColor="#FFD700" // Jaune
              format={(percent) => `${percent}%`}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <h3>Taux de satisfaction</h3>
            <Progress
              type="circle"
              percent={90}
              strokeColor="#FF8C00" // Orange foncé
              format={(percent) => `${percent}%`}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginBottom: '24px' }}>
        <h2>Ventes mensuelles</h2>
        <Chart
          options={{
            chart: {
              type: 'bar',
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
              },
            },
            colors: ['#FFA500', '#FFD700'], // Couleurs orange et jaune
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent'],
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            },
            yaxis: {
              title: {
                text: 'Ventes ($)',
              },
            },
            fill: {
              opacity: 1,
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return '$ ' + val + ' thousands';
                },
              },
            },
          }}
          series={barChartSeries}
          type="bar"
          height={350}
        />
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <h2>Utilisateurs actifs</h2>
        <Chart
          options={{
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false,
              },
            },
            colors: ['#FFA500', '#FFD700'], // Couleurs orange et jaune
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: 'straight',
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            },
            yaxis: {
              title: {
                text: 'Utilisateurs',
              },
            },
          }}
          series={lineChartSeries}
          type="line"
          height={350}
        />
      </Card>

      <Card>
        <h2>Détails des ventes</h2>
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
              <tr key={`${row.idfsi}-${row.Mois}-${row.Technologie}-${index}`}>
                <td>{row.idfsi}</td>
                <td>{row.Mois}</td>
                <td>{row.Technologie}</td>
                {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                  <React.Fragment key={column}>
                    {columnSelection === 'both' && ( <> <td>{row[column + "_Pro"]}</td>   <td>{row[column + "_Res"]}</td> </>)}
                    {columnSelection === 'pro' && <td>{row[column + "_Pro"]}</td>}
                    {columnSelection === 'res' && <td>{row[column + "_Res"]}</td>}
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

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
                        label={user.id}
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
            <Button type="submit" variant="warning">Rechercher</Button>
            <Button variant="secondary" onClick={handleReset}>Réinitialiser</Button>
          </Col>
          <Col>
            <Col className="text-end" sm="10">
              <Button variant={columnSelection === 'pro' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('pro')}>mmmPro</Button>
              <Button variant={columnSelection === 'res' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('res')}>Res</Button>
              <Button variant={columnSelection === 'both' ? 'warning' : 'secondary'} onClick={() => handleColumnSelection('both')}>lllllLes deux</Button>
            </Col>
          </Col>
        </Row>
      </Form>

      {error && <div className="text-danger mb-3">{error}</div>}
    </div>
  );
};

export default Dashboard;*/
import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, DropdownButton, Dropdown, Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import axios from 'axios';
import folderImage from './fsi.PNG';

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
  const [users, setUsers] = useState([]);
  const [columnSelection, setColumnSelection] = useState('both'); // 'pro', 'res', 'both'
  const [error, setError] = useState(null); // Pour afficher les erreurs
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calcul des données à afficher pour la page actuelle
  const paginatedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    setAnnee(value);
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
        setCurrentPage(1); // Réinitialiser la page à 1 après une nouvelle recherche
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
    setResults([]);
    setError(null);
    setCurrentPage(1); // Réinitialiser la page à 1
  }, [technologies, selectedColumns]);

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
                        label={user.id}
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
            <Button type="submit" variant="warning">Rechercher</Button>
            <Button variant="secondary" onClick={handleReset}>Réinitialiser</Button>
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

      {error && <div className="text-danger mb-3">{error}</div>}

      {results.length > 0 && (
        <div>
          <p></p>
          <Card >

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
              {paginatedResults.map((row, index) => (
                <tr key={`${row.idfsi}-${row.Mois}-${row.Technologie}-${index}`}>
                  <td>{row.idfsi}</td>
                  <td>{row.Mois}</td>
                  <td>{row.Technologie}</td>
                  {Object.keys(selectedColumns).filter((column) => selectedColumns[column]).map((column) => (
                    <React.Fragment key={column}>
                      {columnSelection === 'both' && ( <> <td>{row[column + "_Pro"]}</td>   <td>{row[column + "_Res"]}</td> </>)}
                      {columnSelection === 'pro' && <td>{row[column + "_Pro"]}</td>}
                      {columnSelection === 'res' && <td>{row[column + "_Res"]}</td>}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
  {[...Array(Math.ceil(results.length / itemsPerPage)).keys()].map((page) => (
    <Pagination.Item
      key={page + 1}
      active={page + 1 === currentPage}
      onClick={() => setCurrentPage(page + 1)}
      style={{
        backgroundColor: page + 1 === currentPage ? 'black' : 'black', // Noir pour tous les boutons
        color: page + 1 === currentPage ? 'white' : '#bbb', // Blanc pour l'actif, gris clair pour les autres
        borderColor: 'black', // Bordure noire pour tous
        margin: '2px',
      }}
    >
      {page + 1}
    </Pagination.Item>
  ))}
</Pagination>


          </Card >

        </div>
      )}
    </div>
  );
};

export default SearchForm;