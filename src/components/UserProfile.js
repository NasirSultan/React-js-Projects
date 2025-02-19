import React from "react";

const UserProfile = () => {
  return (
    <div
      className="p-4 m-3 display-center"
      style={{
        backgroundColor: "#f8f9fa", // Light background color
        width: "100%",
        margin: "auto",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <h2>User Profile</h2>
      <p>Name: Nasir</p>
      <p>Address: Lahore, Pakistan</p>
      <p>Role: Full Stack Developer</p>
    </div>
  );
};

export default UserProfile;
