import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
const Gestionad = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4972/listinsc')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []);

  const handleEdit = (id) => {
    axios.put(`http://localhost:4972/accepter/${id}`)
    .then(response => {
      console.log('Utilisateur accepter avec succès');
      // Mettre à jour la liste des données après la suppression
      setData(data.filter(item => item.id !== id));
    })
    .catch(error => {
      console.error('Erreur lors de la acceptation de l\'utilisateur :', error);
    });
  };

 

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4972/deleteinsc/${id}`)
      .then(response => {
        console.log('Utilisateur supprimé avec succès');
        // Mettre à jour la liste des données après la suppression
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      });
  };

  return (
    <div>
<h1>Liste des demandes des administrateurs</h1>
<Table striped bordered hover variant="dark">
        <thead>
          <tr>
          <th>Nom d'utilisateur</th>
          <th>Email</th>
          <th>Numéro de téléphone</th>
          <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <Button  style={{  backgroundColor: '#f7b707', borderColor: '#f7b707' , marginRight: '20px', marginLeft: "20px" }}   onClick={() => handleEdit(item.id)}><svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="black" className="bi bi-person-fill-check" viewBox="0 0 16 16">
        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
      </svg></Button>
                <Button style={{ backgroundColor: '#e05504', borderColor: '#e05504' }}  onClick={() => handleDelete(item.id)}> <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" fill="black" className="bi bi-person-fill-slash" viewBox="0 0 16 16">
        <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
      </svg></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
     
    </div>
  );
};

export default Gestionad;
