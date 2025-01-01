import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import LandingPage from "./pages/landingPage";
import useAuth from "./customHooks/useAuth";
import Home from "./pages/home/Home";
//
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Container as YudaContainer,
} from "@mui/material";
import AppLayout from "./appLayout/AppLayout";
import { useRef } from "react";
// import { makeStyles } from '@mui/styles';
//

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
  // const { accessToken, setAccessToken } = useAuthContext();
  // useAuth(code, setAccessToken);
  const iframeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Router>
        {/* <ScrollToTop /> */}
        {/* {accessToken ? (
          <Container>
            <Home />
          </Container>
        ) : (
          <> */}
        <Container>
          <AppLayout divRef={iframeRef} />
        </Container>
        {/* <NewLandingPage /> */}
        {/* <LandingPage /> */}
        {/* </>
        )} */}
      </Router>
    </>
  );
}

export default App;

// const [playingTrack, setPlayingTrack] = useState();
// const [embedControllerState, setEmbedControllerState] = useState();
// useEffect(() => {
//   const windowOnSpotifyIframeApiReady = (IFrameAPI) => {
//     const element = iframeRef.current;
//     const options = {
//       width: '100%',
//       height: '500px',
//       uri: 'spotify:episode:7makk4oTQel546B0PZlDM5', // Set default episode here (or null)
//     };

//     const callback = (EmbedController) => {
//       setEmbedControllerState(EmbedController);
//     };

//     IFrameAPI.createController(element, options, callback);
//   };

//   window.onSpotifyIframeApiReady = windowOnSpotifyIframeApiReady;

//   return () => {
//     window.onSpotifyIframeApiReady = null;
//   };
// }, []);
