
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';

function ListAndUpdateAdmin() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  const [showAlert, setShowAlert] = useState(false); // État pour contrôler l'affichage de l'alerte
  const [showForm, setShowForm] = useState(false); // État pour contrôler l'affichage du formulaire
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:4972/registerinsc', formData);
      console.log('Administrateur enregistré avec succès !');
      setShowAlert(true); // Afficher l'alerte lorsque l'enregistrement est réussi
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'administrateur :', error);
    }
  };

  if (show) {
    return (
      <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Ajouter un administrateur</Alert.Heading>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridUsername">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              name="username"
              placeholder="Nom d'utilisateur"
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

          <Button variant="primary" type="button" onClick={handleRegister}>
            Enregistrer
          </Button>
        </Form>
      </Alert>
    );
  }

  return (
    <Button variant="link" onClick={() => setShow(true)}>Créer un compte</Button>
  );
}

export default ListAndUpdateAdmin;

