import { createContext, useEffect, useState } from "react";

const lightTheme = {
  name: "light",
  color: "rgb(15, 15, 15)",
  background: "white",
  mid: "rgb(170, 170, 170)",
  transparent: "rgba(255,255,255,0.3)",
};
const darkTheme = {
  name: "dark",
  color: "rgb(255, 255, 255)",
  background: "rgb(10, 15, 20)",
  mid: "rgb(45, 45, 45)",
  transparent: "rgba(0,0,0,0.3)",
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  //THEME
  const [theme, setTheme] = useState({ ...darkTheme });
  const toggleTheme = () => {
    if (theme.name === "dark") {
      setTheme({ ...lightTheme });
    } else {
      setTheme({ ...darkTheme });
    }
  };

  //LANGUAGE
  const [language, setLanguage] = useState("EN");
  const toggleLanguage = () => {
    if (language === "EN") {
      setLanguage("FR");
      localStorage.setItem("Language", "FR");
    } else {
      setLanguage("EN");
      localStorage.setItem("Language", "EN");
    }
  };
  useEffect(() => {
    const lang = localStorage.getItem("Language");
    lang && setLanguage(lang);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, language, toggleLanguage }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
