import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import Playlist from './components/playlists/Playlist';
import './index.css';
import Navbar from './components/Navbar';
import { Switch, Route, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SavedTracks from './components/SavedTracks';
import Discover from './components/Discover';
import EachSlider from './components/EachSlider';
import SeeMore from './components/SeeMore';

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
  const [savedTracks, setSavedTracks] = useState();
  const [all, setAll] = useState();
  const [allUs, setAllUs] = useState();
  const [detail, setDetail] = useState();
  const [userPlaylists, setUserPlaylists] = useState();
  const [partyPlaylist, setPartyPlaylist] = useState([]);
  const [categories, setCategories] = useState();

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
          width='100%'
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
    // console.log(accessToken);
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

  const ppppp = [allUs, all, ...partyPlaylist];
  const [pppppDes, setPppppDes] = useState([
    'recommendation: ',
    "Israel's Top Hits: ",
  ]);

  function getOne(id) {
    let one;
    ppppp.forEach((play) => {
      if (play.find((item) => item.id === id)) {
        one = play.find((item) => item.id === id);
      }
    });

    setDetail(one);
    spotifyApi
      .getPlaylistTracks(one.id, {
        offset: 1,
        limit: 100,
        fields: 'items',
      })
      .then(
        function (data) {
          // console.log('The playlist contains these tracks', data.body);
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
    // console.log(playList);
  }

  useEffect(() => {
    if (!accessToken) return;
    setTimeout(() => {
      spotifyApi.getMe().then(
        function (data) {
          console.log(
            'Some information about the authenticated user',
            data.body
          );

          spotifyApi.getUserPlaylists(data.body.id).then(
            function (data) {
              // console.log('Retrieved playlists', data.body);
              setUserPlaylists(data.body.items);
            },
            function (err) {
              console.log('Something went wrong!', err);
            }
          );
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );

      spotifyApi
        .getCategories({
          limit: 10,
          offset: 0,
          country: 'US',
        })
        .then(
          function (data) {
            console.log('chec', data.body);
            setCategories(data.body.categories.items);
            data.body.categories.items.forEach((category) => {
              spotifyApi
                .getPlaylistsForCategory(category.id, {
                  country: 'US',
                  limit: 10,
                  offset: 0,
                })
                .then(
                  function (data) {
                    console.log(`${category.id} `, data.body);
                    setPppppDes((old) => [...old, category.name]);
                    setPartyPlaylist((old) => [
                      ...old,
                      data.body.playlists.items,
                    ]);
                  },
                  function (err) {
                    console.log('Something went wrong!', err);
                  }
                );
            });
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    }, 2000);
    spotifyApi
      .getFeaturedPlaylists({
        limit: 20,
        offset: 1,
        country: 'IL',
        timestamp: new Date().toISOString(),
      })
      .then(
        function (res) {
          // console.log(res.body);
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
          console.log('last ', res.body.playlists.items);
          setAllUs(res.body.playlists.items);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );

    spotifyApi
      .getMySavedTracks({
        market: 'ES',
        limit: 50,
        offset: 0,
      })
      .then((data) => {
        // console.log(data.body);
        setSavedTracks({
          items: data.body.items.map((item) => {
            return item.track;
          }),
        });
      });
  }, [accessToken]);

  let settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path='/'>
          <div
            className='flex-grow-1'
            style={{
              overflowY: 'auto',
              height: 'fit-content',
              marginTop: '55px',
            }}
          >
            {searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
          {ppppp.map((item, i) => {
            // if (item.length === 0) {
            //   return;
            // }
            console.log('item', item);
            return (
              <EachSlider
                key={i}
                allUs={item}
                AlbumImg={AlbumImg}
                getOne={getOne}
                setIsClicked={setIsClicked}
                des={pppppDes[i]}
              />
            );
          })}

          {/* carousel 2 end */}

          {/* gallery */}
          <article className='flow'>
            <h1>playlists</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, recusandae nemo earum tempora quos ratione asperiores
              illo fuga in officiis.
            </p>
            <div className='team'>
              <ul className='auto-grid' role='list'>
                {userPlaylists?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => {
                        setIsClicked((oldVal) => !oldVal);
                        return getOne(item.id);
                      }}
                    >
                      <a className='profile'>
                        {/* <h5 className='profile__name'>{item.description}</h5> */}
                        <p>{item.name}</p>
                        <AlbumImg
                          setIsClicked={setIsClicked}
                          imgUrl={item.images[0].url}
                          getOne={() => getOne(item.id)}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>

          {/* gallery end*/}

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
          <h1 style={{ marginTop: '77px' }}>saved tracks</h1>
          <SavedTracks chooseTrack={chooseTrack} playList={savedTracks} />
        </Route>
        <Route path='/discover'>
          <h1 style={{ marginTop: '77px' }}>party playlist</h1>
          <Discover
            partyPlaylist={partyPlaylist}
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
          <h1 style={{ marginTop: '77px' }}>party playlist</h1>

          <SeeMore
            partyPlaylist={ppppp}
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
      {/* {categories?.map((item) => {
        return (
          <>
            <h2>{item.name}</h2>
            <img src={item.icons[0].url} alt='' />
          </>
        );
      })} */}
      <div style={{ height: '30px', marginBottom: '70px' }}></div>
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
