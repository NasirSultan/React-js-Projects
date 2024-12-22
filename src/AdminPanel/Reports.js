import React from 'react';

const Reports = () => {
  return (
    <div>
      <h2>Generate Reports</h2>
      <button onClick={() => alert('Attendance report generated!')}>
        Generate Attendance Report
      </button>
    </div>
  );
};

export default Reports;
