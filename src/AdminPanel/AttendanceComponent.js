import React, { useState, useEffect } from 'react';
import AdminDashboard from "./AdminDashboard"; 

// Attendance Component
const AttendanceComponent = () => {
  const [attendances, setAttendances] = useState([]); // To store attendance records
  const [token, setToken] = useState(localStorage.getItem('token')); // Store the token in localStorage
  const [attendanceData, setAttendanceData] = useState({
    user_id: '', // User ID to identify student
    status: '',  // Status (Present / Absent)
    date: '',    // Date of attendance
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (token) {
      fetchAttendances(); // Fetch attendance records
    }
  }, [token]);

  // Fetch attendance data
  const fetchAttendances = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/attendances', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attendances');
      }

      const data = await response.json();
      console.log('Attendance Data:', data); // Debugging the response data
      setAttendances(data);
    } catch (error) {
      console.error('Error fetching attendances:', error);
    }
  };

  // Add attendance
  const addAttendance = async () => {
    if (!attendanceData.user_id || !attendanceData.status || !attendanceData.date) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/attendances', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
      });

      if (!response.ok) {
        throw new Error('Failed to add attendance');
      }

      const data = await response.json();
      console.log('Attendance added:', data);

      // Assuming the response has the structure: { message, attendance }
      if (data.attendance) {
        setAttendances((prevAttendances) => [
          ...prevAttendances,
          {
            id: data.attendance.id,
            user_name: data.attendance.user.name, // Using the 'user' relation to get the user name
            status: data.attendance.status,
            date: data.attendance.date,
          },
        ]);
      }

      // Reset form data after successful submission
      setAttendanceData({
        user_id: '', // Reset user_id
        status: '',
        date: '',
      });
    } catch (error) {
      setError('Error adding attendance: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update attendance
  // Update attendance
  const updateAttendance = async (attendance) => {
    const updatedStatus = attendance.status === 'present' ? 'absent' : 'present'; // Toggle status

    const updatedData = {
      user_id: attendance.user_id,
      status: updatedStatus,
      date: attendance.date,
    };

    try {
      const response = await fetch('http://localhost:8000/api/attendances/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update attendance');
      }

      fetchAttendances(); // Refresh attendance list after update
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  // Delete attendance
  // Delete attendance
const deleteAttendance = async (attendance) => {
  const dataToDelete = {
    user_id: attendance.user_id,  // Use the correct user_id field
    date: attendance.date,         // Use the date field
  };

  try {
    const response = await fetch('http://localhost:8000/api/attendances/delete', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToDelete),  // Send the request with the updated body
    });

    if (!response.ok) {
      throw new Error('Failed to delete attendance');
    }

    const data = await response.json();
    console.log('Attendance deleted:', data);
    fetchAttendances(); // Refresh attendance list
  } catch (error) {
    console.error('Error deleting attendance:', error);
  }
};


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData({ ...attendanceData, [name]: value });
  };

  // Render the attendance component
  return (

    <>
        <AdminDashboard/>
    <div className="container mt-4">
    <h2 className="text-center">Attendance Management</h2>

    {/* Add Attendance Form Row */}
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-9" style={{ maxWidth: '100%' }}>
        <div className="card">
          <div className="card-body mt-4"> 
            <h3 className="card-title" >Add Attendance</h3>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  name="user_id"
                  value={attendanceData.user_id}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter ID"
                />
              </div>
              <div className="col-md-4">
                <select
                  name="status"
                  value={attendanceData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <div className="col-md-4">
                <input
                  type="date"
                  name="date"
                  value={attendanceData.date}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <button
              onClick={addAttendance}
              className="btn btn-primary w-100 mt-3"
              disabled={loading}
            >
              {loading ? 'Adding Attendance...' : 'Add Attendance'}
            </button>

            {/* Error display */}
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>

    {/* Attendance Records Row */}
    <div className="row justify-content-center mt-4">
      <div className="col-12 col-md-10 col-lg-9" style={{ maxWidth: '90%' }}>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Student Attendance Records</h3>

            {attendances.length === 0 ? (
              <p>No attendance records found</p>
            ) : (
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                  <th>ID</th>
                    <th> Name</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendances.map((attendance) => (
                    <tr key={attendance.id}>
                        <td>{attendance.user_id}</td>
                      <td>{attendance.user_name}</td>
                      <td>{attendance.status}</td>
                      <td>{attendance.date}</td>
                      <td>
                        <button
                          onClick={() => updateAttendance(attendance)}
                          className="btn btn-warning btn-sm me-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteAttendance(attendance)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
};

export default AttendanceComponent;
