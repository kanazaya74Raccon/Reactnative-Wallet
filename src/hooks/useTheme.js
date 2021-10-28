//This handles the Theming of the application
import React, { createContext, useState } from "react";
import { lightTheme, darkTheme } from "../libs/Theme";

//create global context object
export const ThemeContext = createContext();

//Create provider
const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState({
    isLightTheme: true,
    lightTheme,
    darkTheme,
  });
  //This function handles theme toggling funcionality from light to dark
  const toggleTheme = () => {
    setTheme({ ...theme, isLightTheme: !theme.isLightTheme });
  };
  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
