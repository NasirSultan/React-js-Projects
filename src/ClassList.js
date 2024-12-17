import React, { useState, useEffect } from 'react';

const ClassList = () => {
  const [classrooms, setClassrooms] = useState([]); // State to store the classrooms list
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(''); // State to handle error message

  // Function to fetch the list of classrooms
  const fetchClassrooms = async () => {
    setLoading(true); // Set loading to true when the request starts
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:8000/api/classrooms'); // Adjust API endpoint as necessary
      if (!response.ok) {
        throw new Error('Failed to fetch classrooms');
      }
      const data = await response.json(); // Parse JSON from the response
      setClassrooms(data); // Set the classrooms state with the API response
    } catch (err) {
      setError('Error fetching classrooms. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  // Fetch classrooms when the component mounts
  useEffect(() => {
    fetchClassrooms();
  }, []); // Empty dependency array to fetch classrooms only once

  return (
    <div className="container-wrapper" style={{ margin: '20px', borderRadius: '8px' }}>
      <div className="container">
        <div className="row justify-content-center my-5">
          <div className="col-12 col-md-8">
            <h1 className="text-center" style={{ width: '80%', margin: '0 auto' }}>Unified List View</h1>
          </div>
        </div>

        {loading && <p>Loading...</p>}

        {/* Error message centered */}
        {error && (
          <div
            className="error-message"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              textAlign: 'center',
              fontSize: '18px',
              color: '#ff4d4d', // Red color for error
              fontWeight: 'bold',
            }}
          >
            {error}
          </div>
        )}

        {classrooms.length > 0 ? (
          <div className="table-responsive my-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Classroom Name</th>
                  <th>
                    <i className="fas fa-user-graduate"></i> Student
                  </th>
                  <th>
                    <i className="fas fa-book"></i> Subject
                  </th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((classroom) => (
                  <tr
                    key={classroom.classroom_id}
                    style={{
                      border: '1px solid lightgray', // Light border around the row
                      transition: 'background-color 0.3s ease', // Smooth transition for background color
                    }}
                    className="classroom-row"
                  >
                    <td>{classroom.classroom_name}</td>
                    <td>{classroom.student_name}</td>
                    <td>{classroom.subject_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <p>No classrooms found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassList;
