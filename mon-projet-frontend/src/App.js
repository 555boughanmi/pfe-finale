
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
