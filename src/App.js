import Home from './components/pages/Home';
import styled from 'styled-components';
import LandingPage from './components/pages/landingPage';
import { HashRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
export const code = new URLSearchParams(window.location.search).get('code');

export const Container = styled.div`
  /* max-width: 2000px; */
  margin: 0 auto;
  padding: 0 22px;
  @media (max-width: 500px) {
    padding: 0;
  }
`;

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        {code ? (
          <Container>
            <Home code={code} />
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
