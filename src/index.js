import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { blue, grey, red } from "@mui/material/colors";

const theme = createTheme({
  // transitions: {
  //   duration: {
  //     shortest: 0, // Set all durations to 0 to disable transitions
  //     shorter: 0,
  //     short: 0,
  //     standard: 0,
  //     complex: 0,
  //     enteringScreen: 0,
  //     leavingScreen: 0,
  //   },
  // },
  palette: {
    // background: {
    //   default: "white", //'#d5a3a3', // Set the default background color
    // },
    // primary: {
    //   main: blue[500],
    // },
    // secondary: {
    //   main: grey[700],
    // },
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
