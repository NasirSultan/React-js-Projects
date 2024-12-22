// import React, { useState, useEffect, useCallback } from "react";

// const Attendance = () => {
//   const [status, setStatus] = useState("");
//   const [attendanceHistory, setAttendanceHistory] = useState([]);
//   const [error, setError] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
//   const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
//   const [attendancePercentage, setAttendancePercentage] = useState(null);

//   const API_BASE_URL = "http://127.0.0.1:8000/api"; // Replace with your Laravel API URL

//   // Fetch attendance percentage
//   // Fetch attendance percentage
// const fetchAttendancePercentage = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("Please log in to view attendance percentage.");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/percentage`, {
//         method: "GET",  // Use GET method
//         headers: {
//           Authorization: `Bearer ${token}`,  // Ensure token is included in the header
//         },
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // Ensure the percentage is a float and format it
//         setAttendancePercentage(parseFloat(data.percentage).toFixed(2));
//       } else {
//         setError(data.message || "Failed to fetch attendance percentage");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching attendance percentage.");
//     }
//   };
  

//   // Fetch attendance history
//   const fetchAttendanceHistory = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("Please log in to view attendance history.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/history`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setAttendanceHistory(data.attendance);
//       } else {
//         setError(data.message || "Failed to fetch attendance history");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching attendance history.");
//     }
//   }, []);

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchAttendanceHistory();
//       fetchAttendancePercentage();
//     }
//   }, [isLoggedIn, fetchAttendanceHistory]); // Add fetchAttendanceHistory and isLoggedIn as dependencies

//   useEffect(() => {
//     fetchAttendanceHistory();
//   }, [fetchAttendanceHistory]); // Ensure fetchAttendanceHistory is correctly included

//   const login = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("authToken", data.token); // Store token in local storage
//         localStorage.setItem("userName", data.user.name); // Store user name in local storage
//         setIsLoggedIn(true); // Update login status
//         setUserName(data.user.name); // Update user name state
//         setError("");
//         alert(`Welcome, ${data.user.name}!`);
//         fetchAttendanceHistory(); // Fetch attendance history after login
//         fetchAttendancePercentage(); // Fetch attendance percentage after login
//       } else {
//         setError(data.message || "Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       setError("An error occurred during login. Please try again.");
//     }
//   };

//   const markAttendance = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("Please log in to mark attendance.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Attendance marked successfully!");
//         fetchAttendanceHistory(); // Refresh the history after marking attendance
//         fetchAttendancePercentage(); // Refresh the percentage after marking attendance
//       } else {
//         setError(data.message || "Failed to mark attendance");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userName");
//     setIsLoggedIn(false);
//     setUserName("");
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Student Attendance</h1>

//       {!isLoggedIn ? (
//         <form onSubmit={login}>
//           <h2>Login</h2>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <br />
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <br />
//           <button type="submit">Login</button>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </form>
//       ) : (
//         <>
//           <div style={{ marginBottom: "20px" }}>
//             <p>Welcome, <strong>{userName}</strong>!</p>
//             <button onClick={logout}>Logout</button>
//           </div>

//           <form onSubmit={markAttendance}>
//             <label htmlFor="status">Mark Attendance:</label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="present">Present</option>
//               <option value="absent">Absent</option>
//             </select>
//             <button type="submit" style={{ marginLeft: "10px" }}>
//               Submit
//             </button>
//           </form>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           <h2>Attendance Percentage</h2>
// <p>
//   {attendancePercentage !== null && !isNaN(attendancePercentage)
//     ? `Your attendance percentage is ${attendancePercentage}%`
//     : "Loading..."}
// </p>



//           <h2>Attendance History</h2>
//           <table border="1" style={{ width: "100%", marginTop: "20px" }}>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceHistory.length > 0 ? (
//                 attendanceHistory.map((record) => (
//                   <tr key={record.id}>
//                     <td>{new Date(record.date).toLocaleDateString()}</td>
//                     <td>{record.status}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="2" style={{ textAlign: "center" }}>
//                     No attendance records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default Attendance;




// import React, { useState, useEffect, useCallback } from "react";

