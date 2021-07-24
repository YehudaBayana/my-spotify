import React from 'react';

const Header = () => {
  return (
    <>
      <header className='headerL'>
        <div className='header-container'>
          <div className='header-logo'>
            <img alt='' src='images/spotify-logo.svg' />
          </div>
          <nav className='nav-mobile'>
            <div className='profileL'>
              <svg viewBox='0 0 1024 1024' className='profileL-icon'>
                <path d='M730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084Q106.388 763.84 84.96 802.41t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z'></path>
              </svg>
            </div>
            <input type='checkbox' className='toggler' />
            <div className='hamburger-menu'>
              <div></div>
            </div>
            <div className='menu'>
              <div className='background-overlay'></div>
              <div className='menu-overlay'>
                <ul>
                  <li>
                    <a
                      href='https://www.spotify.com/us/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Premium
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.spotify.com/us/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Help
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.spotify.com/us/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Download
                    </a>
                  </li>
                  <li role='separator'></li>
                  <li>
                    <a
                      href='https://www.spotify.com/us/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Account
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.spotify.com/us/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Log out
                    </a>
                  </li>
                </ul>
                <div className='menu-overlay-logo'>
                  <img alt='' src='images/spotify-logo.svg' />
                </div>
              </div>
            </div>
          </nav>
          <nav className='nav-desktop'>
            <ul>
              <li>
                <a
                  href='https://www.spotify.com/us/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Premium
                </a>
              </li>
              <li>
                <a
                  href='https://www.spotify.com/us/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  href='https://www.spotify.com/us/'
                  target='_blank'
                  rel='noreferrer'
                >
                  Download
                </a>
              </li>
              <li role='separator'></li>
            </ul>
            <div className='profileL-container'>
              <input type='checkbox' className='dropdown-menu-toggler' />
              <div className='dropdown-menu'>
                <ul>
                  <li>
                    <a
                      href='https://www.spotify.com/us/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Account
                    </a>
                  </li>
                  <li>
                    <a
                      href='https://www.spotify.com/us/'
                      target='_blank'
                      rel='noreferrer'
                    >
                      Log out
                    </a>
                  </li>
                </ul>
              </div>
              <div className='profileL'>
                <svg viewBox='0 0 1024 1024' className='profileL-icon'>
                  <path d='M730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084Q106.388 763.84 84.96 802.41t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z'></path>
                </svg>
              </div>
              <ul>
                <li>ProfileL</li>
                <li>
                  <svg viewBox='0 0 1024 1024' className='profileL-arrow'>
                    <path d='M476.455 806.696L95.291 425.532Q80.67 410.911 80.67 390.239t14.621-34.789 35.293-14.117 34.789 14.117L508.219 698.8l349.4-349.4q14.621-14.117 35.293-14.117t34.789 14.117 14.117 34.789-14.117 34.789L546.537 800.142q-19.159 19.159-38.318 19.159t-31.764-12.605z'></path>
                  </svg>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {/* <a classNameName='signIn' href={AUTH_URL}>
          Sign in with spotify
        </a>
       */}
    </>
  );
};

export default Header;
