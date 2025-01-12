import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';

const Reports = () => {
  const [userId, setUserId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setAttendanceData([]);
    setFilteredData([]);
    setLoading(true);

    // Construct the query parameters for the GET request
    let url = 'http://127.0.0.1:8000/api/attendance-report?';

    if (fromDate) url += `from_date=${fromDate}&`;
    if (toDate) url += `to_date=${toDate}&`;

    // Include user IDs if provided
    if (userId) {
      const userIds = userId.split(',').map((id) => parseInt(id.trim()));
      url += `user_ids=${userIds.join(',')}&`;
    }

    // Remove the trailing "&" if it exists
    url = url.slice(0, -1);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found for authentication.');
      }

      // Make the GET request with the query parameters
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch the report');
      }

      const data = await response.json();
      setAttendanceData(data); // Set the full response data in state

      // Filter the records if a userId is provided
      if (userId) {
        const filtered = data.filter((record) =>
          record.user_id === parseInt(userId.trim())
        );
        setFilteredData(filtered); // Set filtered data if user_id is present
      } else {
        setFilteredData(data); // Display all data if no user_id is provided
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate attendance stats
  const calculateAttendanceStats = () => {
    const stats = { present: 0, absent: 0, leave: 0, userCount: 0 };
    const userSet = new Set();

    filteredData.forEach((record) => {
      if (record.status === 'present') stats.present++;
      else if (record.status === 'absent') stats.absent++;
      else if (record.leave_status === 'approved') stats.leave++;

      // Add user ID to a set to get unique users
      if (record.user_id) userSet.add(record.user_id);
    });

    stats.userCount = userSet.size;
    return stats;
  };

  const attendanceStats = calculateAttendanceStats();

  return (
    <>
      <AdminDashboard />
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '250px',
            backgroundColor: '#f4f4f4',
            paddingTop: '20px',
            marginRight: '40px',
          }}
        >
          {/* Sidebar content can be added here */}
        </div>

        <div
          style={{
            flex: 1,
            paddingLeft: '20px',
            paddingRight: '10px',
            paddingTop: '20px',
            marginRight: '40px',
          }}
        >
          <h2 className="mb-5">Attendance Report</h2>
          <form
            onSubmit={handleSubmit}
            className="w-100 p-4 border rounded hover-effect"
            style={{ backgroundColor: '#f9f9f9' }}
          >
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">Student IDs (Optional, comma separated):</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="form-control"
                  placeholder="e.g., 3, 7"
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
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Loading...' : 'Get Report'}
            </button>
          </form>

          {filteredData.length > 0 && (
            <>
              <div className="card mt-4" style={{ backgroundColor: '#e9ecef' }}>
  <div className="card-body">
    <h5>Attendance Summary</h5>
    <div className="d-flex justify-content-between">
      <div className="p-2">Present: {attendanceStats.present}</div>
      <div className="p-2">Absent: {attendanceStats.absent}</div>
      <div className="p-2">Leave: {attendanceStats.leave}</div>
      <div className="p-2">Total Users: {attendanceStats.userCount}</div>
    </div>
  </div>
</div>

              <div
                className="w-100 mt-4 p-4 border rounded"
                style={{ backgroundColor: '#fff' }}
              >
                <h3>Attendance Records</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th> ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Leave Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((record) => (
                      <tr key={`${record.user_id}-${record.date}`}>
                        <td>{record.user_id}</td>
                        <td>{record.name}</td>
                        <td>{record.date}</td>
                        <td>{record.status}</td>
                        <td>{record.leave_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {error && <div className="text-danger mt-3">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Reports;
