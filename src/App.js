import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import ThemeToggler from "./components/ThemeToggler";

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <div className="container mt-4">
        <UserProfile />
        <ThemeToggler />
      </div>
    </ThemeProvider>
  );
};

export default App;
