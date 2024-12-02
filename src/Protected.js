import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected({ Cmp }) {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('user-info');
    if (!userInfo) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <div>
      <Cmp /> {/* Ensure Cmp is a valid React component */}
    </div>
  );
}

export default Protected;



