import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'; // Persist theme
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark'); // Apply dark mode
    } else {
      document.documentElement.classList.remove('dark'); // Remove dark mode
    }
    localStorage.setItem('darkMode', darkMode); // Save preference
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
