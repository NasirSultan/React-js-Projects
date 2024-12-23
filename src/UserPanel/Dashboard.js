import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: '',
    role: '',
    pin: '',
    profilePic: ''
  });

  const navigate = useNavigate();

  // Fetch user data from API using Fetch API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/LoginForm'); // Redirect to login if token is missing
    } else {
      fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to fetch user data');
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          navigate('/login'); // Redirect to login on error
        });
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    navigate('/LoginForm'); // Redirect to login page
  };

  // Unified styles
  const iconStyles = {
    fontSize: '16px', // Icon size
    marginRight: '8px',
    transition: 'color 0.3s ease' // Smooth hover transition for icons
  };

  const linkStyles = {
    fontSize: '14px', // Font size for text
    fontWeight: '500', // Consistent font weight
    color: '#fff', // Default white color
    textDecoration: 'none', // No underline
    transition: 'color 0.3s ease', // Smooth hover transition for text
    marginLeft: '8px'
  };

  const hoverStyles = {
    color: '#ffc107' // Gold hover color for both icons and text
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-5 py-3">
      <Container fluid>
        {/* Brand Logo */}
        <Navbar.Brand href="#home" className="mr-auto">
          <i className="fas fa-home" style={iconStyles}></i> User Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Row className="w-100">
            {/* Left Links Section */}
            <Col xs={12} md={8} className="d-flex justify-content-start">
              <Nav className="d-flex align-items-center">
                {/* Update Profile */}
                <Link
                  to="/edit-profile"
                  className="nav-link d-flex align-items-center"
                  style={linkStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverStyles.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color;
                  }}
                >
                  <i className="fas fa-user-edit" style={iconStyles}></i>
                  Update Profile
                </Link>

                {/* Mark Attendance */}
                <Link
                  to="/mark-attendance"
                  className="nav-link d-flex align-items-center"
                  style={{ ...linkStyles, marginLeft: '16px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverStyles.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color;
                  }}
                >
                  <i className="fas fa-calendar-check" style={iconStyles}></i>
                  Mark Attendance
                </Link>

                {/* Leave Request */}
                <Link
                  to="/leave-requset"
                  className="nav-link d-flex align-items-center"
                  style={{ ...linkStyles, marginLeft: '16px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverStyles.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color;
                  }}
                >
                  <i className="fas fa-sign-in-alt" style={iconStyles}></i>
                  Leave Request
                </Link>

                {/* View List */}
                <Link
                  to="/AdminProfile"
                  className="nav-link d-flex align-items-center"
                  style={{ ...linkStyles, marginLeft: '16px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverStyles.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color;
                  }}
                >
                  <i className="fas fa-list" style={iconStyles}></i>
                  View List
                </Link>
              </Nav>
            </Col>

            {/* Right User Dropdown Section */}
            <Col xs={12} md={4} className="d-flex justify-content-end align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={user.profilePic || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  style={{
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    marginRight: '8px'
                  }}
                />
                <span className="text-light" style={{ fontSize: '14px', fontWeight: '500' }}>
                  {user.name || 'Loading...'}
                </span>
              </div>
              <Nav>
                <NavDropdown title="" id="nav-dropdown" align="end" className="ms-3">
                  <NavDropdown.Item onClick={logout}>
                    <i className="fas fa-sign-out-alt" style={iconStyles}></i> Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/Profile">
                    <i className="fas fa-user" style={iconStyles}></i> Profile
                  </NavDropdown.Item>
                
                </NavDropdown>
              </Nav>
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Dashboard;
