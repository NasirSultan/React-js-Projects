import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';

function UpdateProduct() {
  const { id } = useParams(); // Get the product ID from the URL params
  const navigate = useNavigate(); // To redirect after update

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await fetch(`http://localhost:8000/api/product/${id}`);
        if (!result.ok) {
          throw new Error("Failed to fetch product data");
        }
        const productData = await result.json();
        setName(productData.name);
        setPrice(productData.price);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error fetching product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!name || !price) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/update/${id}?_method=PUT`, {
        method: 'POST', // Use POST since the backend requires _method=PUT in the query
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      } else {
        alert("Product updated successfully!");
        navigate('/');  // Redirect to the homepage or other page after success
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div style={{ width: '70%', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            color: '#fff',
            backgroundColor: '#81C784', // Light green background
            padding: '20px 0',
            marginBottom: '20px',
            marginTop: '20px',
            width: '100%',
            border: '2px solid #4CAF50', // Border with darker green
            borderRadius: '5px', // Rounded corners for the border
            transition: 'background-color 0.3s ease', // Smooth transition on hover
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#66BB6A')} // Darker green on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#81C784')} // Light green back after hover
        >
          Update Product
        </h1>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div style={{ width: '80%', margin: '0 auto' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxSizing: 'border-box',
            }}
          />
          <br />
          <br />
          <input
            type="number" // Changed to number for the price input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxSizing: 'border-box',
            }}
          />
          <br />
          <br />
          <button
            onClick={handleUpdate}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#4CAF50', // Light green background
              color: '#fff',
              border: '2px solid #4CAF50', // Border with the same color as the background
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              boxSizing: 'border-box',
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#388E3C'; // Darker green for hover
              e.target.style.borderColor = '#388E3C'; // Darker green for border
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4CAF50'; // Original light green
              e.target.style.borderColor = '#4CAF50'; // Original border color
            }}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
