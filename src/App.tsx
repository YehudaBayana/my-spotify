import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Home from "./pages/Home";
import LandingPage from "./pages/landingPage";
import useAuth from "./customHooks/useAuth";

export const code = new URLSearchParams(window.location.search).get("code");

export const Container = styled.div`
  /* max-width: 2000px; */
  margin: 0 auto;
  padding: 0 24px;
  @media (max-width: 500px) {
    padding: 0;
  }
`;

function App() {
  const accessToken = useAuth(code);

  return (
    <>
      <Router>
        <ScrollToTop />
        {accessToken ? (
          <Container>
            <Home accessToken={accessToken} />
          </Container>
        ) : (
          <>
            <LandingPage />
          </>
        )}
      </Router>
    </>
  );
}

export default App;
