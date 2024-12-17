import React, { useState, useEffect, useCallback } from 'react';

const ClassroomSearch = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [classrooms, setClassrooms] = useState([]); // State to store the search results
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(''); // State to handle error message

  // Function to fetch classrooms based on the search term
  const fetchClassrooms = useCallback(async () => {
    if (searchTerm.trim() === '') {
      setClassrooms([]); // Clear classrooms if search term is empty
      return;
    }

    setLoading(true); // Set loading to true when the request starts
    setError(''); // Clear any previous errors

    try {
      const response = await fetch(`http://localhost:8000/api/classroom?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch classrooms');
      }
      const data = await response.json(); // Parse JSON from the response
      console.log(data); // Log the API response to check the structure
      setClassrooms(data); // Set the classrooms state with the API response
    } catch (err) {
      setError('Error fetching classrooms. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  }, [searchTerm]); // Use searchTerm as a dependency

  // Handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  // Trigger search when the user presses the Enter key
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    fetchClassrooms(); // Call the fetch function
  };

  // Optionally, you can trigger the search automatically as the user types
  useEffect(() => {
    if (searchTerm !== '') {
      const timeoutId = setTimeout(() => {
        fetchClassrooms();
      }, 500); // Delay the API call to avoid unnecessary requests while typing
      return () => clearTimeout(timeoutId); // Clear timeout on unmount or before next call
    } else {
      setClassrooms([]); // Clear classrooms if search term is empty
    }
  }, [searchTerm, fetchClassrooms]); // Add fetchClassrooms to the dependency array

  return (
    <div className="container-wrapper" style={{ margin: '20px', borderRadius: '8px' }}>
      <div className="container">
        <div className="row justify-content-center my-5">
          <div className="col-12 col-md-8">
            <h1 className="text-center" style={{ width: '80%', margin: '0 auto' }}>Smart Search Portal</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <form onSubmit={handleSearchSubmit} className="d-flex align-items-center" style={{ width: '70%', margin: '0 auto' }}>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by class name or subject..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button type="submit" className="btn btn-primary ms-3">
                Search
              </button>
            </form>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

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
                {classrooms.filter(classroom => 
                  classroom.classroom_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  classroom.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((classroom) => (
                  <tr key={classroom.classroom_id}>
                    <td>{classroom.classroom_name}</td>
                    <td>{classroom.student_name || 'No student assigned'}</td>
                    <td>{classroom.subject_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <p>{searchTerm ? 'No classrooms found' : 'Please enter a search term'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassroomSearch;
