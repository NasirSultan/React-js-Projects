import React, { useState, useEffect } from 'react';  // Import useEffect here
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // State for loading indicator
  const [message, setMessage] = useState("");  // State for displaying messages
  const navigate = useNavigate();  // useNavigate instead of useHistory

  // useEffect to check if user is already logged in (based on localStorage)
  useEffect(() => {
    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      navigate('/add-project'); // Redirect to 'add-project' if user is already logged in
    }
  }, [navigate]); // Empty dependency array ensures this runs only once after the component mounts

  async function signup() {
    setIsLoading(true);  // Set loading to true when API call starts
    let item = { name, password, email };
    try {
      let result = await fetch("http://127.0.0.1:8000/api/name", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(item)
      });

      // Handle response
      result = await result.json();
      console.warn("result", result);

      // Save user info to local storage and navigate
      localStorage.setItem("user-info", JSON.stringify(result));

      // Set success message and redirect
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate('/add-project');  // Redirect using useNavigate
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      setMessage("Registration failed! Please try again.");
    } finally {
      setIsLoading(false);  // Set loading to false once the API call finishes
    }
  }

  return (
    <>
      <Header />
    
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center mb-4">User Sign Up</h1>
                {message && <div className="alert alert-info">{message}</div>} {/* Display message */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={signup}  // Call signup function
                  disabled={isLoading}  // Disable button during loading
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
