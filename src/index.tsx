import ReactDOM from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/ContextProvider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { myColors } from "./constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContextProvider";

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
    text: {
      primary: "#ffffff", // Default text color for dark mode
      secondary: "#cccccc", // Optional: lighter color for secondary text
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: myColors.background, // Apply background globally
          color: "#ffffff", // Apply text color globally
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: myColors.backgroundLP, // Default for Paper-based components
          color: "#ffffff", // Default text color for Paper
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false, // Disable the default maxWidth
      },
      styleOverrides: {
        root: {
          padding: 0, // Optional: remove padding for all containers
        },
      },
    },
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ContextProvider>
    </AuthProvider>
  </ThemeProvider>
);
