import React, { useState } from "react";
import Dashboard from './Dashboard';

const CheckLeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem("token");

  const handleCheckRequest = async () => {
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/check-request", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch leave requests.");
      }

      const data = await response.json();
      setLeaveRequests(data.leave_requests);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLeaveRequests([]);
    }
  };

  return (
    <>
    <Dashboard />
    <div
      className="container mt-5 p-4"
      style={{
        maxWidth: "80%",
        border: "2px lightblue ",
        borderRadius: "8px",
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <h2 className="text-center mb-4">Check Leave Request Status</h2>

      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={handleCheckRequest}>
          Fetch Leave Requests
        </button>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {leaveRequests.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Reason</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                  <td>{request.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && <p className="text-center">No leave requests found.</p>
      )}
    </div>
    </>
  );
};

export default CheckLeaveRequest;
