import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  // Get user information from localStorage
  const user = JSON.parse(localStorage.getItem('user-info'));

  // Logout function
  function logout() {
    localStorage.clear();
    navigate('/register'); // Redirect to register page after logout
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Ecomm Dashboard</Navbar.Brand>
      <Nav className="mr-auto nav_bar_wrapper">
        {/* Check if user is logged in */}
        {localStorage.getItem('user-info') ? (
          <>
           <Link to="/" className="nav-link">
               Product List
            </Link>
            <Link to="/add-project" className="nav-link">
              Add Product
            </Link>
            <Link to="/update-project" className="nav-link">
              Update Product
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </Nav>

      {/* Dropdown for logged-in user */}
      {user ? (
        <Nav>
          <NavDropdown title={user && user.name} id="nav-dropdown">
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      ) : null}
    </Navbar>
  );
}

export default Header;
