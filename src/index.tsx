import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { ThemeProvider, createTheme} from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { myColors } from './constants';

const theme = createTheme({
  palette: {
    background: {
      default: myColors.background, //'#d5a3a3', // Set the default background color
    },
    primary: {
      main: myColors.main,
    },
    secondary: {
      main: myColors.secondary,
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
