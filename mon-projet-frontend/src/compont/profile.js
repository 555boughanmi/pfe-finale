//changement des cordonées de leur profile
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';



function App({ ID }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:4972/updateAdmin/${ID}`, {
        username,
        password,
        email,
        phoneNumber
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  return (
    <div>
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
  <Card
      bg="dark"
      text="white"
      style={{ width: '35rem' }}
      className="mb-2"
    >
 <Card.Title className="mt-2" >  Mettre à jour mes coordonnées</Card.Title>
 <Card.Body>
    <Form onSubmit={handleSubmit}>

    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

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

  
      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Numéro de téléphone</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Numéro de téléphone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Button variant="warning" type="submit">
        Mettre à jour
      </Button>
    </Form>
  </Card.Body>
    </Card>
</div>
 <div>
    {message && <Alert variant={message.includes('Erreur') ? "danger" : "success"} className="mt-2"> <p>{message}</p></Alert>}

    </div>
    </div>
  );
}

export default App;
