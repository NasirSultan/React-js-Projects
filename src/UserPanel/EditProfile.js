// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Dashboard from './Dashboard'; // Import Dashboard component

// const EditProfile = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [alertMessage, setAlertMessage] = useState(""); // State to hold alert messages
//   const [alertType, setAlertType] = useState(""); // State to hold alert type (success/error)
//   const [isLoading, setIsLoading] = useState(false); // State for loading status

//   const token = localStorage.getItem("token"); // Retrieve the token from localStorage

//   useEffect(() => {
//     if (token) {
//       setIsLoading(true); // Start loading

//       fetch("http://127.0.0.1:8000/api/user", {
//         method: "GET", // Use GET to fetch user details
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`, // Include token in Authorization header
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Fetched user data:", data); // Log the response data to the console

//           if (data && data.name && data.email) {
//             // If user data is available, set it to the state
//             setName(data.name);
//             setEmail(data.email);
//             setAlertMessage("User data fetched successfully.");
//             setAlertType("success");
//           } else {
//             setAlertMessage("User data not found.");
//             setAlertType("danger");
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching user data:", error);
//           setAlertMessage("Error fetching user data.");
//           setAlertType("danger");
//         })
//         .finally(() => {
//           setIsLoading(false); // Stop loading
//         });
//     } else {
//       setAlertMessage("No token found. Please log in.");
//       setAlertType("danger");
//     }
//   }, [token]); // Effect runs when token changes

//   // Handle updating name and email
//   const handleUpdateProfile = () => {
//     if (!name || !email) {
//       setAlertMessage("Please fill in both name and email.");
//       setAlertType("danger");
//       return;
//     }

//     setIsLoading(true); // Start loading

//     const formData = {
//       name,
//       email,
//     };

//     fetch("http://127.0.0.1:8000/api/user/update-profile", {
//       method: "PUT", // Use PUT method to update user data
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`, // Add token in Authorization header
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setIsLoading(false); // Stop loading
//         if (data.success) {
//           setAlertMessage("Profile updated successfully.");
//           setAlertType("success");
//         } else {
//           setAlertMessage("Error updating profile.");
//           setAlertType("danger");
//         }
//       })
//       .catch((error) => {
//         console.error("Error updating profile:", error);
//         setIsLoading(false); // Stop loading
//         setAlertMessage("Error updating profile.");
//       });
//   };

//   return (
//     <>
//       <Dashboard />
//       <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//         <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "900px" }}>
//           <div className="d-flex justify-content-between align-items-center">
//             {/* Left side: Profile picture */}
//             <div className="w-40">
//               <img
//                 src="https://via.placeholder.com/150"
//                 alt="Profile"
//                 className="img-fluid rounded-circle"
//                 style={{ maxWidth: "150px", maxHeight: "150px" }}
//               />
//             </div>

//             {/* Right side: Profile form */}
//             <div className="w-50">
//               <h2 className="card-title text-center mb-4">Edit Profile</h2>

//               {/* Conditionally render the alert message */}
//               {alertMessage && (
//                 <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
//                   {alertMessage}
//                   <button type="button" className="close" data-dismiss="alert" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//               )}

//               {isLoading ? (
//                 <div className="text-center">Loading...</div>
//               ) : (
//                 <>
//                   {/* Update Name */}
//                   <div className="form-group mb-3">
//                     <label htmlFor="name">Name</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)} // Handle name input change
//                     />
//                   </div>

//                   {/* Update Email */}
//                   <div className="form-group mb-3">
//                     <label htmlFor="email">Email</label>
//                     <input
//                       type="email"
//                       className="form-control"
//                       id="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)} // Handle email input change
//                     />
//                   </div>

//                   {/* Update Button */}
//                   <button
//                     className="btn btn-primary w-100 mt-3"
//                     onClick={handleUpdateProfile}
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Updating..." : "Update Profile"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditProfile;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect
import Dashboard from './Dashboard';

const EditProfile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Preview the uploaded file
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!selectedFile) {
      setMessage("Please select a profile picture to upload.");
      setLoading(false);
      return;
    }

    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You are not authenticated. Please log in first.");
      setLoading(false);
      return;
    }

    // Prepare the form data
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/api/update-profile-picture", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token in the Authorization header
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile picture updated successfully!");
        // Redirect to the profile page after success
        setTimeout(() => {
          navigate("/Profile"); // Redirect to the profile page
        }, 2000); // Wait for 2 seconds to show the success message
      } else {
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setMessage("Error connecting to the server. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Dashboard />
      <div className="d-flex justify-content-center ">
      <div
  className="container mt-4"
  style={{
    maxWidth: '700px',
    border: '2px solid #d1d5db', // Grey border
    marginLeft: '470px',  // Updated left margin
    marginTop: '90px', // Adjusted marginTop if needed
    borderRadius: '8px', // Rounded corners
    transition: 'all 0.3s ease', // Smooth transition for hover effect
    cursor: 'pointer', // Change cursor to pointer
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = '#d1d5db'; // Change border color on hover
    e.currentTarget.style.cursor = 'not-allowed'; // Grey cursor on hover
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = '#d1d5db'; // Reset border color on mouse leave
    e.currentTarget.style.cursor = 'pointer'; // Reset cursor on mouse leave
  }}
>
          <h2 className="text-center  my-4">Update Profile Picture</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="profilePicture" className="form-label">
                Choose a profile picture
              </label>
              <input
                type="file"
                className="form-control mb-3"
                id="profilePicture"
                onChange={handleFileChange}
                accept="image/*"
                style={{
                  borderRadius: '5px',
                  marginBottom: '15px',
                  transition: 'border-color 0.3s',
                  border: '1px solid #ced4da',
                }}
                onMouseEnter={(e) => e.target.style.borderColor = '#80bdff'}
                onMouseLeave={(e) => e.target.style.borderColor = '#ced4da'}
              />
              {selectedFile ? (
                <small className="text-muted">File selected: {selectedFile.name}</small>
              ) : (
                <small className="text-muted">No file chosen</small>
              )}
            </div>
            {preview && (
              <div className="mb-3 text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    border: "2px solid #dee2e6",
                    transition: "border 0.3s",
                  }}
                  onMouseEnter={(e) => e.target.style.borderColor = '#80bdff'}
                  onMouseLeave={(e) => e.target.style.borderColor = '#dee2e6'}
                />
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary mb-3 w-100"
              disabled={loading}
              style={{
                borderRadius: '5px',
                transition: 'background-color 0.3s, border-color 0.3s',
                marginTop: '10px',
              }}
            >
              {loading ? "Uploading..." : "Update Picture"}
            </button>
          </form>
          {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
        </div>
      </div>
    </>
  );
};

export default EditProfile;


