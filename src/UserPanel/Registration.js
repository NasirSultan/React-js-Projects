import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false); // Track registration success
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'user'); // Set default role as 'user'
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Registration successful:', result);
        setIsRegistered(true); // Mark as registered
      } else {
        setErrors(result.errors || {}); // Handle validation errors
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  useEffect(() => {
    if (isRegistered) {
      navigate('/edit-profile'); // Redirect to the profile page
    }
  }, [isRegistered, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-header bg-primary text-white text-center">
          <h2 className="card-title mb-0">
            <i className="fas fa-user-check"></i> Attendance System
          </h2>
        </div>
        <div className="card-body">
          <h4 className="text-center mb-4">Register</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>

            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            <div className="form-group mb-4">
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
              />
              {errors.profile_picture && <div className="text-danger">{errors.profile_picture}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Register
            </button>
          </form>

          <div className="text-center mt-3">
            <p>Already have an account?</p>
            <Link to="/LoginForm" className="btn btn-link">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
