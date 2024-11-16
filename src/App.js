import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductCard from './ProductCard';
import './App.css';

const products = [
  { name: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/150' },
  { name: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/150' },
  { name: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/150' },
  { name: 'Product 4', price: 99.99, image: 'https://via.placeholder.com/150' },
  { name: 'Product 5', price: 39.99, image: 'https://via.placeholder.com/150' },
];

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="product-list">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
