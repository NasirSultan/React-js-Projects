import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="text-center mt-3">
      <button
        className={`btn ${theme === "light" ? "btn-dark" : "btn-light"
          }`}
        onClick={toggleTheme}
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default ThemeToggler;
