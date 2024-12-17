import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import SearchClassrooms from './SearchClassrooms';
import ClassList from './ClassList';
import Main from './main';  // Corrected here, component names should start with a capital letter

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />  {/* Corrected to match the component name */}
          <Route path="/search" element={<SearchClassrooms />} />
          <Route path="/classlist" element={<ClassList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
