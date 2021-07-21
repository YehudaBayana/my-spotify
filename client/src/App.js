import Dashboard from './components/pages/Dashboard';
import styled from 'styled-components';
import Header from './components/features/Header';
import HeroSection from './components/features/HeroSection';
import { HashRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
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
        <ScrollToTop />
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
