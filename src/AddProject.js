import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function AddProject() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append('price', price);
    formData.append('name', name);

    try {
      let response = await fetch('http://127.0.0.1:8000/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Redirect if the request is successful
        navigate('/update-project');
      } else {
        // Handle error if the response is not okay
        console.error('Failed to submit project');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Add Project</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block py-3 px-5 rounded-pill shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProject;
