import Home from "./components/pages/Home";
import styled from "styled-components";
import LandingPage from "./components/pages/landingPage";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { StoreContext } from "./components/context/ContextProvider";
import { useContext, useState } from "react";
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
  let accessToken = useAuth(code);

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
