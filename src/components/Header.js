import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <header
      className={`p-3 text-center ${theme === "light" ? "bg-light text-dark" : "bg-dark text-white"
        }`}
    >
      <h1>React Context Example</h1>
    </header>
  );
};

export default Header;
