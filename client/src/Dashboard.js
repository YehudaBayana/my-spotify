import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import Playlist from './components/playlists/Playlist';
import './index.css';

const spotifyApi = new SpotifyWebApi({
  clientId: '057cdd5b992444f2858403e816dcae20',
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [playList, setPlayList] = useState();
  const [all, setAll] = useState();
  const [allUs, setAllUs] = useState();
  const [detail, setDetail] = useState();

  function AlbumImg({ imgUrl, setIsClicked, getOne }) {
    return (
      <>
        <img
          onClick={() => {
            getOne();
            setIsClicked((oldvaue) => !oldvaue);
          }}
          src={imgUrl}
          alt=''
          // width='260px'
          // style={{ margin: '0 15px' }}
        />
      </>
    );
  }

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch('');
    setLyrics('');
  }

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get('http://localhost:3001/lyrics', {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    console.log(accessToken);
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  let israelis = [];

  function getOne(id) {
    let one;
    if (all.find((item) => item.id === id)) {
      one = all.find((item) => item.id === id);
    } else {
      one = allUs.find((item) => item.id === id);
    }
    setDetail(one);
    spotifyApi
      .getPlaylistTracks(one.id, {
        offset: 1,
        limit: 100,
        fields: 'items',
      })
      .then(
        function (data) {
          console.log('The playlist contains these tracks', data.body);
          setPlayList({
            items: data.body.items.map((item) => {
              return item.track;
            }),
          });
          // setIsraeliPlaylists({ items: israelis[0] });
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    console.log(playList);
  }

  function getSome() {
    spotifyApi
      .getFeaturedPlaylists({
        limit: 20,
        offset: 1,
        country: 'IL',
        timestamp: new Date().toISOString(),
      })
      .then(
        function (res) {
          console.log(res.body);
          setAll(res.body.playlists.items);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    spotifyApi
      .getFeaturedPlaylists({
        limit: 20,
        offset: 1,
        country: 'US',
        timestamp: new Date().toISOString(),
      })
      .then(
        function (res) {
          console.log(res.body);
          setAllUs(res.body.playlists.items);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
  }

  return (
    <>
      <div
        className='d-flex flex-column py-2'
        style={{ height: 'fit-content' }}
      >
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <Container
            className='d-flex flex-column py-2 '
            style={{ height: 'fit-content' }}
          >
            <Form.Control
              type='search'
              placeholder='Search Songs/Artists'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Container>
        </div>
      </div>
      <div
        className='flex-grow-1 my-2'
        style={{ overflowY: 'auto', height: 'fit-content' }}
      >
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <div>
        <h2>recommendation: </h2>
        <button
          onClick={() => {
            getSome();
          }}
        >
          fetch all music
        </button>
      </div>
      <section class='slider'>
        <ul id='autoWidth' class='cs-hidden'>
          {allUs?.map((item) => {
            return (
              <>
                <li class='item-a'>
                  <div class='box'>
                    <div class='slide-img'>
                      <AlbumImg
                        setIsClicked={setIsClicked}
                        imgUrl={item.images[0].url}
                        getOne={() => getOne(item.id)}
                      />
                      <div class='overlay'>
                        <button
                          onClick={() => {
                            setIsClicked((oldVal) => !oldVal);
                            return getOne(item.id);
                          }}
                          class='open-btn'
                        >
                          open playlist
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
          {all?.map((item) => {
            return (
              <>
                <li class='item-a'>
                  <div class='box'>
                    <div class='slide-img'>
                      <AlbumImg
                        setIsClicked={setIsClicked}
                        imgUrl={item.images[0].url}
                        getOne={() => getOne(item.id)}
                      />
                      <div class='overlay'>
                        <button
                          onClick={() => {
                            setIsClicked((oldVal) => !oldVal);
                            return getOne(item.id);
                          }}
                          class='open-btn'
                        >
                          open playlist
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </section>

      {isClicked && (
        <Playlist
          setIsClicked={setIsClicked}
          chooseTrack={chooseTrack}
          playList={playList}
          detail={detail}
        />
      )}
      <div
        style={{
          position: 'fixed',
          bottom: '0px',
          width: '71%',
          left: '14.5%',
          zIndex: '9999',
        }}
      >
        <div>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
    </>
  );
}
