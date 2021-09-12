import React from "react";
import NavBar from "./components/navBar/NavBar";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/global";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <React.Fragment>
        <GlobalStyles />
        <NavBar />
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
