import React from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Wrapper */}
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Academic Management System</h1>
        

        {/* Buttons to navigate */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRedirect('/classlist')}
            className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Go to Class List
          </button>
          <button
            onClick={() => handleRedirect('/search')}
            className="btn btn-secondary bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Go to Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
