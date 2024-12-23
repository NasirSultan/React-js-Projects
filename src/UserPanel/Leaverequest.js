import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';


const LeaveRequest = () => {
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Assuming the user token is stored in localStorage
      const response = await fetch('http://localhost:8000/api/leave-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason, date }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || 'Error submitting leave request');
      }
    } catch (error) {
      setMessage('Error submitting leave request');
    }
  };

  return (
    <>
      <Dashboard />

      <div className="d-flex justify-content-center align-items-center vh-70 pt-4">
        <div
          className="p-4 rounded shadow-lg"
          style={{
            width: '89%',
            background: '#f1f3f5', // Lighter background color
            border: '1px solid #ccc', // Lighter border
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <h2 className="text-center mb-4 text-dark">Submit Leave Request</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">
                Reason:
              </label>
              <input
                type="text"
                id="reason"
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ transition: 'background-color 0.3s ease' }}
            >
              Submit
            </button>
            <Link
              to="/LeaveRequestStatus"
              className="btn btn-primary w-100"
              style={{ transition: 'background-color 0.3s ease',marginTop: '20px'}}


            >

Leave Request Status
            </Link>
          </form>
          {message && <p className="mt-3 text-center">{message}</p>}
        </div>

      </div>
    </>
  );
};

export default LeaveRequest;
