import React from 'react';
const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=057cdd5b992444f2858403e816dcae20&response_type=code&redirect_uri=https://yehudabayana.github.io/my-spotify/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const HeroSection = () => {
  return (
    <>
      <section className='hero'>
        <div className='hero-container'>
          <div className='hero-content'>
            <h1 className='hero-title'>only premium users can login.</h1>
            <a className='hero-button' href={AUTH_URL}>
              LOGIN WITH SPOTIFY
            </a>
            <div className='terms'>
              <span>*</span>
              <a
                href='https://www.spotify.com/us/'
                target='_blank'
                rel='noreferrer'
                className='hero-terms-link'
              >
                Terms and conditions
              </a>
              <span>apply.</span>
            </div>
          </div>
        </div>
      </section>
      <section className='albums'>
        <div className='albums-container'>
          <div className='albums-content'>
            <h2>Looking for music?</h2>
            <p>Start listening to the best new releases.</p>
            <a href={AUTH_URL}>
              <button>login with spotify</button>
            </a>
          </div>
          <div className='albums-cards-container'>
            <div className='album'>
              <img alt='' src='images/travis-scott.jpg' />
              <div className='album-info'>
                <h2>FRANCHISE (feat. Young Thug & M.I.A.)</h2>
                <h4>Travis Scott</h4>
                <a href={AUTH_URL}>PLAY NOW</a>
              </div>
            </div>
            <div className='album'>
              <img alt='' src='images/zayn.jpg' />
              <div className='album-info'>
                <h2>Better</h2>
                <h4>ZAYN</h4>
                <a href={AUTH_URL}>PLAY NOW</a>
              </div>
            </div>
            <div className='album'>
              <img alt='' src='images/joji.jpg' />
              <div className='album-info'>
                <h2>Nectar</h2>
                <h4>Joji</h4>
                <a href={AUTH_URL}>PLAY NOW</a>
              </div>
            </div>
            <div className='album'>
              <img alt='' src='images/jennifer-lopez.jpg' />
              <div className='album-info'>
                <h2>Pa Ti + Lonely</h2>
                <h4>Jennifer Lopez</h4>
                <a href={AUTH_URL}>PLAY NOW</a>
              </div>
            </div>
            <div className='album'>
              <img alt='' src='images/machine-gun-kelly.jpg' />
              <div className='album-info'>
                <h2>Tickets To My Downfall</h2>
                <h4>Machine Gun Kelly</h4>
                <a href={AUTH_URL}>PLAY NOW</a>
              </div>
            </div>
            <div className='album'>
              <img alt='' src='images/chris-stapleton.jpg' />
              <div className='album-info'>
                <h2>Cold</h2>
                <h4>Chris Stapleton</h4>
                <a href={AUTH_URL}>PLAY NOW</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
