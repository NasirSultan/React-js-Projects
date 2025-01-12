import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";

const AttendanceReport = () => {
  const [userIds, setUserIds] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // API Token (replace with the actual token)
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setReport(null);

    // Prepare the request body
    const requestBody = {
      from_date: fromDate,
      to_date: toDate,
    };

    if (userIds) {
      requestBody.user_ids = userIds.split(",").map((id) => parseInt(id.trim()));
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/attendance-report-grade",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch the report");
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminDashboard />
      <div style={{ display: "flex" }}>
        {/* Sidebar Section */}
        <div
          style={{
            width: "250px",
            
            backgroundColor: "#f4f4f4",
            paddingTop: "20px",
            marginRight: "20px", // Add margin to separate the sidebar from the content
          }}
        >
         
        
         
        </div>

        {/* Main Content Section */}
        <div
          style={{
            flex: 1,
            paddingLeft: "20px",
            paddingRight: "10px",
            paddingTop: "20px",
            marginRight: '40px',
          }}
        >
          <h1 className="text-center">Attendance base Grade Report</h1>

          <form
            onSubmit={handleSubmit}
            className="mt-4 p-4"
            style={{
              border: "2px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="userIds" className="form-label">
               Student-IDs( optional):
                </label>
                <input
                  type="text"
                  id="userIds"
                  className="form-control"
                  value={userIds}
                  onChange={(e) => setUserIds(e.target.value)}
                  placeholder="e.g., 1, 2, 3"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="fromDate" className="form-label">
                  From Date:
                </label>
                <input
                  type="date"
                  id="fromDate"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="toDate" className="form-label">
                  To Date:
                </label>
                <input
                  type="date"
                  id="toDate"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "70%",
                  backgroundColor: "#007bff",
                  borderColor: "#007bff",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                }}
                disabled={loading}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#0056b3";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#007bff";
                  e.target.style.transform = "scale(1)";
                }}
              >
                {loading ? "Generating Report..." : "Generate Report"}
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger mt-4">{error}</div>}

          {report && (
            <div className="mt-5">
              <h3 className="text-center">Report Results</h3>
              <table className="table table-bordered table-hover mt-3">
                <thead className="table-dark">
                  <tr>
                    <th> ID</th>
                    <th>Student Name</th>
                    <th>Attendance Period</th>
                    <th>Presents </th>
                    <th>Absents </th>
                    <th>Leaves </th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.user_id}</td>
                      <td>{entry.user_name}</td>
                      <td>
                        {fromDate} to {toDate}
                      </td>
                      <td>{entry.present_days}</td>
                      <td>{entry.absent_days}</td>
                      <td>{entry.leave_days}</td>
                      <td>{entry.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AttendanceReport;
