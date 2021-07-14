import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Navbar from './components/Navbar';
import styled from 'styled-components';

export const code = new URLSearchParams(window.location.search).get('code');

const Sidenav = styled.div`
  height: 100%;
  width: 220px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;

  a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
  }

  a:hover {
    color: #f1f1f1;
  }
`;
function App() {
  return (
    <>
      <Sidenav>
        <a href='#about'>About</a>
        <a href='#services'>Services</a>
        <a href='#clients'>Clients</a>
        <a href='#contact'>Contact</a>
      </Sidenav>
      <Navbar />
      {code ? <Dashboard code={code} /> : <Login />}
    </>
  );
}

export default App;
