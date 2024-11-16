import React from 'react';
import './App.css'; // Import the CSS for styling

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h2 className="name">{name}</h2>
      <p className="price">${price}</p>
    </div>
  );
};

export default ProductCard;
