import React from 'react';
import './ProductCard.css';

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <div className="product-details">
        <h3>{name}</h3>
        <p>${price}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
