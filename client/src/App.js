import Dashboard from './Dashboard';
import styled from 'styled-components';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import { BrowserRouter as Router } from 'react-router-dom';

export const code = new URLSearchParams(window.location.search).get('code');

export const Container = styled.div`
  /* max-width: 2000px; */
  margin: 0 auto;
  padding: 0 22px;
`;

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        {code ? (
          <Container>
            <Dashboard code={code} />
          </Container>
        ) : (
          <>
            {' '}
            <Header />
            {/* <Login /> */}
            <HeroSection />
          </>
        )}
      </Router>
    </>
  );
}

export default App;
