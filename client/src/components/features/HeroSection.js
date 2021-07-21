import React from 'react';
import styled, { css } from 'styled-components';
import '../../index.css';

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 14px 55px;
  font-size: 16px;
  font-weight: 800;
  background-color: #00598d;
  color: white;
  box-shadow: 1px 1px 15px lightgray;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
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

const Wrapper = styled.div`
  background-image: url('/challenge-web/images/bg-hero-desktop.svg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 40px;
  @media (max-width: 500px) {
    padding: 20px;
  }
`;
const HeroSectionTag = styled.section`
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 10px;
  @media (max-width: 500px) {
    grid-template-columns: 100%;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 500px) {
    align-items: center;
    text-align: center;
  }
`;
const H1 = styled.h1`
  font-size: 45px;
  line-height: 4.2rem;
  font-weight: 700;
  @media (max-width: 500px) {
    font-size: 30px;
    line-height: 3.2rem;
  }
`;
const P = styled.p`
  font-size: 18px;
  line-height: 2rem;
  font-weight: 700;
  margin: 40px 0;
  @media (max-width: 500px) {
    font-size: 17px;
    line-height: 1.5rem;
    font-weight: 100;
    color: darkslateblue;
    margin: 21px 0;
  }
`;

const Img = styled.img`
  width: 100%;
  margin-top: 55px;
`;

const HeroSection = () => {
  return (
    <>
      <Wrapper>
        <div className='container'>
          <HeroSectionTag>
            <HeroContent>
              <H1>
                listening <br /> is everything
              </H1>
              <P>
                if you don't have spotify premium account you can't listen to
                music in this website
              </P>
              <Button>sign in</Button>
            </HeroContent>
            <Img src='/illustration-mockups.svg' alt='' />
          </HeroSectionTag>
        </div>
      </Wrapper>
    </>
  );
};

export default HeroSection;
