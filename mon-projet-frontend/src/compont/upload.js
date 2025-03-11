
import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Form, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouseLImage';
import Toast from 'react-bootstrap/Toast';

const Upload = ({ Username }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [message2, setMessage2] = useState('');
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [message3, setMessage3] = useState('');
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [message4, setMessage4] = useState('');

  const { getRootProps: getRootProps1, getInputProps: getInputProps1 } = useDropzone({
    onDrop: (acceptedFiles) => setSelectedFile(acceptedFiles[0]),
  });
  const { getRootProps: getRootProps2, getInputProps: getInputProps2 } = useDropzone({
    onDrop: (acceptedFiles) => setSelectedFile2(acceptedFiles[0]),
  });
  const { getRootProps: getRootProps3, getInputProps: getInputProps3 } = useDropzone({
    onDrop: (acceptedFiles) => setSelectedFile3(acceptedFiles[0]),
  });
  const { getRootProps: getRootProps4, getInputProps: getInputProps4 } = useDropzone({
    onDrop: (acceptedFiles) => setSelectedFile4(acceptedFiles[0]),
  });

  const uploadFile = async () => {
    if (!selectedFile) {
      setMessage('Veuillez sélectionner un fichier.');
      return;
    }
    const formData = new FormData();
    formData.append('excelFile', selectedFile);
    formData.append('username', Username);
    try {
      const response = await axios.post('http://localhost:4972/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setMessage('Fichier téléchargé avec succès!');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      setMessage('Erreur lors du téléchargement du fichier. Veuillez réessayer.');
    }
  };

  const uploadFile2 = async () => {
    if (!selectedFile2) {
      setMessage2('Veuillez sélectionner un fichier.');
      return;
    }
    const formData = new FormData();
    formData.append('excelFile', selectedFile2);
    formData.append('username', Username);
    try {
      const response = await axios.post('http://localhost:4972/upload2', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setMessage2('Fichier téléchargé avec succès!');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      setMessage2('Erreur lors du téléchargement du fichier. Veuillez réessayer.');
    }
  };

  const uploadFile3 = async () => {
    if (!selectedFile3) {
      setMessage3('Veuillez sélectionner un fichier.');
      return;
    }
    const formData = new FormData();
    formData.append('excelFile', selectedFile3);
    formData.append('username', Username);
    try {
      const response = await axios.post('http://localhost:4972/upload3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setMessage3('Fichier téléchargé avec succès!');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      setMessage3('Erreur lors du téléchargement du fichier. Veuillez réessayer.');
    }
  };

  const uploadFile4 = async () => {
    if (!selectedFile4) {
      setMessage4('Veuillez sélectionner un fichier.');
      return;
    }
    const formData = new FormData();
    formData.append('excelFile', selectedFile4);
    formData.append('username', Username);
    try {
      const response = await axios.post('http://localhost:4972/upload4', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      setMessage4('Fichier téléchargé avec succès!');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      setMessage4('Erreur lors du téléchargement du fichier. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h1>Téléchargeur de fichiers Excel WF TT</h1>
            <div className="dropzone1" {...getRootProps1()}>
              <Form.Control {...getInputProps1()} />
              <p>Faites glisser et déposez le fichier Excel ici, ou cliquez pour sélectionner un fichier WF TT</p>
            </div>
            {selectedFile && <p>Fichier sélectionné : {selectedFile.name}</p>}
            {message && <p>{message}</p>}
            <Button variant="dark" size="lg" onClick={uploadFile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-cloud-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              {'  '} Télécharger
            </Button>{' '}
            <p> </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h1>Téléchargeur de fichiers Excel CRM</h1>
            <div className="dropzone2" {...getRootProps2()}>
              <Form.Control {...getInputProps2()} />
              <p>Faites glisser et déposez le fichier Excel ici, ou cliquez pour sélectionner un fichier CRM</p>
            </div>
            {selectedFile2 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Toast onClose={() => setSelectedFile2(null)}>
                  <Toast.Header>Fichier sélectionné :</Toast.Header>
                  <Toast.Body className={'Dark' && 'text-white'}>{selectedFile2.name}</Toast.Body>
                </Toast>
              </div>
            )}
            {message2 && <p>{message2}</p>}
            <Button variant="dark" size="lg" onClick={uploadFile2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-cloud-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              {'  '} Télécharger
            </Button>{' '}
            <p> </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h1>Téléchargeur de fichiers Excel Dimelo</h1>
            <div className="dropzone3" {...getRootProps3()}>
              <Form.Control {...getInputProps3()} />
              <p>Faites glisser et déposez le fichier Excel ici, ou cliquez pour sélectionner un fichier Dimelo</p>
            </div>
            {selectedFile3 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Toast onClose={() => setSelectedFile3(null)}>
                  <Toast.Header>Fichier sélectionné :</Toast.Header>
                  <Toast.Body className={'Dark' && 'text-white'}>{selectedFile3.name}</Toast.Body>
                </Toast>
              </div>
            )}
            {message3 && <p>{message3}</p>}
            <Button variant="dark" size="lg" onClick={uploadFile3}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-cloud-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              {'  '} Télécharger
            </Button>{' '}
            <p> </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
          <Carousel.Caption>
            <h1>Téléchargeur de fichiers Excel CUIC</h1>
            <div className="dropzone4" {...getRootProps4()}>
              <Form.Control {...getInputProps4()} />
              <p>Faites glisser et déposez le fichier Excel ici, ou cliquez pour sélectionner un fichier CUIC</p>
            </div>
            {selectedFile4 && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Toast onClose={() => setSelectedFile4(null)}>
                  <Toast.Header>Fichier sélectionné :</Toast.Header>
                  <Toast.Body className={'Dark' && 'text-white'}>{selectedFile4.name}</Toast.Body>
                </Toast>
              </div>
            )}
            {message4 && <p>{message4}</p>}
            <Button variant="dark" size="lg" onClick={uploadFile4}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-cloud-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              {'  '} Télécharger
            </Button>{' '}
            <p> </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Upload;