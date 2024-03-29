import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContextProvider from "./components/context/ContextProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[700],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider disableGutters theme={theme}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
