import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header'; // Import the Header component

function SearchProduct() {
  const [data, setData] = useState([]);
  const location = useLocation();

  // Get the search query from the URL
  const searchQuery = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Fetch products based on the search query
    async function fetchProducts() {
      let url = 'http://localhost:8000/api/products';
      if (searchQuery) {
        url = `http://localhost:8000/api/search/${searchQuery}`;
      }

      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    }

    fetchProducts();
  }, [searchQuery]); // Trigger effect when searchQuery changes

  return (
    <div>
      {/* Include the Header component */}
      <Header />

      {/* Header Section with light brown background and centered text */}
      <header
        style={{
          backgroundColor: '#D2B48C', // Light brown color
          padding: '20px 0',
          textAlign: 'center',
          width: '80%', // Apply 80% width
         
          margin: '20px auto 20px auto', // Add top margin and bottom margin
          borderRadius: '10px', // Center the header
        }}
      >
        <h1 style={{ margin: '0', color: '#fff' }}>Search Results</h1>
      </header>

      {/* Main Content Area with 80% width and centered */}
      <div style={{ width: '70%', margin: '0 auto' }}>
        {data.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Updated At</th>
                
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-light">
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
