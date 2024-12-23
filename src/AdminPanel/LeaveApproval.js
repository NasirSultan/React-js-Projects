// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import AdminDashboard from "./AdminDashboard"; 
import { Table, Button, Alert, Form, Container, Row, Col } from 'react-bootstrap';

const LeaveApproval = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const token = localStorage.getItem("token"); // Assumes token is saved in localStorage

    // Fetch leave requests from the API
    const fetchLeaveRequests = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/admin/manage-leave-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Authorization header with the token
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch leave requests');
            }

            const data = await response.json();
            setLeaveRequests(data.data);
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle approve/reject action
    const handleLeaveRequest = async (leaveId, status) => {
        try {
            const response = await fetch('http://localhost:8000/api/admin/manage-leave-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Authorization header with the token
                },
                body: JSON.stringify({
                    leave_id: leaveId,
                    status: status,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update leave request');
            }

            setSuccessMessage(`Leave request has been ${status}.`);

            // Fetch updated leave requests after approval/rejection
            fetchLeaveRequests();
        } catch (error) {
            setError(error.message);
        }
    };

    // UseEffect to fetch leave requests when component mounts
    useEffect(() => {
        if (token) {
            fetchLeaveRequests();
        }
    }, [token]);

    // Filter leave requests based on status
    const filteredLeaveRequests = leaveRequests.filter(request => {
        if (filterStatus === 'all') return true;
        return request.status === filterStatus;
    });

    return (
      <>
      <AdminDashboard/>

        <Container style={{ maxWidth: '90%', marginTop: '20px' }}>
            <div style={{ width: '90%', margin: '0 auto', padding: '20px', border: '1px  #ddd', borderRadius: '8px', transition: 'all 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.border = '1px solid #007bff'}
                onMouseLeave={(e) => e.currentTarget.style.border = '1px solid #ddd'}>

                <h1 className="my-4">Admin Leave Requests</h1>

                {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
                {successMessage && <Alert variant="success" onClose={() => setSuccessMessage(null)} dismissible>{successMessage}</Alert>}

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Table striped bordered hover responsive style={{ tableLayout: 'fixed' }}>
                    <thead>
                        <tr>
                            <th style={{ width: '20%' }}>Student Name</th>
                            <th style={{ width: '25%' }}>Leave Reason</th>
                            <th style={{ width: '20%' }}>Leave Date</th>
                            <th style={{ width: '15%' }}>Status</th>
                            <th style={{ width: '20%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaveRequests.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No leave requests</td>
                            </tr>
                        ) : (
                            filteredLeaveRequests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.user.name}</td>
                                    <td>{request.reason}</td>
                                    <td>{request.date}</td>
                                    <td>{request.status}</td>
                                    <td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Button 
                                            variant="success" 
                                            size="sm" 
                                            className="me-2" 
                                            onClick={() => handleLeaveRequest(request.id, 'approved')}
                                            style={{ flex: '1', marginRight: '5px' }}
                                        >
                                            Approve
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleLeaveRequest(request.id, 'rejected')}
                                            style={{ flex: '1', width: '100%' }}
                                        >
                                            Reject
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </Container>
        </>
    );
};

export default LeaveApproval;
