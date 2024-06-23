import { useContext, useEffect } from 'react';
import { StoreContext } from '../context/ContextProvider';
import { reducerActionTypes } from '../constants';

const useFetchSearch = (searchValue, setSearchRes, accessToken, type, setSelectedRes, bool) => {
  const { dispatch } = useContext(StoreContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!searchValue) return dispatch({ type: 'setSearchResults', payload: [] });
    if (!accessToken) return;
    const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow%2Cplaylist`;
    const data = await dynamicGetRequest(url, accessToken);
    setSearchRes(data);
    setSelectedRes(
      data[type].items.map((item) => {
        return item;
      })
    );
  }, [bool]);
};

export const useGetHomePagePlaylists = async (dispatch, accessToken) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!accessToken) return;
    const categories = await getCategories(accessToken, dispatch);
    let messages = [];
    let playlistsArr = [];
    categories.categories.items.forEach((category) => {
      getCategoryPlaylists(accessToken, category.id).then((data) => {
        messages.push(data.message);
        playlistsArr.push(data.playlists.items);
      });
    });
    dispatch({ type: 'setPlaylistDes', payload: messages });
    dispatch({
      type: reducerActionTypes.SET_GENRES,
      payload: playlistsArr,
    });
  }, []);
};

async function getCategories(accessToken, dispatch) {
  const url = 'https://api.spotify.com/v1/browse/categories?locale=US&offset=0&limit=1';
  const data = await dynamicGetRequest(url, accessToken);
  dispatch({
    type: 'setCategories',
    payload: data.categories.items,
  });
  return data;
}
async function getCategoryPlaylists(accessToken, categoryId) {
  const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
  return dynamicGetRequest(url, accessToken);
}

const fetchInitialData = async (spotifyApi, dispatch, accessToken) => {
  const user = await getUser(accessToken);
  dispatch({ type: reducerActionTypes.SET_USER_DETAILS, payload: user });

  const userAlbums = await getUserAlbums(accessToken);
  dispatch({
    type: reducerActionTypes.SET_USER_ALBUMS,
    payload: userAlbums.items.map((item) => item.album),
  });

  const userPlaylist = await getUserPlaylists(accessToken, user.id);
  dispatch({
    type: reducerActionTypes.SET_USER_PLAYLISTS,
    payload: userPlaylist.items,
  });

  const userSavedData = await getUserSavedTracks(accessToken);
  dispatch({
    type: reducerActionTypes.SET_SAVED_TRACKS,
    payload: {
      items: userSavedData.items.map((item) => {
        return item.track;
      }),
    },
  });
};

const fetchPlayableItems = async (accessToken, id, type) => {
  if (type === 'playlist') {
    const tracksRes = await getPlaylistTracks(accessToken, id);
    return tracksRes;
  } else if (type === 'album') {
    const tracksRes = await getAlbumTracks(accessToken, id);
    return tracksRes;
  }
};

export const fetchAlbumTracks = async (accessToken, AlbumId, dispatch) => {
  const tracksRes = await getAlbumTracks(accessToken, AlbumId);
  return tracksRes;
  // dispatch({
  //   type: reducerActionTypes.SET_ALBUM,
  //   payload: {
  //     items: tracksRes.items.map((item) => {
  //       return item;
  //     }),
  //   },
  // });
};

export function getUser(accessToken) {
  const url = 'https://api.spotify.com/v1/me';
  return dynamicGetRequest(url, accessToken);
}

function getUserSavedTracks(accessToken) {
  const url = 'https://api.spotify.com/v1/me/tracks';
  return dynamicGetRequest(url, accessToken);
}

function getUserPlaylists(accessToken, user_id) {
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
  return dynamicGetRequest(url, accessToken);
}

async function getPlaylistTracks(accessToken, playlist_id) {
  let nextUrl = `https://api.spotify.com/v1/playlists/${playlist_id}?limit=1000`;
  const tracks = [];
  let playlistRes; // = await dynamicGetRequest(nextUrl, accessToken);
  let isFirst = true;
  do {
    const data = await dynamicGetRequest(nextUrl, accessToken);
    // data = response;
    // console.log('data ', data);
    if (isFirst) {
      tracks.push(...data.tracks.items.map((item) => item.track)); // Extract tracks from each response
      nextUrl = data.tracks.next;
      playlistRes = data;
    } else {
      tracks.push(...data.items.map((item) => item.track));
      nextUrl = data.next;
    }
    isFirst = false;
  } while (nextUrl);

  return { tracks, playlistRes };
}

export function removeFromLibrary(accessToken, ids, type = 'playlist') {
  if (type === 'playlist') {
    const url = `https://api.spotify.com/v1/playlists/${ids[0]}/followers`;
    return dynamicDeleteRequest(url, accessToken);
  } else if (type === 'album') {
    const url = `https://api.spotify.com/v1/me/albums`;
    const body = {
      ids,
    };
    return dynamicDeleteRequest(url, accessToken, body);
  }
}

export function removeFromPlaylist(accessToken, playlist_id, tracksIds, snapshotId) {
  // if (type === "playlist") {
  // const url = `https://api.spotify.com/v1/playlists/${tracksIds[0]}/followers`;
  // return dynamicDeleteRequest(url, accessToken);
  // } else  if (type === "album"){
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  const body = {
    tracks: tracksIds,
    snapshotId,
  };
  return dynamicDeleteRequest(url, accessToken, JSON.stringify(body));
  // }
}

export function updatePlaylist(accessToken, playlist_id, body) {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  return dynamicUpdateRequest(url, accessToken, JSON.stringify(body));
}

export function addTracksToPlaylist(accessToken, playlist_id, body) {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  return dynamicAddRequest(url, accessToken, JSON.stringify(body));
}

function getUserAlbums(accessToken) {
  const url = `https://api.spotify.com/v1/me/albums`;
  return dynamicGetRequest(url, accessToken);
}
function getAlbumTracks(accessToken, album_Id) {
  const url = `https://api.spotify.com/v1/albums/${album_Id}`;
  return dynamicGetRequest(url, accessToken);
}

function isAlbumSaved(accessToken, ids) {
  const idsConcatenatedAsUrlQueryString = ids.join('%2C');
  const url = `https://api.spotify.com/v1/me/albums/contains?ids=${idsConcatenatedAsUrlQueryString}`;
  return dynamicGetRequest(url, accessToken);
}

async function dynamicGetRequest(url, accessToken) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

async function dynamicDeleteRequest(url, accessToken, body) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
      body: body || {},
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

async function dynamicUpdateRequest(url, accessToken, body) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: body || {},
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

async function dynamicAddRequest(url, accessToken, body) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body || {},
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

export { useFetchSearch, fetchInitialData as fetchAllTracks, fetchPlayableItems };
