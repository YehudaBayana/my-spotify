import { useContext, useEffect } from 'react';
import { StoreContext } from '../components/context/ContextProvider';

const useFetchSearch = (spotifyApi, search, accessToken) => {
  const { dispatch } = useContext(StoreContext);
  useEffect(() => {
    if (!search) return dispatch({ type: 'setSearchResults', payload: [] });
    if (!accessToken) return;
    let cancel = false;
    spotifyApi
      .searchTracks(search)
      .then((res) => {
        if (cancel) return;
        dispatch({
          type: 'setSearchResults',
          payload: res.body.tracks.items.map((track) => {
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
          }),
        });
      })
      .then(() => {
        dispatch({ type: 'setIsLoading', payload: false });
      });
    return () => (cancel = true);
  }, [search, accessToken, dispatch, spotifyApi]);
};

const fetchAllTracks = (spotifyApi, dispatch) => {
  spotifyApi
    .getCategories({
      limit: 10,
      offset: 0,
      country: 'US',
    })
    .then(
      function (data) {
        console.log('chec', data.body);
        dispatch({
          type: 'setCategories',
          payload: data.body.categories.items,
        });
        data.body.categories.items.forEach((category) => {
          spotifyApi
            .getPlaylistsForCategory(category.id, {
              country: 'US',
              limit: 30,
              offset: 0,
            })
            .then(
              function (data) {
                dispatch({ type: 'setPlaylistDes', payload: category.name });
                dispatch({
                  type: 'setCategoryPlaylist',
                  payload: data.body.playlists.items,
                });
              },
              function (err) {
                console.log('Something went wrong!', err);
              }
            )
            .then(() => {
              dispatch({ type: 'setIsLoading', payload: false });
            });
        });
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );

  spotifyApi
    .getMe()
    .then(
      (data) => {
        dispatch({ type: 'setUserName', payload: data.body.display_name });

        spotifyApi.getUserPlaylists(data.body.id).then(
          (data) => {
            dispatch({ type: 'setUserPlaylists', payload: data.body.items });
          },
          (err) => {
            console.log('Something went wrong!', err);
          }
        );
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    )
    .then(() => {
      dispatch({ type: 'setIsLoading', payload: false });
    });

  spotifyApi
    .getMySavedTracks({
      market: 'ES',
      limit: 50,
      offset: 0,
    })
    .then((data) => {
      dispatch({
        type: 'setSavedTracks',
        payload: {
          items: data.body.items.map((item) => {
            return item.track;
          }),
        },
      });
    })
    .then(() => {
      dispatch({ type: 'setIsLoading', payload: false });
    });
};

const fetchPlaylistTracks = (spotifyApi, playlist, dispatch) => {
  spotifyApi
    .getPlaylistTracks(playlist?.id, {
      offset: 1,
      limit: 100,
      fields: 'items',
    })
    .then(
      (data) => {
        dispatch({
          type: 'setPlayList',
          payload: {
            items: data.body.items.map((item) => {
              return item.track;
            }),
          },
        });
      },
      (err) => {
        console.log('Something went wrong!', err);
      }
    );
};

export { useFetchSearch, fetchAllTracks, fetchPlaylistTracks };
