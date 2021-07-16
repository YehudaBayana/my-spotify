import React from 'react';
import styled, { css } from 'styled-components';
import { code } from '../App';

const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=057cdd5b992444f2858403e816dcae20&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const MyNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 100px;
`;

export const Button = styled.a`
  border: none;
  border-radius: 50px;
  padding: 14px 55px;
  font-size: 16px;
  font-weight: 800;
  background-color: white;
  color: darkgreen;
  box-shadow: 1px 1px 15px lightgray;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
    text-decoration: none;
  }
  ${(props) => {
    return props.pink
      ? css`
          background-color: hsl(322, 100%, 66%);
          color: white;
          font-size: 13px;
          padding: 14px 65px;
        `
      : null;
  }}
  @media (max-width:500px) {
    padding: 7px 32px;
  }
`;
const Img = styled.img`
  @media (max-width: 500px) {
    width: 30%;
  }
`;
const Navbar = () => {
  return (
    <div>
      <MyNavbar>
        <h2>Yehuda music</h2>
        {code ? <h3>user</h3> : <Button href={AUTH_URL}>try it free</Button>}
      </MyNavbar>
    </div>
  );
};

export default Navbar;
