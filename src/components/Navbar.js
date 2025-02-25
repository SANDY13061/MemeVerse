import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Navbar = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`p-4 flex justify-between items-center w-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-800 text-white"
      }`}
    >
      {/* Logo */}
      <h1 className="text-xl font-bold">MemeVerse</h1>

      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <div
        className={`absolute md:static top-14 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 text-lg">
          <li>
            <Link to="/" className="block px-4 py-2 hover:bg-gray-700 rounded-md">
              Home
            </Link>
          </li>
          <li>
            <Link to="/explore" className="block px-4 py-2 hover:bg-gray-700 rounded-md">
              Explore
            </Link>
          </li>
          <li>
            <Link to="/upload" className="block px-4 py-2 hover:bg-gray-700 rounded-md">
              Upload
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700 rounded-md">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="block px-4 py-2 hover:bg-gray-700 rounded-md">
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>

      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="bg-gray-600 px-4 py-2 rounded-md hover:bg-gray-500 transition"
      >
        {darkMode ? "Dark Mode 🌙" : "Light Mode ☀"}
      </button>
    </nav>
  );
};

export default Navbar;
