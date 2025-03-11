
/*import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import axios from 'axios';

function ListAndUpdateFSI() {
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
      await axios.post('http://localhost:4972/registerfsi', formData);
      console.log('Utilisateur FSI enregistré avec succès !');
      setShowAlert(true); // Afficher l'alerte lorsque l'enregistrement est réussi
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur FSI :', error);
    }
  };
  if (show) {
    return (
      <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Ajoute un FSI</Alert.Heading>
        <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder=" Entrez votre email "  value={formData.email} onChange={handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label> Mot de passe</Form.Label>
                <Form.Control type="password" name="password" placeholder=" Mot de passe" value={formData.password} onChange={handleChange} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Nom d'utilisateur FSI</Form.Label>
              <Form.Control name="username" placeholder="Nom d'utilisateur FSI" value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Numéro de téléphone</Form.Label>
              <Form.Control name="phoneNumber" placeholder="Numéro de téléphone " value={formData.phoneNumber} onChange={handleChange} />
            </Form.Group>

            <Button variant="warning" type="button" onClick={handleRegister}>
            Enregistrer
            </Button>
          </Form>
      </Alert>
    );
  }
  return (
    <Button size="lg" variant="warning" onClick={() => setShow(true)}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
  </svg></Button>

  );
}


  

export default ListAndUpdateFSI;
*/
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios';

function ListAndUpdateFSI() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phoneNumber: ''
  });

  const [show, setShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null); // Gérer l'affichage de l'alerte

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:4972/registerfsi', formData);
      setAlertMessage({ type: 'success', text: 'Utilisateur FSI enregistré avec succès !' });
      setFormData({ username: '', password: '', email: '', phoneNumber: '' }); // Réinitialiser le formulaire
    } catch (error) {
      setAlertMessage({ type: 'danger', text: "Erreur lors de l'enregistrement de l'utilisateur FSI." });
    }
  };

  return (
    <>
      {alertMessage && (
        <Alert variant={alertMessage.type} onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage.text}
        </Alert>
      )}

      {show ? (
        <Alert variant="secondary" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Ajoute un FSI</Alert.Heading>
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
              <Form.Label>Nom d'utilisateur FSI</Form.Label>
              <Form.Control 
                name="username" 
                placeholder="Nom d'utilisateur FSI" 
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
        </Alert>
      ) : (
        <Button size="lg" variant="warning" onClick={() => setShow(true)}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </Button>
      )}
    </>
  );
}

export default ListAndUpdateFSI;
