import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // State for profile picture
  const [name, setName] = useState(null); // State for name
  const [email, setEmail] = useState(null); // State for email
  const [alertMessage, setAlertMessage] = useState(''); // State for alert messages
  const [alertType, setAlertType] = useState(''); // State for alert type (success or danger)
  const token = localStorage.getItem('token'); // Get token from localStorage
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    if (token) {
      // Fetch user data from API
      fetch('http://127.0.0.1:8000/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Set user data in state
          setName(data.name);
          setEmail(data.email);

          // Assuming the profile picture URL is returned in the API response
          if (data.user.profile_picture) {
            // Adjust this URL based on how your server serves images
            setProfilePic(`http://127.0.0.1:8000/${data.user.profile_picture}`);
          }

          // Show success alert
          setAlertMessage('Profile fetched successfully.');
          setAlertType('success');
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          // Show error alert
          setAlertMessage('Error fetching profile details.');
          setAlertType('danger');
        });
    } else {
      console.log('Token is missing or invalid.');
    }
  }, [token]); // Dependency array to re-run if the token changes

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user');  // Optionally remove user data from localStorage
    navigate('/LoginForm'); // Redirect to login page using useNavigate
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
          <i className="fas fa-home" style={iconStyles}></i> Admin Dashboard
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Row className="w-100">
            {/* Left Links Section */}
            <Col xs={12} md={8} className="d-flex justify-content-start">
              <Nav className="d-flex align-items-center">
                {/* Update Profile */}
                <Link
                  to="/admin/reports"
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
                  attendance Report
                </Link>

                {/* Report */}
                <Link
                  to=""
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
                  Report
                </Link>

                {/* Leave Request */}
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
                  <i className="fas fa-sign-in-alt" style={iconStyles}></i>
                  Leave Pending
                </Link>

                {/* View List */}
                <Link
                  to="/AttendanceComponent"
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
                {/* If user data is available, show profile picture and name */}
                {name && email ? (
                  <>
                    <img
                      src={profilePic || 'path/to/default/profile_picture.jpg'} // Fallback image if profile_picture is not available
                      alt="Profile"
                      style={{   borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        marginRight: '8px'}}
                    />
                    <span className="text-light" style={{ fontSize: '14px', fontWeight: '500' }}>
                      {name}
                    </span>
                  </>
                ) : (
                  <span className="text-light" style={{ fontSize: '14px', fontWeight: '500' }}>
                    Loading...
                  </span>
                )}
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
                  <NavDropdown.Item href="/AdminProfile">
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
