import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from './Dashboard'; // Import Dashboard component

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // Handle profile picture
  const [alertMessage, setAlertMessage] = useState(""); // State to hold alert messages
  const [alertType, setAlertType] = useState(""); // State to hold alert type (success/error)
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  useEffect(() => {
    if (token) {
      setIsLoading(true); // Start loading

      fetch("http://127.0.0.1:8000/api/user", {
        method: "GET", // Use GET to fetch user details
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include token in Authorization header
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched user data:", data); // Log the response data to the console

          if (data && data.name && data.email) {
            // If user data is available, set it to the state
            setName(data.name);
            setEmail(data.email);
            setAlertMessage("User data fetched successfully.");
            setAlertType("success");
          } else {
            setAlertMessage("User data not found.");
            setAlertType("danger");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setAlertMessage("Error fetching user data.");
          setAlertType("danger");
        })
        .finally(() => {
          setIsLoading(false); // Stop loading
        });
    } else {
      setAlertMessage("No token found. Please log in.");
      setAlertType("danger");
    }
  }, [token]); // Effect runs when token changes

  // Handle updating name, email, and profile picture
  const handleUpdateProfile = () => {
    if (!name || !email) {
      setAlertMessage("Please fill in both name and email.");
      setAlertType("danger");
      return;
    }

    setIsLoading(true); // Start loading

    const formData = new FormData(); // Use FormData for handling file uploads
    formData.append("name", name);
    formData.append("email", email);

    if (profilePicture) {
      formData.append("profile_picture", profilePicture); // Add the profile picture if selected
    }

    fetch("http://127.0.0.1:8000/api/user/update-profile", {
            method: "PUT", // Use PUT method to update user data
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Add token in Authorization header
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((data) => {
              setIsLoading(false); // Stop loading
              if (data.success) {
                setAlertMessage("Profile updated successfully.");
                setAlertType("success");
              } else {
                setAlertMessage("Error updating profile.");
                setAlertType("danger");
              }
            })
            .catch((error) => {
              console.error("Error updating profile:", error);
              setIsLoading(false); // Stop loading
              setAlertMessage("Error updating profile.");
            });
        };
      

  return (
    <>
      <Dashboard />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
          <h2 className="card-title text-center mb-4">Edit Profile</h2>

          {/* Conditionally render the alert message */}
          {alertMessage && (
            <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
              {alertMessage}
              <button type="button" className="close" onClick={() => setAlertMessage("")}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              {/* Update Name */}
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Handle name input change
                />
              </div>

              {/* Update Email */}
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Handle email input change
                />
              </div>

              {/* Profile Picture Upload */}
              <div className="form-group mb-3">
                <label htmlFor="profile_picture">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  id="profile_picture"
                  onChange={(e) => setProfilePicture(e.target.files[0])} // Handle profile picture input
                />
              </div>

              {/* Update Button */}
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleUpdateProfile}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;




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
//         <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "500px" }}>
//           <h2 className="card-title text-center mb-4">Edit Profile</h2>

//           {/* Conditionally render the alert message */}
//           {alertMessage && (
//             <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
//               {alertMessage}
//               <button type="button" className="close" data-dismiss="alert" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//           )}

//           {isLoading ? (
//             <div className="text-center">Loading...</div>
//           ) : (
//             <>
//               {/* Update Name */}
//               <div className="form-group mb-3">
//                 <label htmlFor="name">Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)} // Handle name input change
//                 />
//               </div>

//               {/* Update Email */}
//               <div className="form-group mb-3">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)} // Handle email input change
//                 />
//               </div>

              

//               {/* Update Button */}
//               <button
//                 className="btn btn-primary w-100 mt-3"
//                 onClick={handleUpdateProfile}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Updating..." : "Update Profile"}
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default EditProfile;
