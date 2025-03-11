
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Register from './registre';
import Kpif from './kpif';

function ListAndUpdateFSI() {
  const [users, setUsers] = useState([]);
  const [id, setIdToUpdate] = useState('');
  //const [idfsi, setIdfsi] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: ''
  });
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4972/listfsi');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la liste des utilisateurs FSI :', error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [showContent, setShowContent] = useState('');

  const handleButtonClick = (content) => {
    setShowContent(content);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4972/deletefsi/${id}`);
      console.log('Utilisateur FSI supprimé avec succès !');
      // Actualiser la liste après la suppression
      const response = await axios.get('http://localhost:4972/listfsi');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur FSI :', error);
    }
  };
 
  const handleUpdate = async () => {
    if (!id) {
      alert("Veuillez sélectionner un utilisateur à mettre à jour.");
      return;
    }
  
    if (!formData.username || !formData.email || !formData.phoneNumber) {
      alert("Tous les champs doivent être remplis !");
      return;
    }
  
    try {
      await axios.put(`http://localhost:4972/updatefsi/${id}`, formData);
  
      alert("Utilisateur FSI mis à jour avec succès !");
      
      // Actualisation de la liste des utilisateurs
      const response = await axios.get("http://localhost:4972/listfsi");
      setUsers(response.data);
  
      // Réinitialisation du formulaire et fermeture du modal
      setIdToUpdate('');
      setFormData({ username: '', email: '', phoneNumber: '' });
      setShow(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur FSI :", error);
      alert("Erreur lors de la mise à jour de l'utilisateur FSI");
    }
  };
  
 
  return (
    <div>
      <p></p>
      <div className="d-flex justify-content-center align-items-center vh-75">
        <Register />
      </div>
      <p></p>
      <div>
        {users.reduce((acc, user, index) => {
          if (index % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(user);
          return acc;
        }, []).map((group, groupIndex) => (
          <Row key={groupIndex}>
            {group.map((user) => (
              <Col className="d-flex justify-content-center" key={user.id} md={4}>
                <Card bg="dark" text="white" style={{ width: '22rem', marginBottom: '20px' }}>
                  <Card.Body>
                    
                    <div>
                      <strong>Nom d'utilisateur:</strong> {user.username}
                    </div>
                    <div>
                      <strong>Email:</strong> {user.email}
                    </div>
                    <div>
                      <strong>Numéro de téléphone:</strong> {user.phoneNumber}
                    </div>
                    <Button size="sm" variant="warning"  onClick={() => handleDelete(user.id)} style={{ marginRight: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </Button>

                    <Button size="sm" variant="warning" onClick={() => {
                      setIdToUpdate(user.id);
                      setFormData({
                        username: user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber
                      });
                      setShow(true);
                    }} style={{ marginRight: '10px' }} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                      </svg>
                    </Button>

                    <Button size="sm" variant="warning"  onClick={() => handleButtonClick('content')}  >
                         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16">
                         <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                         <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
                         </svg> 
                    </Button>
                  </Card.Body>
                  </Card>
                  {id === user.id && (
                    <Alert variant="secondary" show={show} onClose={() => setShow(false)} dismissible>
                      <Form>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Entrez votre email" name="email" value={formData.email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAddress1">
                          <Form.Label>Nom d'utilisateur FSI</Form.Label>
                          <Form.Control type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAddress2">
                          <Form.Label>Numéro de téléphone</Form.Label>
                          <Form.Control type="text" placeholder=">Numéro de téléphone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </Form.Group>
                        <p></p>
                        <Button variant="warning" type="button" onClick={() => handleUpdate(user.id)}>Enregistrer</Button>
                      </Form>
                    </Alert>
                  )}
                
              </Col>
            ))}
          </Row>
        ))}
      </div>
      {showContent === 'content' && <Kpif />}
    </div>
  );
}

export default ListAndUpdateFSI;
