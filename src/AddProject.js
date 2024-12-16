import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function AddProject() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
        // Show success message and redirect after a short delay
        setSuccessMessage('Project added successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 2000); // Hide message after 2 seconds
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
      <div className="d-flex justify-content-center min-vh-100" style={{ backgroundColor: '#f0f0f0' }}>
        <div
          className="card p-4"
          style={{
            width: '50%',
            maxWidth: '700px',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            marginTop: '5%',
            marginBottom: '5%',
          }}
        >
          <div className="card-body">
            <h5
              className="text-center mb-4 text-blue-500 bg-blue-100 rounded-lg p-4 w-full mx-auto mt-6 pb-4 hover:text-white"
            >
              Add Project
            </h5>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Project Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ borderRadius: '10px' }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block py-3 px-5 rounded-pill shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-full"
                style={{
                  backgroundColor: '#007bff',
                  borderColor: '#007bff',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                }}
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
