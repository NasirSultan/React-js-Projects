import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
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

  // Define colors for different icons
  const iconStyles = {
    store: { color: '#FF6347', marginRight: '5px' },
    box: { color: '#1E90FF', marginRight: '5px' },
    addProduct: { color: '#32CD32', marginRight: '5px' },
    signIn: { color: '#FFD700', marginRight: '5px' },
    userPlus: { color: '#8A2BE2', marginRight: '5px' },
    signOut: { color: '#FF4500', marginRight: '5px' },
    profile: { color: '#8B0000', marginRight: '5px' },
    user: { color: '#2E8B57', marginRight: '5px' }
  };

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search
  function handleSearch(event) {
    event.preventDefault(); // Prevent the page from reloading
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`); // Redirect to /search with the query parameter
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-5 py-3">
      <Container fluid className="d-flex justify-content-between">
        {/* Brand Logo */}
        <Navbar.Brand href="#home" className="mr-auto">
          <i className="fas fa-store" style={iconStyles.store}></i> Ecomm Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ml-auto navbar-nav d-flex w-100 justify-content-between align-items-center">
            {/* Search Form */}
            <div className="d-flex w-75">
              <Form className="d-flex w-100" onSubmit={handleSearch}>
                <InputGroup className="w-100">
                  <InputGroup.Text style={{ marginLeft: '20px' }}>
                    <i className="fas fa-search" style={{ color: '#888' }}></i>
                  </InputGroup.Text>
                  <FormControl
                    type="search"
                    placeholder="Search products"
                    aria-label="Search"
                    className="me-2 form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
                <Button variant="outline-success" type="submit">Search</Button>
              </Form>
            </div>

            {/* Navbar Links */}
            <Nav className="ml-auto d-flex align-items-center w-100">
              {user ? (
                <>
                  <Link
                    to="/"
                    className="nav-link text-light hover-effect d-flex align-items-center"
                    style={{ width: '150px', margin: '0', paddingLeft: '20px', marginLeft: '200px' }} // Added left padding and margin to Product List
                  >
                    <i className="fas fa-box-open" style={iconStyles.box}></i> Product List
                  </Link>
                  <Link
                    to="/add-project"
                    className="nav-link text-light hover-effect d-flex align-items-center"
                    style={{ width: '150px', margin: '0' }} // No padding/margin adjustment for Add Product
                  >
                    <i className="fas fa-plus-circle" style={iconStyles.addProduct}></i> Add Product
                  </Link>
                </>
              ) : (
                <>
                 <div className="ml-auto d-flex align-items-center w-100 navbar-nav">
  <div className="d-flex" style={{ marginLeft: '200px' }}>
    <Link to="/login" className="nav-link mx-3 text-light hover-effect d-flex align-items-center">
      <i className="fas fa-sign-in-alt" style={{ color: 'rgb(255, 215, 0)', marginRight: '5px' }}></i> Login
    </Link>
    <Link to="/register" className="nav-link mx-3 text-light hover-effect d-flex align-items-center">
      <i className="fas fa-user-plus" style={{ color: 'rgb(138, 43, 226)', marginRight: '5px' }}></i> Register
    </Link>
  </div>
</div>

                </>
              )}
            </Nav>

            {/* Dropdown for logged-in user */}
            {user && (
              <Nav>
                <NavDropdown
                  title={<><i className="fas fa-user" style={iconStyles.user}></i> {user.name}</>}
                  id="nav-dropdown"
                  align="end"
                >
                  <NavDropdown.Item onClick={logout}>
                    <i className="fas fa-sign-out-alt" style={iconStyles.signOut}></i> Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#profile">
                    <i className="fas fa-user" style={iconStyles.profile}></i> Profile
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
