import { useState, useEffect } from 'react';
import useAuth from '../../customHooks/useAuth';
import Player from '../features/Player';
import TrackSearchResult from '../features/TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node';
import Playlist from '../features/playlists/Playlist';
import '../../index.css';
import Navbar from '../features/Navbar';
import { Switch, Route } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SavedTracks from './SavedTracks';
import Discover from './Discover';
import EachSlider from '../features/EachSlider';
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

const spotifyApi = new SpotifyWebApi({
  clientId: '057cdd5b992444f2858403e816dcae20',
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
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

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    fetchSearch(spotifyApi, search, setSearchResults);
  }, [search, accessToken]);

  const [playlistDes, setPlaylistDes] = useState([]);

  function getOne(id) {
    let one;
    categoryPlaylist.forEach((play) => {
      if (play.find((item) => item.id === id)) {
        one = play.find((item) => item.id === id);
      }
    });

    setDetail(one);
    fetchPlaylistTracks(spotifyApi, one, setPlayList);
  }

  useEffect(() => {
    if (!accessToken) return;

    fetchUserPlaylists(spotifyApi, setUserPlaylists);
    fetchCategories(
      spotifyApi,
      setCategories,
      setPlaylistDes,
      setCategoryPlaylist
    );
    fetchSavedTracks(spotifyApi, setSavedTracks);
  }, [accessToken]);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path='/'>
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
            console.log('item', item);
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
        </Route>
        <Route path='/savedTracks'>
          <div style={{ maxWidth: '1125px', margin: '0 auto' }}>
            <div style={{ maxWidth: '400px' }}>
              <img
                src='https://images.unsplash.com/photo-1612820885398-03b96dab50a8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA0fHxoZWFydHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                alt=''
                width='100%'
              />
            </div>
          </div>
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
            partyPlaylist={categoryPlaylist}
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
      </Switch>
      <div style={{ height: '30px', marginBottom: '70px' }}></div>
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
