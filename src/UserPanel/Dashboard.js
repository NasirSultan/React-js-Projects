// import React, { useState, useEffect } from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null); // Error state
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token) {
//       fetch('http://127.0.0.1:8000/api/user', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.role !== 'user') {
//             navigate('/LoginForm');
//             return;
//           }
//           setUser(data); // Set user data
//         })
//         .catch((error) => {
//           console.error('Error fetching user details:', error);
//           setError('Failed to load user details.'); // Set error message
//         });
//     } else {
//       navigate('/LoginForm');
//     }
//   }, [token, navigate]);

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/LoginForm');
//   };

//   const iconStyles = {
//     fontSize: '16px',
//     marginRight: '8px',
//     transition: 'color 0.3s ease',
//   };

//   const linkStyles = {
//     color: '#adb5bd',
//     fontWeight: '500',
//     textDecoration: 'none',
//     padding: '10px 15px',
//   };

//   const hoverStyles = {
//     color: '#007bff',
//   };

//   if (error) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
//         <div>{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex flex-wrap">
//       {/* Sidebar */}
//       <div
//         className="d-none d-lg-flex flex-column justify-content-between"
//         style={{
//           width: '250px',
//           height: '100vh',
//           backgroundColor: '#343a40',
//           color: '#fff',
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           padding: '20px',
//         }}
//       >
//         {/* User Info */}
//         <div>
//           <div className="mb-4 text-center">
//             <img
//               src={user.profile_picture}
//               alt="Profile"
//               className="rounded-circle"
//               style={{
//                 width: '80px',
//                 height: '80px',
//                 objectFit: 'cover',
//               }}
//             />
//             <p className="mt-3 mb-1" style={{ fontWeight: 'bold' }}>
//               {user.name || 'User'}
//             </p>
//             <p style={{ fontSize: '14px', color: '#adb5bd' }}>
//               {user.email || 'user@example.com'}
//             </p>
//           </div>

//           {/* Navigation Links */}
//           <Nav className="flex-column">
//             {/* Update Profile */}
//             <Link
//               to="/edit-profile"
//               className="nav-link d-flex align-items-center"
//               style={linkStyles}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = hoverStyles.color;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = linkStyles.color;
//               }}
//             >
//               <i className="fas fa-user-edit" style={iconStyles}></i>
//               Update Profile
//             </Link>

//             {/* Mark Attendance */}
//             <Link
//               to="/mark-attendance"
//               className="nav-link d-flex align-items-center"
//               style={linkStyles}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = hoverStyles.color;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = linkStyles.color;
//               }}
//             >
//               <i className="fas fa-calendar-check" style={iconStyles}></i>
//               Mark Attendance
//             </Link>

//             {/* Leave Request */}
//             <Link
//               to="/leave-requset"
//               className="nav-link d-flex align-items-center"
//               style={linkStyles}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.color = hoverStyles.color;
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.color = linkStyles.color;
//               }}
//             >
//               <i className="fas fa-sign-in-alt" style={iconStyles}></i>
//               Leave Request
//             </Link>
//           </Nav>
//         </div>

//         {/* Sidebar Buttons */}
//         <div className="text-center" style={{ marginTop: 'auto' }}>
//           <Link
//             to="/UserProfile"
//             className="btn btn-light btn-sm mb-2"
//             style={{
//               width: '100%',
//               backgroundColor: 'transparent',
//               border: 'none',
//               color: '#fff',
//               textAlign: 'center',
//               fontWeight: '500',
//             }}
//           >
//             <i className="fas fa-user" style={iconStyles}></i> Profile
//           </Link>
//           <button
//             onClick={logout}
//             className="btn btn-light btn-sm mb-3"
//             style={{
//               width: '100%',
//               backgroundColor: 'transparent',
//               border: 'none',
//               color: '#fff',
//               textAlign: 'center',
//               fontWeight: '500',
//             }}
//           >
//             <i className="fas fa-sign-out-alt" style={iconStyles}></i> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
//         <Navbar
//           style={{ backgroundColor: '#f8f9fa', textAlign: 'center', justifyContent: 'space-between' }}
//           variant="light"
//           className="px-3 py-3"
//           expand="lg"
//         >
//           <Container fluid>
//             <Navbar.Brand href="#" className="text-dark">
//               <i className="fa-solid fa-person-dots-from-line" style={iconStyles}></i> User Dashboard
//             </Navbar.Brand>
//           </Container>
//         </Navbar>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
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
          if (data.role !== 'user') {
            navigate('/LoginForm');
            return;
          }
          setUser(data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
          navigate('/LoginForm');
        });
    } else {
      navigate('/LoginForm');
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/LoginForm');
  };

  const iconStyles = {
    fontSize: '16px',
    marginRight: '8px',
    transition: 'color 0.3s ease',
  };

  const linkStyles = {
    color: '#adb5bd',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '10px 15px',
  };

  const hoverStyles = {
    color: '#007bff',
  };

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
                width: '100px',
                height: '100px',
                objectFit: 'cover',
              }}
            />
            <p className="mt-3 mb-1" style={{ fontWeight: 'bold' }}>
              {user?.name || 'user'}
            </p>
            <p style={{ fontSize: '14px', color: '#adb5bd' }}>
              {user?.email || 'user@example.com'}
            </p>
          </div>

          {/* Navigation Links */}
          <Nav className="flex-column">
            <Link
              to="/edit-profile"
              className="nav-link text-light"
              style={linkStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = hoverStyles.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = linkStyles.color;
              }}
            >
              <i className="fa-solid fa-chart-line" style={iconStyles}></i>Pic Update
            </Link>
            <Link
              to="/mark-attendance"
              className="nav-link text-light"
              style={linkStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = hoverStyles.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = linkStyles.color;
              }}
            >
              <i className="fa-solid fa-clipboard-list" style={iconStyles}></i> Mark Attendance
            </Link>
            <Link
              to="/leave-requset"
              className="nav-link text-light"
              style={linkStyles}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = hoverStyles.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = linkStyles.color;
              }}
            >
              <i className="fa-solid fa-calendar-check" style={iconStyles}></i>leave Requset
            </Link>
            
          </Nav>
        </div>

        {/* Sidebar Buttons */}
        <div className="text-center" style={{ marginTop: 'auto' }}>
        <Link
            to="/Profile"
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

      {/* Main Content */}
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <Navbar
          style={{ backgroundColor: '#f8f9fa', textAlign: 'center', justifyContent: 'space-between' }}
          variant="light"
          className="px-3 py-3"
          expand="lg"
        >
          <Container fluid>
            <Navbar.Brand href="#" className="text-dark">
              <i className="fa-solid fa-person-dots-from-line" style={iconStyles}></i> User Dashboard
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Dashboard;
