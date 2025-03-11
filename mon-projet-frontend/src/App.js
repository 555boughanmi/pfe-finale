/*
import React, { useState, useEffect } from 'react';
import { Button, Form, Navbar, InputGroup, Row, Col, Card, Alert } from 'react-bootstrap';

import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Nav1 from './compont/nav1';
import Nav2 from './compont/nav2';
import Nav3 from './compont/nav3';
import folderImage from './inscreption.png'; // 

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [type, setType] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  // Charger les données du localStorage au chargement de la page
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUserId(localStorage.getItem('userId'));
      setUsername(localStorage.getItem('username'));
      setType(localStorage.getItem('type'));
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:4972/registerinsc', formData);
      console.log('Administrateur enregistré avec succès !');
      setMessage('Inscription réussie !');
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      setMessage('Erreur lors de l\'inscription.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4972/loginadministrateur', { email, password });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.Id);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('type', response.data.type);

        setUsername(response.data.username);
        setUserId(response.data.Id);
        setType(response.data.type);
        setIsLoggedIn(true);
      } else {
        setMessage('Réponse invalide du serveur');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setUserId(null);
    setType('');
  };

  return (
    <div >
      {!isLoggedIn ? (
        <div>
          
          <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary justify-content-between">
    <hr />
    <Form inline>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="warning" onClick={handleLogin}>
            Connexion
          </Button>
        </Col>
      </Row>
    </Form>
  </Navbar>
         
                    {message &&  <Alert variant="warning"> {message}</Alert>}

                    <div style={{ marginTop: "15vh", marginLeft: "60px" }}> 
                    <Row>
      <Col md={4}>
        <Card bg="dark" data-bs-theme="dark" className="mb-3">
          <Card.Body>
            <Card.Title>Inscription</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group className="mb-3" controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Entrez votre email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridUsername">
                  <Form.Label>Nom d’utilisateur</Form.Label>
                  <Form.Control
                    name="username"
                    placeholder="Nom d’utilisateur"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridPhoneNumber">
                  <Form.Label>Numéro de téléphone</Form.Label>
                  <Form.Control
                    name="phoneNumber"
                    placeholder="Numéro de téléphone"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="warning" type="button" onClick={handleRegister}>
                  Enregistrer
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={5}>
      <div style={{ marginLeft: "85px" }}> 

      <img src={folderImage} alt="" style={{ width: '800px', height: '510px' }} />
      </div>
      </Col>
    </Row>
          </div>
          
        </div>
      ) : (
        <div>
          <BrowserRouter>
            {type === 'admin' && <Nav1 userId={userId} handleLogout={handleLogout} />}
            {type === 'FSI' && <Nav2 username={username} userId={userId} handleLogout={handleLogout} />}
            {type === 'sous-admin' && <Nav3 userId={userId} handleLogout={handleLogout} />}
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;

*/
import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table } from 'antd';
import Chart from 'react-apexcharts';

// Données pour les graphiques
const barChartOptions = {
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
};

const barChartSeries = [
  {
    name: 'Ventes',
    data: [65, 59, 80, 81, 56, 55],
  },
];

const lineChartOptions = {
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
};

const lineChartSeries = [
  {
    name: 'Utilisateurs',
    data: [30, 40, 45, 50, 49, 60],
  },
];

// Données pour le tableau
const dataSource = [
  {
    key: '1',
    month: 'Janvier',
    sales: 65,
    users: 30,
    conversion: '75%',
  },
  {
    key: '2',
    month: 'Février',
    sales: 59,
    users: 40,
    conversion: '85%',
  },
  {
    key: '3',
    month: 'Mars',
    sales: 80,
    users: 45,
    conversion: '90%',
  },
  {
    key: '4',
    month: 'Avril',
    sales: 81,
    users: 50,
    conversion: '92%',
  },
  {
    key: '5',
    month: 'Mai',
    sales: 56,
    users: 49,
    conversion: '88%',
  },
  {
    key: '6',
    month: 'Juin',
    sales: 55,
    users: 60,
    conversion: '95%',
  },
];

// Colonnes du tableau
const columns = [
  {
    title: 'Mois',
    dataIndex: 'month',
    key: 'month',
    render: (text) => <span style={{ color: '#FFA500' }}>{text}</span>, // Texte orange
  },
  {
    title: 'Ventes ($)',
    dataIndex: 'sales',
    key: 'sales',
    render: (text) => <span style={{ color: '#FFD700' }}>{text}</span>, // Texte jaune
  },
  {
    title: 'Utilisateurs',
    dataIndex: 'users',
    key: 'users',
    render: (text) => <span style={{ color: '#FF8C00' }}>{text}</span>, // Texte orange foncé
  },
  {
    title: 'Taux de conversion',
    dataIndex: 'conversion',
    key: 'conversion',
    render: (text) => <span style={{ color: '#FFA500' }}>{text}</span>, // Texte orange
  },
];

const Dashboard = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>Tableau de bord</h1>

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
          options={barChartOptions}
          series={barChartSeries}
          type="bar"
          height={350}
        />
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <h2>Utilisateurs actifs</h2>
        <Chart
          options={lineChartOptions}
          series={lineChartSeries}
          type="line"
          height={350}
        />
      </Card>

      <Card>
        <h2>Détails des ventes</h2>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
