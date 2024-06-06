import { useContext, useEffect } from "react";
import { StoreContext } from "../components/context/ContextProvider";
import { reducerActionTypes } from "../constants";

const useFetchSearch = (
  searchValue,
  setSearchRes,
  accessToken,
  type,
  setSelectedRes,
  bool
) => {
  const { dispatch } = useContext(StoreContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!searchValue)
      return dispatch({ type: "setSearchResults", payload: [] });
    console.log("accessToken ", accessToken);
    if (!accessToken) return;
    const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow%2Cplaylist`;
    const data = await customDynamicFetch(url, accessToken);
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
        console.log("data ", data);
        messages.push(data.message);
        playlistsArr.push(data.playlists.items);
      });
    });
    dispatch({ type: "setPlaylistDes", payload: messages });
    dispatch({
      type: reducerActionTypes.SET_GENRES,
      payload: playlistsArr,
    });
  }, []);
};

async function getCategories(accessToken, dispatch) {
  const url =
    "https://api.spotify.com/v1/browse/categories?locale=US&offset=0&limit=1";
  const data = await customDynamicFetch(url, accessToken);
  dispatch({
    type: "setCategories",
    payload: data.categories.items,
  });
  return data;
}
async function getCategoryPlaylists(accessToken, categoryId) {
  const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
  return customDynamicFetch(url, accessToken);
}

const fetchInitialData = async (spotifyApi, dispatch, accessToken) => {
  const user = await getUser(accessToken);
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
  dispatch({ type: reducerActionTypes.SET_USER_DETAILS, payload: user });
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

const fetchPlaylistTracks = async (accessToken, playlistId, dispatch) => {
  const tracksRes = await getPlaylistTracks(accessToken, playlistId);
  console.log("tracksRes ,", tracksRes);
  dispatch({
    type: reducerActionTypes.SET_PLAYLIST,
    payload: {
      items: tracksRes.items.map((item) => {
        return item.track;
      }),
    },
  });
};

export const fetchAlbumTracks = async (accessToken, AlbumId, dispatch) => {
  const tracksRes = await getAlbumTracks(accessToken, AlbumId);
  console.log("tracksRes ,", tracksRes);
  dispatch({
    type: reducerActionTypes.SET_ALBUM,
    payload: {
      items: tracksRes.items.map((item) => {
        return item;
      }),
    },
  });
};

function getUser(accessToken) {
  const url = "https://api.spotify.com/v1/me";
  return customDynamicFetch(url, accessToken);
}

function getUserSavedTracks(accessToken) {
  const url = "https://api.spotify.com/v1/me/tracks";
  return customDynamicFetch(url, accessToken);
}

function getUserPlaylists(accessToken, userId) {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  return customDynamicFetch(url, accessToken);
}

function getPlaylistTracks(accessToken, playlistId) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  return customDynamicFetch(url, accessToken);
}

function getUserAlbums(accessToken) {
  const url = `https://api.spotify.com/v1/me/albums`;
  return customDynamicFetch(url, accessToken);
}
function getAlbumTracks(accessToken, albumId) {
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
  return customDynamicFetch(url, accessToken);
}

async function customDynamicFetch(url, accessToken) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

export {
  useFetchSearch,
  fetchInitialData as fetchAllTracks,
  fetchPlaylistTracks,
};
