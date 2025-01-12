import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError(''); // Reset error message

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed, please check your credentials');
      }

      const data = await response.json(); // Parse the JSON response
      console.log('Login successful:', data);

      if (data.token) {
        // Store the token in localStorage for future use
        localStorage.setItem('token', data.token);

        // Redirect based on the user role
        if (data.user.role === 'user') {
          window.location.href = '/Profile'; // Redirect to edit profile if role is user
        } else if (data.user.role === 'admin') {
          window.location.href = '/AdminProfile'; // Redirect to admin dashboard if role is admin
        }

        alert('Login successful!');
      } else {
        alert('Login failed! Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      alert(`Error: ${err.message || 'An error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="card-header bg-primary text-white text-center">
          <h2 className="card-title mb-0">
            <i className="fas fa-sign-in-alt"></i> Attendance System
          </h2>
        </div>
        <div className="card-body">
          <h4 className="text-center mb-4">Login</h4>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="mb-1">Don't have an account?</p>
            <Link to="/" className="btn btn-link">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
