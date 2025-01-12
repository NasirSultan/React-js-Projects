import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard"; // Import Dashboard component
import { Container, Row, Col, Card, Alert } from "react-bootstrap"; // Import necessary components from react-bootstrap
import { useNavigate } from "react-router-dom"; // For redirection

const AdminProfile = () => {
  const [user, setUser] = useState({}); // State to store user data
  const [alertMessage, setAlertMessage] = useState(""); // State to hold alert messages
  const [alertType, setAlertType] = useState(""); // State to hold alert type (success/error)

  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user details from the backend API
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if token is missing
      return;
    }

    fetch("http://127.0.0.1:8000/api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Add token in Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.name && data.email) {
          setUser(data); // Store user data
          setAlertMessage("Profile fetched successfully.");
          setAlertType("success");
        } else {
          setAlertMessage("No user data found.");
          setAlertType("danger");
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setAlertMessage("Error fetching user details.");
        setAlertType("danger");
      });

    // Auto-remove the alert after 5 seconds
    const timer = setTimeout(() => {
      setAlertMessage(""); // Clear the message after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [token, navigate]); // Dependency array to re-run if the token changes

  return (
    <>
      <AdminDashboard /> {/* Sidebar and main layout */}
      <Container fluid className="mt-5 pt-4">
        {/* Main content area */}
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
              <Row className="align-items-center">
                <Col md={6} className="text-center">
                  <h5>{user.name}</h5>
                  <p>{user.email}</p>
                </Col>
                <Col md={6} className="text-center">
                  <img
                    src={user.profile_picture || "https://via.placeholder.com/150"} // Use the user profile picture
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "150px", // Set width
                      height: "150px", // Set height
                      objectFit: "cover", // Ensure the image covers the area without stretching
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminProfile;
