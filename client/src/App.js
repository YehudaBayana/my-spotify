import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';

export const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return (
    <>
      <Container className='d-flex flex-column'>
        <Navbar />
        {code ? <Dashboard code={code} /> : <Login />}
      </Container>
    </>
  );
}

export default App;
