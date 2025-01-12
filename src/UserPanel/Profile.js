// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection
// import Dashboard from './Dashboard'; // Import Dashboard component

// const Profile = () => {
//   const [user, setUser] = useState(null); // Store user data
//   const [message, setMessage] = useState(""); // Store alert message
//   const [alertType, setAlertType] = useState(""); // Store alert type
//   const navigate = useNavigate(); // Use useNavigate for redirection

//   const token = localStorage.getItem("token");

//   // Fetch user data when the component mounts or token changes
//   useEffect(() => {
//     if (!token) {
//       navigate("/login"); // Redirect to login if token is missing
//       return;
//     }

//     // Fetch user profile data
//     fetch("http://127.0.0.1:8000/api/user", {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.name && data.email) {
//           setUser(data); // Store user data
//           setMessage("Profile fetched successfully.");
//           setAlertType("success");
//         } else {
//           setMessage("Failed to fetch user data.");
//           setAlertType("danger");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setMessage("Failed to fetch user data.");
//         setAlertType("danger");
//       });

//     // Auto-remove the alert after 5 seconds
//     if (message) {
//       const timer = setTimeout(() => {
//         setMessage(""); // Clear the message after 5 seconds
//       }, 5000);

//       return () => clearTimeout(timer); // Cleanup the timer on component unmount
//     }
//   }, [token, navigate, message]);

//   return (
//     <>
//       <div className="d-flex">
//         <Dashboard /> {/* Sidebar stays fixed */}

//         {/* Main Profile Content */}
//         <div
//           className="container mt-5"
//           style={{
//             marginLeft: '0', // Set left margin to 0, removing the 250px margin
//             width: 'calc(100% - 250px)', // Ensure the content adjusts to sidebar width
//             height: '100vh', // Full viewport height for centering
//           }}
//         >
//           <div style={{ width: "700px", margin: "auto" }}> {/* Increased width */}
//             <h2 className="text-center">Profile</h2>

//             {/* Display alert message */}
//             {message && (
//               <div
//                 className={`alert alert-${alertType} alert-dismissible fade show`}
//                 role="alert"
//               >
//                 {message}
//               </div>
//             )}

//             {/* Display User Profile */}
//             {user && (
//               <div className="card">
//                 <div className="card-body" style={{ textAlign: 'left', padding: '30px' }}> {/* Set card-body to left and increase padding */}
//                   {/* Horizontal Layout for Name, Email, and Profile Picture */}
//                   <div className="d-flex justify-content-start align-items-center" style={{ gap: "20px" }}>
//                     {/* Name and Email */}
//                     <div>
//                       <h5>{user.name}</h5>
//                       <p>{user.email}</p>
//                     </div>

//                     {/* Profile Picture */}
//                     <div>
//                       {user.profile_picture ? (
//                         <img
//                           src={user.profile_picture}
//                           alt="Profile"
//                           className="rounded-circle"
//                           style={{
//                             width: "150px",
//                             height: "150px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       ) : (
//                         <p>No profile picture available</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Dashboard from "./Dashboard"; 

const Profile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [alertMessage, setAlertMessage] = useState(""); // Store alert message
  const [alertType, setAlertType] = useState(""); // Store alert type
  const navigate = useNavigate(); // Use useNavigate for redirection

  const token = localStorage.getItem("token");

  // Fetch user data when the component mounts or token changes
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if token is missing
      return;
    }

    // Fetch user profile data
    fetch("http://127.0.0.1:8000/api/user", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.name && data.email) {
          setUser(data); // Store user data
          setAlertMessage("Profile fetched successfully.");
          setAlertType("success");
        } else {
          setAlertMessage("Failed to fetch user data.");
          setAlertType("danger");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setAlertMessage("Failed to fetch user data.");
        setAlertType("danger");
      });

    // Auto-remove the alert after 5 seconds
    const timer = setTimeout(() => {
      setAlertMessage(""); // Clear the message after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [token, navigate]);

  return (
    <>
    <Dashboard/>
    <Container fluid className="mt-5 pt-4">
      <Row>
        <Col md={3}>
          {/* Placeholder for sidebar */}
        </Col>
        <Col md={9}>
          <Card className="shadow-lg p-4" style={{ marginRight: '40px', marginTop: '20px', marginBottom: '30px' }}>
            <h2 className="card-title text-center mb-4">Profile</h2>

            {/* Conditionally render the alert message */}
            {alertMessage && (
              <Alert variant={alertType} dismissible>
                {alertMessage}
              </Alert>
            )}

            {/* Profile content */}
            {user ? (
              <Row className="align-items-center">
                <Col md={6} className="text-center">
                  <h5>{user.name}</h5>
                  <p>{user.email}</p>
                </Col>
                <Col md={6} className="text-center">
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Col>
              </Row>
            ) : (
              <p className="text-center">Loading profile...</p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Profile;
