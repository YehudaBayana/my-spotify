import { useState, useEffect, useRef } from 'react';
import useAuth from '../../customHooks/useAuth';
import Player from '../features/Player';
import TrackSearchResult from '../features/TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node';
import Playlist from '../features/playlists/Playlist';
import '../../index.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import SavedTracks from './SavedTracks';
import Discover from './Discover';
import EachSlider from '../features/eachSlider/EachSlider';
import SeeMore from '../features/SeeMore';
import Gallery from '../features/gallery/Gallery';
import {
  fetchSearch,
  fetchCategories,
  fetchUserPlaylists,
  fetchSavedTracks,
  fetchPlaylistTracks,
} from '../../customHooks/useFetchMusicInfo';
import AlbumImg from '../features/AlbumImg';
import Mobile from '../features/mobile/Mobile';
import SideBar from '../features/sidebar/SideBar';

const spotifyApi = new SpotifyWebApi({
  clientId: '057cdd5b992444f2858403e816dcae20',
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const searchRef = useRef('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [playList, setPlayList] = useState();
  const [savedTracks, setSavedTracks] = useState();
  const [detail, setDetail] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const [categoryPlaylist, setCategoryPlaylist] = useState([]);
  const [categories, setCategories] = useState();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
    searchRef.current.value = '';
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    fetchSearch(spotifyApi, search, setSearchResults, setIsLoading);
  }, [search, accessToken]);

  const [playlistDes, setPlaylistDes] = useState([]);

  function getOne(id) {
    let one;
    categoryPlaylist.forEach((play) => {
      if (play.find((item) => item.id === id)) {
        one = play.find((item) => item.id === id);
      }
    });
    if (userPlaylists.find((item) => item.id === id)) {
      one = userPlaylists.find((item) => item.id === id);
    }

    setDetail(one);
    fetchPlaylistTracks(spotifyApi, one, setPlayList);
  }

  useEffect(() => {
    if (!accessToken) return;

    fetchUserPlaylists(spotifyApi, setUserPlaylists, setUserName, setIsLoading);
    fetchCategories(
      spotifyApi,
      setCategories,
      setPlaylistDes,
      setCategoryPlaylist,
      setIsLoading
    );
    fetchSavedTracks(spotifyApi, setSavedTracks, setIsLoading);
  }, [accessToken]);

  function searchFocus() {
    searchRef.current.focus();
  }
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);
  return (
    <>
      {windowWith > 500 ? (
        <div className='siteWrapper'>
          <SideBar
            myFocus={searchFocus}
            userPlaylists={userPlaylists}
            setIsClicked={setIsClicked}
            getOne={getOne}
          />
          <div className='main'>
            <header>
              <div className='nav-left'>
                <input
                  ref={searchRef}
                  onChange={(e) => setSearch(e.target.value)}
                  className='nav-search'
                  type='text'
                  placeholder=' Search'
                />
              </div>
              <div className='nav-right'>
                <img
                  className='nav-image'
                  src='https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-22.jpg'
                  alt=''
                />
                <p className='username'>{userName}</p>
              </div>
            </header>
            <Switch>
              <Route exact path='/'>
                {isLoading ? (
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif'
                    alt=''
                  />
                ) : (
                  <>
                    <div className='searchResultsWrapper'>
                      {searchResults.map((track) => (
                        <TrackSearchResult
                          track={track}
                          key={track.uri}
                          chooseTrack={chooseTrack}
                        />
                      ))}
                    </div>
                    <hr />
                    {categoryPlaylist.map((item, i) => {
                      return (
                        <EachSlider
                          key={i}
                          allUs={item}
                          AlbumImg={AlbumImg}
                          getOne={getOne}
                          setIsClicked={setIsClicked}
                          des={playlistDes[i]}
                        />
                      );
                    })}
                    <Gallery
                      userPlaylists={userPlaylists}
                      setIsClicked={setIsClicked}
                      getOne={getOne}
                      AlbumImg={AlbumImg}
                    />
                    {isClicked && (
                      <Playlist
                        setIsClicked={setIsClicked}
                        chooseTrack={chooseTrack}
                        playList={playList}
                        detail={detail}
                      />
                    )}
                  </>
                )}
              </Route>
              <Route path='/savedTracks'>
                <SavedTracks chooseTrack={chooseTrack} playList={savedTracks} />
              </Route>
              <Route path='/discover'>
                <h1 style={{ marginTop: '77px' }}>party playlist</h1>
                <Discover
                  partyPlaylist={categories}
                  setIsClicked={setIsClicked}
                  getOne={getOne}
                  AlbumImg={AlbumImg}
                />
                {isClicked && (
                  <Playlist
                    setIsClicked={setIsClicked}
                    chooseTrack={chooseTrack}
                    playList={playList}
                    detail={detail}
                  />
                )}
              </Route>
              <Route path='/:id'>
                <SeeMore
                  categoryPlaylist={categoryPlaylist}
                  setIsClicked={setIsClicked}
                  getOne={getOne}
                  AlbumImg={AlbumImg}
                />
                {isClicked && (
                  <Playlist
                    setIsClicked={setIsClicked}
                    chooseTrack={chooseTrack}
                    playList={playList}
                    detail={detail}
                  />
                )}
              </Route>
              <Redirect to='/' />
            </Switch>
            <div style={{ height: '30px', marginBottom: '70px' }}></div>
          </div>
        </div>
      ) : (
        <>
          <Mobile
            searchRef={searchRef}
            setSearch={setSearch}
            userPlaylists={userPlaylists}
            categoryPlaylist={categoryPlaylist}
            playlistDes={playlistDes}
            setIsClicked={setIsClicked}
            isClicked={isClicked}
            Playlist={Playlist}
            getOne={getOne}
            chooseTrack={chooseTrack}
            playList={playList}
            detail={detail}
            myFocus={searchFocus}
          />
          <div className='searchResultsWrapper'>
            {searchResults.map((track) => (
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
