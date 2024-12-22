import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './UserPanel/Registration'; // Default import
import Dashboard from './UserPanel/Dashboard'; // Default import
import MarkAttendance from './UserPanel/MarkAttendance'; // Default import
import EditProfile from './UserPanel/EditProfile'; // Default import
import AdminDashboard from './AdminPanel/AdminDashboard'; // Default import
import ViewUserAttendance from './AdminPanel/ViewUserAttendance'; // Default import
import Reports from './AdminPanel/Reports'; // Default import
import LeaveApproval from './AdminPanel/LeaveApproval'; 
import Leaverequest from './UserPanel/Leaverequest'; // Default import
import LoginForm from './UserPanel/LoginForm';

import Profile from './UserPanel/Profile';
import AdminProfile from './AdminPanel/AdminProfile';
import LeaveRequestStatus from './UserPanel/LeaveRequestStatus';


const App = () => {
  return (
    <Router>
      <div>
      
          

        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/admin/view-user-attendance" element={<ViewUserAttendance />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/leave-approval" element={<LeaveApproval />} />
          <Route path="/leave-requset" element={<Leaverequest />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/Profile" element={<Profile />} />
     
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/LeaveRequestStatus" element={<LeaveRequestStatus />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
