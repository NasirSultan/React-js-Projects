import React, { useState, useEffect } from "react";
import { Card, Button, Form, ListGroup } from "react-bootstrap";
import Dashboard from "./Dashboard"; // Assuming you have a Dashboard component

const Attendance = () => {
  const [message, setMessage] = useState(""); // State to show success or error message
  const [attendanceList, setAttendanceList] = useState([]); // State to store fetched attendance records
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
        body: JSON.stringify({ status: "present" }), // Always mark as present
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
      const response = await fetch("http://127.0.0.1:8000/api/attendance/history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAttendanceList(data.attendance || []); // Assume `data.attendance` contains the list
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to fetch attendance history.");
      }
    } catch (error) {
      setMessage("An error occurred while fetching attendance history.");
    }
  };

  // Fetch attendance history on component mount
  useEffect(() => {
    fetchAttendanceList();
  }, []);

  return (
    <>
    <Dashboard />
    
    <div style={{ display: "flex", justifyContent: "center", height: "100vh", marginTop: "20px" }}>
     
      <div style={{ width: "80%" }}>
      
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Mark Attendance</Card.Title>
            <Form>
              {/* Always mark attendance as present */}
              <Button
                variant="primary"
                className="mt-3"
                onClick={markAttendance}
              >
                Mark Present
              </Button>
            </Form>
            {message && <p className="mt-3 text-success">{message}</p>} {/* Display message */}
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Attendance History</Card.Title>
            {attendanceList.length > 0 ? (
              <ListGroup>
                {attendanceList.map((record, index) => (
                  <ListGroup.Item key={index}>
                    <strong>Date:</strong> {record.date} | <strong>Status:</strong> {record.status}
                  </ListGroup.Item>
                ))}
              </ListGroup>
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
