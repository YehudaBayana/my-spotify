import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "white", //'#d5a3a3', // Set the default background color
    },
    primary: {
      main: blue[500],
    },
    secondary: {
      main: grey[200],
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ContextProvider>
      <App />
    </ContextProvider>
  </ThemeProvider>
);
