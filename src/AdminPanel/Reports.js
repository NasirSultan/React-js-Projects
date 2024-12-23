import React, { useState } from 'react';
import AdminDashboard from "./AdminDashboard"; 

const Reports = () => {
  const [userId, setUserId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors and data
    setError('');
    setAttendanceData([]);

    try {
      // Construct the query string with parameters
      const query = new URLSearchParams({
        user_id: userId,
        from_date: fromDate,
        to_date: toDate
      }).toString();

      // Send a request to the backend to fetch the attendance report
      const response = await fetch(`http://127.0.0.1:8000/api/attendance-report?${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token-based auth
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }

      // Parse JSON response
      const data = await response.json();
      console.log('Response Data:', data); // Log the response for debugging

      // Set the fetched attendance data
      setAttendanceData(data);
    } catch (err) {
      // Handle error (e.g., display error message)
      setError('Failed to fetch attendance data. Please try again.');
    }
  };

  return (
    <>
    <AdminDashboard/>
    <div className="container d-flex flex-column align-items-center my-4" style={{ width: "80%" }}>
      <h2 className="mb-4">Get User-Specific Attendance Report</h2>
      <form
        onSubmit={handleSubmit}
        className="w-100 p-4 border rounded hover-effect"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label">User ID:</label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">From Date:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
              className="form-control"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Get Report
        </button>
      </form>

      {error && <div className="text-danger mt-3 hover-effect">{error}</div>}

      {attendanceData.length > 0 && (
        <div
          className="w-100 mt-4 p-4 border rounded hover-effect"
          style={{ backgroundColor: "#fff" }}
        >
          <h3 className="mb-3">Attendance Records</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record) => (
                <tr key={record.id}>
                  <td>{record.name}</td>
                  <td>{record.date}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

export default Reports;
