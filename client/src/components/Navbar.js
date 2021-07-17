import React, { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  background-color: #00598d;
`;

const Wrapper = styled.div`
  max-width: 1140px;
  padding: 0 22px;
  margin: 0 auto;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  @media (min-width: 865px) {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const Ul = styled.ul`
  @media (min-width: 865px) {
    display: flex;
  }

  @media (max-width: 864px) {
    position: absolute;
    top: calc(100% + 35px);
    right: 0;
    left: 0;
    z-index: -1;
    background-color: #d9f0f7;
    visibility: hidden;
    opacity: 0;
    transform: translateY(-100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    .active {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const NavItem = styled.li`
  a {
    display: block;
    padding: 1rem;
    border-left: 4px solid transparent;
  }
  &:not(:last-child) {
    margin-right: 0.5rem;
  }
  @media (min-width: 865px) {
    &:first-child a {
      border-left: 1px solid white;
    }
    @media (min-width: 865px) {
      &.active a {
        /* box-shadow: inset 0 -4px 0 0 rgb(255, 255, 255); */
        /* opacity: 0.5; */
        background-color: #003d61;
      }
      a {
        border-right: 1px solid rgb(238, 238, 238);
        text-align: center;
        box-shadow: inset 0 -4px 0 0 transparent;
      }
    }
  }
`;

const SiteHeaderStart = styled.div`
  display: flex;
  align-items: center;
`;

const Brand = styled.a`
  font-weight: bold;
  font-size: 20px;
`;

const NavToggle = styled.button`
  display: none;

  @media (max-width: 864px) {
    display: block;
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`;

const Search = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const SearchToggle = styled.button`
  appearance: none;
  order: 1;
  font-size: 0;
  width: 34px;
  height: 34px;
  /* background: url("../img/header-3/search.svg") center right/22px no-repeat; */
  border: 0;
  display: none;
  @media (min-width: 865px) {
    border-left: 1px solid #979797;
    padding-left: 10px;
  }

  @media (max-width: 864px) {
    position: absolute;
    right: 5.5rem;
    top: 0.65rem;
    /* background: url("../img/header-3/search.svg") center/22px no-repeat; } } */
  }
`;

const SearchForm = styled.form`
  display: block;
  &.active {
    display: block;
  }
  @media (max-width: 864px) {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    input {
      width: 100%;
    }
  }
  input {
    min-width: 200px;
    appearance: none;
    border: 0;
    background-color: #fff;
    border-radius: 0;
    font-size: 16px;
    padding: 0.5rem;
  }
  @media (max-width: 864px) {
    input {
      border-bottom: 1px solid #979797;
    }
  }
`;

const Navbar = ({ search, setSearch }) => {
  const navWrapper = useRef(null);

  function myClick(e) {
    if (navWrapper.current.classList.contains('active')) {
      e.target.setAttribute('aria-expanded', 'false');
      e.target.setAttribute('aria-label', 'menu');
      navWrapper.current.classList.remove('active');
    } else {
      navWrapper.current.classList.add('active');
      e.target.setAttribute('aria-label', 'close menu');
      e.target.setAttribute('aria-expanded', 'true');
    }
  }

  return (
    <Header
      style={{
        position: 'fixed ',
        top: '0',
        left: '0',
        width: '100%',
        zIndex: '998',
      }}
    >
      <Wrapper>
        <SiteHeaderStart>
          <Brand>Yudafy</Brand>
          <Search>
            <SearchToggle aria-label='Open search'>Search</SearchToggle>
            <SearchForm className='search__form' action=''>
              <label className='sr-only' for='search'>
                Search
              </label>
              <input
                type='search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id='search'
                placeholder='search for songs or artists'
              />
            </SearchForm>
          </Search>
        </SiteHeaderStart>
        <SiteHeaderStart>
          <nav className='nav'>
            <NavToggle
              onClick={myClick}
              className='nav__toggle'
              aria-expanded='false'
              type='button'
            >
              menu
            </NavToggle>
            <Ul ref={navWrapper} id='aaa'>
              <NavItem className='active'>
                <Link to='/'>
                  <i className='fas fa-home'></i>
                  <span>Home</span>
                </Link>
              </NavItem>
              <NavItem className='nav__item'>
                <Link to='/savedTracks'>
                  <i className='fas fa-heart'></i>
                  <span>Liked songs</span>
                </Link>
              </NavItem>
            </Ul>
          </nav>
        </SiteHeaderStart>
      </Wrapper>
    </Header>
    // <div>
    //   <MyNavbar>
    //     <h2>Yehuda music</h2>
    //     {code ? <h3>user</h3> : <Button href={AUTH_URL}>try it free</Button>}
    //   </MyNavbar>
    // </div>
  );
};

export default Navbar;
