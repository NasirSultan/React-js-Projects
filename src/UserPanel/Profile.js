import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Dashboard'; // Import Dashboard component

const Profile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState(""); // State to hold alert messages
  const [alertType, setAlertType] = useState(""); // State to hold alert type (success/error)

  // Replace this with the actual token you get after login or from local storage
  const token = localStorage.getItem("token"); // Example: storing token in localStorage

  // Fetch user details from the backend API
  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add token in Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setEmail(data.email);

          // Assuming the profile picture URL is returned in the API response
          if (data.user.profile_picture) {
            // Adjust this URL based on how your server serves images
            setProfilePic(`http://127.0.0.1:8000/${data.user.profile_picture}`);
          }

          // Show success alert
          setAlertMessage("Profile fetched successfully.");
          setAlertType("success");
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          // Show error alert
        
          setAlertType("danger");
        });
    } else {
      console.log("Token is missing or invalid.");
    }
  }, [token]); // Dependency array to re-run if the token changes

  return (
    <>
      <Dashboard />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
          <h2 className="card-title text-center mb-4">Profile</h2>

          {/* Conditionally render the alert message */}
          {alertMessage && (
            <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
              {alertMessage}
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          <div className="text-center mb-3">
            <img
              src={profilePic || "https://via.placeholder.com/100"}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <div className="mb-3">
            <h5>{name}</h5>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
