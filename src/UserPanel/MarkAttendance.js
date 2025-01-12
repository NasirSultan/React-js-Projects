import React, { useState, useEffect } from "react";
import { Card, Button, Table } from "react-bootstrap";
import Dashboard from "./Dashboard"; // Assuming you have a Dashboard component

const Attendance = () => {
  const [message, setMessage] = useState(""); // State to show success or error message
  const [attendanceList, setAttendanceList] = useState([]); // State to store fetched attendance records
  const [attendanceSummary, setAttendanceSummary] = useState({
    present: 0,
    absent: 0,
    leave: 0,
  }); // State to store attendance summary
  const token = localStorage.getItem("token"); // Retrieve token from localStorage (or wherever you store it)

  // Function to mark attendance
  const markAttendance = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
        body: JSON.stringify({ status: "present" }), // Mark attendance as present
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Attendance marked as present!"); // Show success message
        fetchAttendanceList(); // Refresh the attendance list
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to mark attendance.");
      }
    } catch (error) {
      setMessage("An error occurred while marking attendance.");
    }
  };

  // Function to fetch attendance history
  const fetchAttendanceList = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/attendance/history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const attendance = data.attendance || [];
        setAttendanceList(attendance); // Set the attendance list
        calculateAttendanceSummary(attendance); // Update summary statistics
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to fetch attendance history.");
      }
    } catch (error) {
      setMessage("An error occurred while fetching attendance history.");
    }
  };

  // Function to calculate attendance summary
  const calculateAttendanceSummary = (attendance) => {
    const summary = attendance.reduce(
      (acc, record) => {
        acc[record.status] = (acc[record.status] || 0) + 1;
        return acc;
      },
      { present: 0, absent: 0, leave: 0 }
    );
    setAttendanceSummary(summary);
  };

  // Fetch attendance history on component mount
  useEffect(() => {
    fetchAttendanceList();
  }, []);

  return (
    <>
      <Dashboard />

      <div
        style={{
          marginLeft: "250px", // Adjust for sidebar width
          padding: "20px",
          background: "#f8f9fa",
          marginTop: "20px",
        }}
      >
        <div style={{ width: "90%" }}>
          {/* Mark Attendance Section */}
          <Card className="mb-4" style={{ border: "1px solid #ddd" }}>
            <Card.Body>
              <Card.Title>Mark Attendance</Card.Title>
              <Button
                variant="primary"
                className="mt-3"
                onClick={markAttendance}
              >
                Mark Present
              </Button>
              {message && <p className="mt-3 text-success">{message}</p>}{" "}
              {/* Display message */}
            </Card.Body>
          </Card>

          {/* Attendance Summary Section */}
          <Card className="mb-4" style={{ border: "1px solid #ddd" }}>
  <Card.Body>
    <Card.Title>Attendance Summary</Card.Title>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #ddd",
        textAlign: "center", // Ensure text alignment is centered
      }}
    >
      <span
        style={{
          padding: "10px",
          flex: 1, // Make each section equal in width
          borderRight: "1px solid #ddd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Vertically center the text
        }}
      >
        <strong>Present:</strong> {attendanceSummary.present}
      </span>
      <span
        style={{
          padding: "10px",
          flex: 1,
          borderRight: "1px solid #ddd",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <strong>Absent:</strong> {attendanceSummary.absent}
      </span>
      <span
        style={{
          padding: "10px",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <strong>Leave:</strong> {attendanceSummary.leave}
      </span>
    </div>
  </Card.Body>
</Card>


          {/* Attendance History Section */}
          <Card style={{ border: "1px solid #ddd" }}>
            <Card.Body>
              <Card.Title>Attendance History</Card.Title>
              {attendanceList.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceList.map((record, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{record.date}</td>
                        <td>{record.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No attendance records found.</p>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Attendance;
