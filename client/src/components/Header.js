import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=057cdd5b992444f2858403e816dcae20&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const HeaderTag = styled.div`
  margin: 0;
  padding: 60px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  position: relative;
  height: 70vh;
  margin-top: 50px;

  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29uZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=60');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -9;
  }
  &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 140px;
    left: 0;
    bottom: -80px;
    background-color: white;
    z-index: 9;
    transform: skewY(-3deg);
  }
`;

const Header = () => {
  return (
    <>
      <Navbar />
      <HeaderTag>
        <h1>Header</h1>
        <p>My supercool header</p>

        <a
          style={{
            backgroundColor: '#6fc1ff',
            height: 'fit-content',
            padding: ' 10px 34px',
            borderRadius: '5px',
            boxShadow: '1px 1px 15px black',
            marginTop: '100px',
            fontSize: '20px',
            color: 'black',
            display: 'inline-block',
          }}
          href={AUTH_URL}
        >
          sign in with spotify
        </a>
      </HeaderTag>
    </>
  );
};

export default Header;
