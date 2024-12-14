import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Header from './Header';

function ProductList() {
  const [data, setData] = useState([]);

  // Fetch the product list when the component mounts
  useEffect(() => {
    fetchProductList();
  }, []); // Empty dependency array ensures it runs only once

  // Fetch product list from API
  const fetchProductList = async () => {
    let result = await fetch("http://localhost:8000/api/list");
    result = await result.json();
    setData(result);
    console.warn("Fetched data:", result); // Logs the fetched data
  };

  // Delete product handler
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:8000/api/delete/${id}`, {
      method: "DELETE",
    });
    fetchProductList(); // Re-fetch product list after deletion
  };

  return (
    <div>
      <Header />
      <h1 className="text-center mb-4 text-blue-500 bg-blue-100 rounded-lg p-4 w-[70%] mx-auto mt-6 hover:text-white">Product List</h1>

      <div className="d-flex justify-content-center">
        <Table striped bordered hover className="text-center w-75">
          <thead className="bg-primary text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="bg-light">
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td>{new Date(item.updated_at).toLocaleString()}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      onClick={() => deleteProduct(item.id)} // Delete product on button click
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProductList;
