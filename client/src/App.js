import Login from './Login';
import Dashboard from './Dashboard';
import styled from 'styled-components';

export const code = new URLSearchParams(window.location.search).get('code');

const Container = styled.div`
  max-width: 1125px;
  margin: 0 auto;
  padding: 0 22px;
`;

function App() {
  return (
    <>
      <Container>
        {/* <Navbar /> */}
        {code ? <Dashboard code={code} /> : <Login />}
      </Container>
    </>
  );
}

export default App;
