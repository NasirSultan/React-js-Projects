import React from 'react';

const ViewUserAttendance = () => {
  // Sample user data, you can fetch this from a database or API
  const user = {
    name: 'John Doe',
    attendance: ['Present', 'Absent', 'Present', 'Present', 'Absent'],
  };

  return (
    <div>
      <h2>Attendance for {user.name}</h2>
      <ul>
        {user.attendance.map((status, index) => (
          <li key={index}>
            Day {index + 1}: {status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewUserAttendance;
