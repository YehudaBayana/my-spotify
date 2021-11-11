import { useState, useEffect, useRef, useContext } from 'react';
import useAuth from '../../customHooks/useAuth';
import Player from '../features/Player';
import TrackSearchResult from '../features/TrackSearchResult';
import '../../index.css';
import Mobile from '../features/mobile/Mobile';
import SideBar from '../features/sidebar/SideBar';
import { StoreContext } from '../context/ContextProvider';
import useFetchAllMusic from '../../customHooks/useFetchAllMusic';
import Navbar from '../features/Navbar';
import AppRouter from '../../AppRouter';

export default function Home({ code }) {
  const { state, dispatch } = useContext(StoreContext);
  const accessToken = useAuth(code);
  const searchRef = useRef('');
  const [playingTrack, setPlayingTrack] = useState();
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  function chooseTrack(track) {
    setPlayingTrack(track);
    dispatch({ type: 'setSearch', payload: '' });
    searchRef.current.value = '';
  }

  useFetchAllMusic(accessToken);

  function searchFocus() {
    searchRef.current.focus();
  }
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);
  return (
    <>
      {windowWith > 500 ? (
        <div className='siteWrapper'>
          <SideBar myFocus={searchFocus} />
          <div className='main'>
            <Navbar searchRef={searchRef} />
            <AppRouter chooseTrack={chooseTrack} />
            <div style={{ height: '30px', marginBottom: '70px' }}></div>
          </div>
        </div>
      ) : (
        <>
          <Mobile
            searchRef={searchRef}
            chooseTrack={chooseTrack}
            myFocus={searchFocus}
          />
          <div className='searchResultsWrapper'>
            {state.searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
        </>
      )}

      <div className='playerBackground'>
        <div className='playerSticky'>
          <div>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
          </div>
        </div>
      </div>
    </>
  );
}
