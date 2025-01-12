import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [user, setUser] = useState(null); // New state to store user info
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar Toggle for Mobile
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetch('http://127.0.0.1:8000/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.role !== 'admin') {
            navigate('/LoginForm');
            return;
          }
          setUser(data); // Set user data directly
          setName(data.name);
          setEmail(data.email);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    } else {
      navigate('/LoginForm');
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/LoginForm');
  };

  const iconStyles = {
    fontSize: '16px',
    marginRight: '8px',
    transition: 'color 0.3s ease',
  };

  // Close sidebar on route change
  useEffect(() => {
    setShowSidebar(false);
  }, [window.location.pathname]);

  return (
    <div className="d-flex flex-wrap">
      {/* Sidebar */}
      <div
        className="d-none d-lg-flex flex-column justify-content-between"
        style={{
          width: '250px',
          height: '100vh',
          backgroundColor: '#343a40',
          color: '#fff',
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '20px',
          overflowY: 'auto', // Make sidebar scrollable
        }}
      >
        {/* User Info */}
        <div>
          <div className="mb-4 text-center">
            <img
              src={user?.profile_picture || "https://via.placeholder.com/150"} // Use user.profile_picture directly
              alt="Profile"
              className="rounded-circle"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
            <p className="mt-3 mb-1" style={{ fontWeight: 'bold' }}>
              {name || 'Admin'}
            </p>
            <p style={{ fontSize: '14px', color: '#adb5bd' }}>
              {email || 'admin@example.com'}
            </p>
          </div>

          {/* Navigation Links */}
          <Nav className="flex-column">
            <Link to="/admin/reports" className="nav-link text-light">
              <i className="fa-solid fa-chart-line" style={iconStyles}></i> Attendance Report
            </Link>
            <Link to="/AttendanceReport" className="nav-link text-light">
              <i className="fa-solid fa-clipboard-list" style={iconStyles}></i> Grades Report
            </Link>
            <Link to="/leave-approval" className="nav-link text-light">
              <i className="fa-solid fa-calendar-check" style={iconStyles}></i> Leaves Management
            </Link>
            <Link to="/AttendanceComponent" className="nav-link text-light">
              <i className="fa-solid fa-user-check" style={iconStyles}></i> Attendance Operations
            </Link>
          </Nav>
        </div>

        {/* Sidebar Buttons */}
        <div className="text-center" style={{ marginTop: 'auto' }}>
          <Link
            to="/AdminProfile"
            className="btn btn-light btn-sm mb-2"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            <i className="fas fa-user" style={iconStyles}></i> Profile
          </Link>
          <button
            onClick={logout}
            className="btn btn-light btn-sm mb-3"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            <i className="fas fa-sign-out-alt" style={iconStyles}></i> Logout
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        style={{ backgroundColor: '#343a40', color: '#fff' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Link to="/admin/reports" className="nav-link text-light">
              <i className="fa-solid fa-chart-line" style={iconStyles}></i> Attendance Report
            </Link>
            <Link to="/AttendanceReport" className="nav-link text-light">
              <i className="fa-solid fa-clipboard-list" style={iconStyles}></i> Grade Reports
            </Link>
            <Link to="/leave-approval" className="nav-link text-light">
              <i className="fa-solid fa-calendar-check" style={iconStyles}></i> Leaves Management
            </Link>
            <Link to="/AttendanceComponent" className="nav-link text-light">
              <i className="fa-solid fa-user-check" style={iconStyles}></i> Attendance Operations
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <Navbar
          style={{ backgroundColor: '#f8f9fa', textAlign: 'center', justifyContent: 'space-between' }}
          variant="light"
          className="px-3 py-3"
          expand="lg"
        >
          <Container fluid>
            <Navbar.Toggle
              onClick={() => setShowSidebar(true)}
              aria-controls="offcanvasNavbar"
              className="d-lg-none"
            />
            <Navbar.Brand href="#" className="text-dark">
              <i className="fa-solid fa-person-dots-from-line" style={iconStyles}></i> Admin Dashboard
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default AdminDashboard;
