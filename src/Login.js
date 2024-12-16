import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // For redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request body
    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      localStorage.setItem("user-info", JSON.stringify(data));

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      // If login is successful, store user data
      setUser(data.user);
      setError('');
    } catch (err) {
      // Handle any errors
      setError(err.message);
    }
  };

  useEffect(() => {
    // If user data is available, redirect to the /add-project page
    if (user) {
      navigate('/'); // Redirecting to /add-project
    }
  }, [user, navigate]); // Dependency array includes `user` and `navigate`

  return (
    <>
      <Header />
      <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card p-4">
        <div className="card-body">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} className="p-3">
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary form-group mb-4 btn-block py-3 px-5 rounded-pill shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
          {user && (
            <div className="mt-3">
              <h5>Welcome, {user.name}!</h5>
              <p>Email: {user.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Login;
