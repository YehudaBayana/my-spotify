import { useEffect } from "react";
import { reducerActionTypes } from "../constants";

interface SearchResult {
  // Add properties based on the actual response from the API
}

// interface PlaylistTracksResponse {
//   tracks: { items: { track: any }[] };
//   playlistRes?: any;
// }

// Replace `dynamicGetRequest` with appropriate library (e.g., Axios)
// type GetRequest = (url: string, accessToken: string) => Promise<any>;
// type DeleteRequest = (
//   url: string,
//   accessToken: string,
//   body?: any
// ) => Promise<any>;
// type UpdateRequest = (
//   url: string,
//   accessToken: string,
//   body?: any
// ) => Promise<any>;
// type AddRequest = (
//   url: string,
//   accessToken: string,
//   body?: any
// ) => Promise<any>;

const useFetchSearch: (
  searchValue: string,
  setSearchRes: (data: SearchResult[]) => void,
  accessToken: string,
  type: string,
  setSelectedRes: (data: any[]) => void,
  bool: boolean
) => void = (
  searchValue,
  setSearchRes,
  accessToken,
  type,
  setSelectedRes,
  bool
) => {
  useEffect(() => {
    if (!searchValue) return;
    if (!accessToken) return () => {};
    const fetchData = async () => {
      const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow%2Cplaylist`;
      const data = await getRequest(url, accessToken);
      setSearchRes(data);
      setSelectedRes(data[type]?.items?.map((item: any) => item) || []);
    };
    fetchData();
    return () => {};
  }, [bool]);
};

export const useGetHomePagePlaylists: (
  dispatch: any,
  accessToken: string
) => void = (dispatch, accessToken) => {
  useEffect(() => {
    if (!accessToken) return () => {};
    const fetchData = async () => {
      const categories = await getCategories(accessToken, dispatch);
      let messages: string[] = [];
      let playlistsArr: any[][] = [];
    
      // Create an array of promises
      const promises = categories.categories.items.map(async (category: any) => {
        const data = await getCategoryPlaylists(accessToken, category.id);
        console.log("data.message ", data.message);
        console.log("typeof ", typeof data.message);
        messages.push(data.message);
        playlistsArr.push(data.playlists.items);
      });
    
      // Wait for all promises to resolve
      await Promise.all(promises);
    
      // Now, messages and playlistsArr are populated
      console.log("messages ", JSON.parse(JSON.stringify(messages)));
    
      dispatch({ type: "setPlaylistDes", payload: messages });
      dispatch({
        type: reducerActionTypes.SET_GENRES,
        payload: playlistsArr,
      });
    };
    
    fetchData();
    
    return () => {};
  }, []);
};

async function getCategories(accessToken: string, dispatch: any) {
  const url = "https://api.spotify.com/v1/browse/categories?locale=US&offset=0&limit=1";
  const data = await getRequest(url, accessToken);
  console.log("data ",data);
  
  dispatch({
    type: "setCategories",
    payload: data.categories.items.filter((item:any)=>item.length > 2),
  });
  return data;
}

async function getCategoryPlaylists(accessToken: string, categoryId: string) {
  const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
  return getRequest(url, accessToken);
}

const fetchInitialData = async (dispatch: any, accessToken: string) => {
  const user = await getUser(accessToken);
  dispatch({ type: reducerActionTypes.SET_USER_DETAILS, payload: user });

  const userAlbums = await getUserAlbums(accessToken);
  dispatch({
    type: reducerActionTypes.SET_USER_ALBUMS,
    payload: userAlbums.items.map((item: any) => item.album),
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
      items: userSavedData.items.map((item:any) => item.track),
    },
  });
};

const fetchPlayableItems = async (
  accessToken: string,
  id: string,
  type:string
): Promise<any> => {
  if (type === "playlist") {
    const tracksRes = await getPlaylistTracks(accessToken, id);
    return tracksRes;
  } else if (type === "album") {
    const tracksRes = await getAlbumTracks(accessToken, id);
    return tracksRes;
  } else {
    throw new Error("Invalid type provided.");
  }
};

export const fetchAlbumTracks = async (
  accessToken: string,
  AlbumId: string,
  dispatch?: any
) => {
  const tracksRes = await getAlbumTracks(accessToken, AlbumId);
  return tracksRes;
  // Handle dispatch if provided
  // if (dispatch) {
  //   dispatch({
  //     type: reducerActionTypes.SET_ALBUM,
  //     payload: {
  //       items: tracksRes.items.map((item) => item),
  //     },
  //   });
  // }
};

export function getUser(accessToken: string): Promise<any> {
  const url = "https://api.spotify.com/v1/me";
  return getRequest(url, accessToken);
}

export function getUserQueue(accessToken: string): Promise<any> {
  const url = "https://api.spotify.com/v1/me/player/queue";
  return getRequest(url, accessToken);
}

function getUserSavedTracks(accessToken: string): Promise<any> {
  const url = "https://api.spotify.com/v1/me/tracks";
  return getRequest(url, accessToken);
}

function getUserPlaylists(accessToken: string, user_id: string): Promise<any> {
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
  return getRequest(url, accessToken);
}

async function getPlaylistTracks(accessToken: string, playlist_id: string) {
  let nextUrl = `https://api.spotify.com/v1/playlists/${playlist_id}?limit=1000`;
  const tracks: any[] = [];
  let playlistRes: any;
  let isFirst = true;
  if (accessToken) {
    
    do {
      const data = await getRequest(nextUrl, accessToken);
      if (isFirst) {
        tracks.push(...data.tracks.items.map((item:any) => item.track));
        nextUrl = data.tracks.next;
        playlistRes = data;
      } else {
        tracks.push(...data.items.map((item:any) => item.track));
        nextUrl = data.next;
      }
      isFirst = false;
    } while (nextUrl);
    
    return { tracks, playlistRes };
  }
  return { tracks:[], playlistRes:[] };
  
}

function getTrack(accessToken: string, id: string): Promise<any> {
  const url = `https://api.spotify.com/v1/tracks/${id}`;
  return getRequest(url, accessToken);
}

function removeFromLibrary(
  accessToken: string,
  ids: string[],
  type: "playlist" | "album" = "playlist"
): Promise<any> {
  let requestPromise: Promise<any>;

  if (type === "playlist") {
    const url = `https://api.spotify.com/v1/playlists/${ids[0]}/followers`;
    requestPromise = deleteRequest(url, accessToken);
  } else if (type === "album") {
    const url = `https://api.spotify.com/v1/me/albums`;
    const body = {
      ids,
    };
    requestPromise = deleteRequest(url, accessToken, body);
  } else {
    throw new Error(`Invalid type: ${type}`);
  }

  return requestPromise;
}


function removeFromPlaylist(
  accessToken: string,
  playlist_id: string,
  checkedTracks: object[],
  snapshotId: string
): Promise<any> {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  const body = {
    tracks: checkedTracks,
    snapshotId,
  };
  return deleteRequest(url, accessToken, JSON.stringify(body));
}

function updatePlaylistOrder(
  accessToken: string,
  playlist_id: string,
  body: any
): Promise<any> {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  return updateRequest(url, accessToken, JSON.stringify(body));
}

function updatePlaylistDetails(
  accessToken: string,
  playlist_id: string,
  body: any
): Promise<any> {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
  return updateRequest(url, accessToken, JSON.stringify(body));
}

function addTracksToPlaylist(
  accessToken: string,
  playlist_id: string,
  body: { uris: string[] }
): Promise<any> {
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
  return addRequest(url, accessToken, JSON.stringify(body));
}

function addPlaylist(
  accessToken: string,
  user_id: string,
  body: { 
    name: string,
    description: string,
    public: boolean,
   }
): Promise<any> {
  const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
  return addRequest(url, accessToken, JSON.stringify(body));
}

function getUserAlbums(accessToken: string): Promise<any> {
  const url = `https://api.spotify.com/v1/me/albums`;
  return getRequest(url, accessToken);
}

function getAlbumTracks(accessToken: string, album_Id: string): Promise<any> {
  const url = `https://api.spotify.com/v1/albums/${album_Id}`;
  return getRequest(url, accessToken);
}

function isAlbumSaved(accessToken: string, ids: string[]): Promise<any> {
  const idsConcatenatedAsUrlQueryString = ids.join("%2C");
  const url = `https://api.spotify.com/v1/me/albums/contains?ids=${idsConcatenatedAsUrlQueryString}`;
  return getRequest(url, accessToken);
}

// Replace these with your actual implementations using a library like Axios
async function getRequest(url: string, accessToken: string): Promise<any> {
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

async function deleteRequest(
  url: string,
  accessToken: string,
  body?: any
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
      body: body || {},
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

async function updateRequest(
  url: string,
  accessToken: string,
  body: any
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: body || {},
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

async function addRequest(
  url: string,
  accessToken: string,
  body: any
): Promise<any> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: body || {},
    });
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
}

export {
  useFetchSearch,
  fetchInitialData,
  fetchPlayableItems,
  removeFromLibrary,
  removeFromPlaylist,
  updatePlaylistOrder,
  updatePlaylistDetails,
  addTracksToPlaylist,
  addPlaylist,
  getTrack
};
