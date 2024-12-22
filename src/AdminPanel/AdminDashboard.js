import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const user = { 
    name: "John Doe", 
    role: "User", 
    pin: "123456", 
    profilePic: "https://via.placeholder.com/40" // Example placeholder image
  };

  const logout = () => {
    console.log("Logging out");
    // Add logout functionality here
  };

  // Unified styles
  const iconStyles = {
    fontSize: '16px', // Icon size
    marginRight: '8px',
    transition: 'color 0.3s ease', // Smooth hover transition for icons
  };

  const linkStyles = {
    fontSize: '14px', // Font size for text
    fontWeight: '500', // Consistent font weight
    color: '#fff', // Default white color
    textDecoration: 'none', // No underline
    transition: 'color 0.3s ease', // Smooth hover transition for text
    marginLeft: '8px',
  };

  const hoverStyles = {
    color: '#ffc107', // Gold hover color for both icons and text
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
                    e.currentTarget.style.color = hoverStyles.color; // Change text color on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color; // Revert text color on hover leave
                  }}
                >
                  <i
                    className="fas fa-user-edit"
                    style={iconStyles}
                  ></i>
                  Update Profile
                </Link>

                {/* Mark Attendance */}
                <Link
                  to="/mark-attendance"
                  className="nav-link d-flex align-items-center"
                  style={{ ...linkStyles, marginLeft: '16px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = hoverStyles.color; // Change both text and icon on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = linkStyles.color; // Revert to default on hover leave
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
                  Leave pending
                </Link>

                {/* View List */}
                <Link
                  to="/leave-approval"
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
                  src={user.profilePic}
                  alt="Profile"
                  style={{ borderRadius: '50%', width: '35px', height: '35px', marginRight: '8px' }}
                />
                <span className="text-light" style={{ fontSize: '14px', fontWeight: '500' }}>
                  {user.name}
                </span>
              </div>
              <Nav>
                <NavDropdown
                  title=""
                  id="nav-dropdown"
                  align="end"
                  className="ms-3"
                >
                  <NavDropdown.Item onClick={logout}>
                    <i className="fas fa-sign-out-alt" style={iconStyles}></i> Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#profile">
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

export default AdminDashboard;
