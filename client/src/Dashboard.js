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
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const [lyrics, setLyrics] = useState('');
  const [playList, setPlayList] = useState();
  const [playList1, setPlayList1] = useState();
  const [playList2, setPlayList2] = useState();
  const [playList3, setPlayList3] = useState();
  const [israeliPlaylists, setIsraeliPlaylists] = useState();

  function AlbumImg({ imgUrl, setIsClicked }) {
    return (
      <>
        <img
          onClick={() => setIsClicked((oldvaue) => !oldvaue)}
          src={imgUrl}
          alt=''
          width='20%'
          style={{ margin: '0 15px' }}
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

    // spotifyApi.getArtistAlbums('50co4Is1HCEo8bhOyUWKpn').then(
    //   function (data) {
    //     console.log('Artist albums', data.body.items);
    //     spotifyApi
    //       .getAlbumTracks(data.body.items[0].id, { limit: 20, offset: 1 })
    //       .then(
    //         function (data) {
    //           console.log(data.body);
    //           setPlayList3((old) => [...old, data.body]);
    //         },
    //         function (err) {
    //           console.log('Something went wrong!', err);
    //         }
    //       );
    //   },
    //   function (err) {
    //     console.error(err);
    //   }
    // );

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

  function getSome() {
    // spotifyApi.getPlaylist('37i9dQZF1E38R5RgAFSVxR').then(
    //   function (data) {
    //     console.log('Some information about this playlist', data.body);
    //   },
    //   function (err) {
    //     console.log('Something went wrong!', err);
    //   }
    // );

    spotifyApi
      .getFeaturedPlaylists({
        limit: 20,
        offset: 1,
        country: 'IL',
        timestamp: '2020-10-23T09:00:00',
      })
      .then(
        function (res) {
          console.log(res.body);
          res.body.playlists.items.forEach((iterator) => {
            spotifyApi
              .getPlaylistTracks(iterator.id, {
                offset: 1,
                limit: 50,
                fields: 'items',
              })
              .then(
                function (data) {
                  console.log('The playlist contains these tracks', data.body);
                  israelis.push(
                    data.body.items.map((item) => {
                      return item.track;
                    })
                  );
                  console.log(israelis);
                  setIsraeliPlaylists({ items: israelis[0] });
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
    // console.log(israelis);
    (async () => {
      const me = await spotifyApi.getMe();
      // console.log(me.body);
      getUserPlaylists(me.body.id);
    })().catch((e) => {
      console.error(e);
    });
  }

  let playlists = [];
  //GET MY PLAYLISTS
  async function getUserPlaylists(userName) {
    const data = await spotifyApi.getUserPlaylists(userName);

    // console.log('---------------+++++++++++++++++++++++++');
    // console.log(data.body.items);

    for (let playlist of data.body.items) {
      // console.log(playlist.name + ' ' + playlist.id);
      let items = await getPlaylistTracks(playlist.id, playlist.name);
      const tracksJSON = { items };
      playlists.push(tracksJSON);
      // console.log(tracksJSON);
    }
    setPlayList2(playlists[0]);
    setPlayList1(playlists[1]);
    setPlayList(playlists[2]);
    console.log(playlists);
    // console.log(israeliPlaylists);
  }

  //GET SONGS FROM PLAYLIST
  async function getPlaylistTracks(playlistId, playlistName) {
    const data = await spotifyApi.getPlaylistTracks(playlistId, {
      offset: 1,
      limit: 100,
      fields: 'items',
    });
    let tracks = [];

    for (let track_obj of data.body.items) {
      const track = track_obj.track;
      tracks.push(track);
    }

    console.log('---------------+++++++++++++++++++++++++');
    return tracks;
  }
  // function getSome1() {
  //   (async () => {
  //     const me = await spotifyApi.getMe();
  //     // console.log(me.body);
  //     getUserPlaylists1();
  //   })().catch((e) => {
  //     console.error(e);
  //   });
  // }

  // //GET MY PLAYLISTS
  // async function getUserPlaylists1() {
  //   const data = await spotifyApi.getArtistAlbums('1HY2Jd0NmPuamShAr6KMms');
  //   console.log('---------------+++++++++++++++++++++++++');
  //   console.log(data.body['items']);

  //   // for (let playlist of data.body.items) {
  //   //   // console.log(playlist.name + ' ' + playlist.id);
  //   //   let tracks = await getPlaylistTracks(playlist.id, playlist.name);
  //   //   const tracksJSON = { tracks };
  //   //   // playlists.push(tracksJSON);
  //   //   console.log(tracksJSON);
  //   // }
  //   // setPlayList2(playlists[0]);
  //   // setPlayList1(playlists[1]);
  //   // setPlayList(playlists[2]);
  //   // console.log(playlists);
  // }

  // //GET SONGS FROM PLAYLIST
  // async function getPlaylistTracks(playlistId, playlistName) {
  //   const data = await spotifyApi.getPlaylistTracks(playlistId, {
  //     offset: 1,
  //     limit: 100,
  //     fields: 'items',
  //   });
  //   let tracks = [];

  //   for (let track_obj of data.body.items) {
  //     const track = track_obj.track;
  //     tracks.push(track);
  //   }

  //   console.log('---------------+++++++++++++++++++++++++');
  //   return tracks;
  // }

  return (
    <>
      {console.log(israelis)}
      <div
        className='d-flex flex-column py-2 margin-le'
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
        className='flex-grow-1 my-2 margin-le'
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
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div className='margin-le'>
          <h2>recommendation: </h2>
          <button
            onClick={() => {
              getSome();
            }}
          >
            fetch all music
          </button>
        </div>
      </div>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div
          className='d-flex flex-row py-2 justify-content-start align-items-start margin-le'
          style={{ height: 'calc(100vh - 123px)' }}
        >
          <AlbumImg
            setIsClicked={setIsClicked}
            imgUrl={
              playList?.items[3].album.images[1].url
              // playList.items[3].album.images[1].url
            }
          />
          <AlbumImg
            setIsClicked={setIsClicked1}
            imgUrl={playList1?.items[3].album.images[1].url}
          />
          <AlbumImg
            setIsClicked={setIsClicked2}
            imgUrl={playList2?.items[3].album.images[1].url}
          />
          <AlbumImg
            setIsClicked={setIsClicked3}
            imgUrl={israeliPlaylists?.items[3].album.images[1].url}
          />
        </div>
      </div>

      {isClicked && (
        <Playlist
          setIsClicked={setIsClicked}
          chooseTrack={chooseTrack}
          playList={playList}
        />
      )}
      {isClicked1 && (
        <Playlist
          setIsClicked={setIsClicked1}
          chooseTrack={chooseTrack}
          playList={playList1}
        />
      )}
      {isClicked2 && (
        <Playlist
          setIsClicked={setIsClicked2}
          chooseTrack={chooseTrack}
          playList={playList2}
        />
      )}
      {isClicked3 && (
        <Playlist
          setIsClicked={setIsClicked3}
          chooseTrack={chooseTrack}
          playList={israeliPlaylists}
        />
      )}
      <div
        style={{
          position: 'sticky',
          bottom: '0px',
          width: '100%',
        }}
      >
        <div className='margin-le'>
          <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
        </div>
      </div>
    </>
  );
}