// const Attendance = () => {
//   const [status, setStatus] = useState("");
//   const [attendanceHistory, setAttendanceHistory] = useState([]);
//   const [error, setError] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));
//   const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
//   const [attendancePercentage, setAttendancePercentage] = useState(null);

//   const API_BASE_URL = "http://127.0.0.1:8000/api"; // Replace with your Laravel API URL

//   // Fetch attendance percentage
//   // Fetch attendance percentage
// const fetchAttendancePercentage = async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("Please log in to view attendance percentage.");
//       return;
//     }
  
//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/percentage`, {
//         method: "GET",  // Use GET method
//         headers: {
//           Authorization: `Bearer ${token}`,  // Ensure token is included in the header
//         },
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         // Ensure the percentage is a float and format it
//         setAttendancePercentage(parseFloat(data.percentage).toFixed(2));
//       } else {
//         setError(data.message || "Failed to fetch attendance percentage");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching attendance percentage.");
//     }
//   };
  

//   // Fetch attendance history
//   const fetchAttendanceHistory = useCallback(async () => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("Please log in to view attendance history.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance/history`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setAttendanceHistory(data.attendance);
//       } else {
//         setError(data.message || "Failed to fetch attendance history");
//       }
//     } catch (err) {
//       setError("An error occurred while fetching attendance history.");
//     }
//   }, []);

//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchAttendanceHistory();
//       fetchAttendancePercentage();
//     }
//   }, [isLoggedIn, fetchAttendanceHistory]); // Add fetchAttendanceHistory and isLoggedIn as dependencies

//   useEffect(() => {
//     fetchAttendanceHistory();
//   }, [fetchAttendanceHistory]); // Ensure fetchAttendanceHistory is correctly included

//   const login = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("authToken", data.token); // Store token in local storage
//         localStorage.setItem("userName", data.user.name); // Store user name in local storage
//         setIsLoggedIn(true); // Update login status
//         setUserName(data.user.name); // Update user name state
//         setError("");
//         alert(`Welcome, ${data.user.name}!`);
//         fetchAttendanceHistory(); // Fetch attendance history after login
//         fetchAttendancePercentage(); // Fetch attendance percentage after login
//       } else {
//         setError(data.message || "Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       setError("An error occurred during login. Please try again.");
//     }
//   };

//   const markAttendance = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       setError("Please log in to mark attendance.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}/attendance`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Attendance marked successfully!");
//         fetchAttendanceHistory(); // Refresh the history after marking attendance
//         fetchAttendancePercentage(); // Refresh the percentage after marking attendance
//       } else {
//         setError(data.message || "Failed to mark attendance");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userName");
//     setIsLoggedIn(false);
//     setUserName("");
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>Student Attendance</h1>

//       {!isLoggedIn ? (
//         <form onSubmit={login}>
//           <h2>Login</h2>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <br />
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <br />
//           <button type="submit">Login</button>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </form>
//       ) : (
//         <>
//           <div style={{ marginBottom: "20px" }}>
//             <p>Welcome, <strong>{userName}</strong>!</p>
//             <button onClick={logout}>Logout</button>
//           </div>

//           <form onSubmit={markAttendance}>
//             <label htmlFor="status">Mark Attendance:</label>
//             <select
//               id="status"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="present">Present</option>
//               <option value="absent">Absent</option>
//             </select>
//             <button type="submit" style={{ marginLeft: "10px" }}>
//               Submit
//             </button>
//           </form>

//           {error && <p style={{ color: "red" }}>{error}</p>}

//           <h2>Attendance Percentage</h2>
// <p>
//   {attendancePercentage !== null && !isNaN(attendancePercentage)
//     ? `Your attendance percentage is ${attendancePercentage}%`
//     : "Loading..."}
// </p>



//           <h2>Attendance History</h2>
//           <table border="1" style={{ width: "100%", marginTop: "20px" }}>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceHistory.length > 0 ? (
//                 attendanceHistory.map((record) => (
//                   <tr key={record.id}>
//                     <td>{new Date(record.date).toLocaleDateString()}</td>
//                     <td>{record.status}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="2" style={{ textAlign: "center" }}>
//                     No attendance records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default Attendance;
