import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductCard from './ProductCard';
import './App.css';
import image1 from './download (1).jpg';
import image2 from './download (2).jpg';
import image3 from './images.jpg';
import image4 from './download (3).jpg';

const products = [
  { name: 'Computer', price: 29.99, image: image1 },
  { name: 'Mouse', price: 49.99, image: image2 },
  { name: 'Keyboard', price: 19.99, image: image3 },
  { name: 'Laptop', price: 99.99, image: image4 },
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
