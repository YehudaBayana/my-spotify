import { useState, useEffect } from 'react';
import useAuth from './useAuth';
import Player from './Player';
import TrackSearchResult from './TrackSearchResult';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import Playlist from './components/playlists/Playlist';
import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    // console.log(playList);
  }

  useEffect(() => {
    if (!accessToken) return;
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
          // console.log(res.body);
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
        console.log(data.body);
        setSavedTracks({
          items: data.body.items.map((item) => {
            return item.track;
          }),
        });
      });
  }, [accessToken]);

  function Saved({ playList, chooseTrack }) {
    function handleClick(track) {
      chooseTrack(track);
    }
    return (
      <>
        {playList &&
          playList.items?.map((track, i) => {
            return (
              <>
                <img
                  onClick={() => handleClick(track)}
                  src={track.album.images[0].url}
                  alt=''
                  style={{ height: '64px', width: '64px' }}
                />
                <div
                  className='ml-3'
                  style={{ width: '30%', marginLeft: '10px' }}
                >
                  <div>{track.name}</div>
                  <div
                    style={{
                      color: 'lightgray',
                      fontSize: '0.9rem',
                      opacity: '0.7',
                      marginTop: '8px',
                    }}
                  >
                    {track.album?.artists[0].name}
                  </div>
                </div>
                <div
                  style={{ width: '30%', textAlign: 'center' }}
                  className='ml-3'
                >
                  {track.album.name}
                </div>
                <div
                  style={{ width: '20%', textAlign: 'center' }}
                  className='ml-3'
                >
                  {track.album.release_date}
                </div>
              </>
            );
          })}
      </>
    );
  }
  let settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  return (
    <>
      <Router>
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
            {/* <div style={{ marginTop: '55px' }}>
              <h2>recommendation: </h2>
            </div> */}
            {/* <section class='slider'>
              <ul id='autoWidth'>
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
            </section> */}
            {/* carousel 2 */}
            <Container style={{ margin: '40px 0' }}>
              <h2>recommendation</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '10px auto',
                  // padding: '0 20px',
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptate, quasi!
                </p>
                <Link
                  to='/'
                  style={{
                    backgroundColor: '#6fc1ff',
                    height: 'fit-content',
                    padding: ' 6px 24px',
                    borderRadius: '5px',
                    boxShadow: '1px 1px 15px lightgrey',
                  }}
                >
                  see all
                </Link>
              </div>
              <Slider {...settings}>
                {allUs?.map(function (item) {
                  return (
                    <>
                      <Link to='/'>
                        <Col>
                          <Card
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <div style={{ width: '200px' }}>
                              <AlbumImg
                                setIsClicked={setIsClicked}
                                imgUrl={item.images[0].url}
                                getOne={() => getOne(item.id)}
                              />
                            </div>
                            <Card.Body>
                              <span>{item.name}</span>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Link>
                    </>
                  );
                })}
              </Slider>
            </Container>
            <hr />
            <Container style={{ margin: '40px 0' }}>
              <h2>Israel's top tracks</h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '10px auto',
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, veritatis!
                </p>
                <Link
                  to='/'
                  style={{
                    backgroundColor: '#6fc1ff',
                    height: 'fit-content',
                    padding: ' 6px 24px',
                    borderRadius: '5px',
                    boxShadow: '1px 1px 15px lightgrey',
                  }}
                >
                  see all
                </Link>
              </div>
              <Slider {...settings}>
                {all?.map(function (item) {
                  return (
                    <>
                      <Link to='/'>
                        <Col>
                          <Card
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'column',
                            }}
                          >
                            <div style={{ width: '200px' }}>
                              <AlbumImg
                                setIsClicked={setIsClicked}
                                imgUrl={item.images[0].url}
                                getOne={() => getOne(item.id)}
                              />
                            </div>
                            <Card.Body>
                              <span>{item.name}</span>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Link>
                    </>
                  );
                })}
              </Slider>
            </Container>
            {/* carousel 2 end */}

            {/* gallery */}
            <article className='flow'>
              <h1>playlists</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur, recusandae nemo earum tempora quos ratione
                asperiores illo fuga in officiis.
              </p>
              <div className='team'>
                <ul className='auto-grid' role='list'>
                  {all?.map((item) => {
                    return (
                      <li
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
            <Saved chooseTrack={chooseTrack} playList={savedTracks} />
          </Route>
        </Switch>
      </Router>
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
