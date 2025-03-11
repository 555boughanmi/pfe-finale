// ExampleCarouselImage.js
import React from 'react';
import folderImage from './122.png'; // Importez votre image locale

const ExampleCarouselImage = ({ text }) => {
  return (
    <img src={folderImage} alt="téléchargeur"  style={{ width: '1520px', height: '500px' }} /> // Utilisez l'URL importée de votre image locale
  );
};

export default ExampleCarouselImage;

