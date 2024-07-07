import React from 'react';
import { clientId } from '../../constants';

const loaclUrl = "http://localhost:3000";

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-private',
  'user-read-email',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-read-collaborative',
  'app-remote-control',
  'streaming',
  'user-follow-modify',
  'user-follow-read'
];

const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${loaclUrl}/&scope=${scopes.join('%20')}`;

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
      {/* <section className='albums'>
        <div className='albums-container'>
          <div className='albums-content'>
            <h2>Looking for music?</h2>
            <p>you have to have premium account to continue to my project</p>
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
      </section> */}
    </>
  );
};

export default HeroSection;
