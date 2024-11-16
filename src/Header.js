import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [search, setSearch] = useState('');

  return (
    <header className="header">
      <div className="logo">E-Shop</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button><i className="fas fa-search"></i></button>
      </div>
    </header>
  );
};

export default Header;
