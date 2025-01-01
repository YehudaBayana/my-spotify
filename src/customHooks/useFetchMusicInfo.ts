// import { useContext, useEffect } from "react";
// import { reducerActionTypes } from "../constants";
// import { useAuthContext } from "context/AuthContextProvider";

// interface SearchResult {
//   // Add properties based on the actual response from the API
// }

// export const useFetchSearch: (searchValue: string, setSearchRes: (data: SearchResult[]) => void, type: string, setSelectedRes: (data: any[]) => void, bool: boolean) => void = (
//   searchValue,
//   setSearchRes,
//   type,
//   setSelectedRes,
//   bool
// ) => {
//   const { accessToken } = useAuthContext();

//   useEffect(() => {
//     if (!searchValue) return;
//     if (!accessToken) return () => {};
//     const fetchData = async () => {
//       const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow%2Cplaylist`;
//       const data = await getRequest(url);
//       setSearchRes(data);
//       setSelectedRes(data[type]?.items?.map((item: any) => item) || []);
//     };
//     fetchData();
//     return () => {};
//   }, [bool]);
// };

// export const useGetHomePagePlaylists: (dispatch: any) => void = (dispatch) => {
//   const { accessToken } = useAuthContext();

//   if (!accessToken) {
//     throw new Error("No access token");
//   }
//   useEffect(() => {
//     if (!accessToken) return () => {};
//     const fetchData = async () => {
//       const categories = await getCategories();
//       let messages: string[] = [];
//       let playlistsArr: any[] = [];

//       console.log("categories ", categories);
//       if (!categories?.error) {
//         const promises = categories.categories.items.map(async (category: any) => {
//           const data = await getCategoryPlaylists(category.id);
//           messages.push(data.message);
//           playlistsArr.push({ items: data.playlists.items, id: category.id });
//         });

//         await Promise.all(promises);

//         dispatch({ type: "setPlaylistDes", payload: messages });
//         dispatch({
//           type: reducerActionTypes.SET_GENRES,
//           payload: playlistsArr,
//         });
//       }
//     };

//     fetchData();

//     return () => {};
//   }, []);
// };

// export async function getCategories() {
//   const url = "https://api.spotify.com/v1/browse/categories?locale=US&offset=0&limit=10";
//   const data = await getRequest(url);
//   return data;
// }

// export async function getCategoryPlaylists(categoryId: string) {
//   const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`;
//   return getRequest(url);
// }

// export const fetchInitialData = async (dispatch: any) => {
//   const user = await getUser();
//   return user;
// };

// export const fetchPlayableItems = async (id: string, type: string): Promise<any> => {
//   if (type === "playlist") {
//     const tracksRes = await getPlaylistTracks(id);
//     return tracksRes;
//   } else if (type === "album") {
//     const tracksRes = await getAlbumTracks(id);
//     return tracksRes;
//   } else {
//     throw new Error("Invalid type provided.");
//   }
// };

// export const fetchAlbumTracks = async (AlbumId: string) => {
//   const tracksRes = await getAlbumTracks(AlbumId);
//   return tracksRes;
// };

// export function getUser(): Promise<any> {
//   const url = "https://api.spotify.com/v1/me";
//   return getRequest(url);
// }

// export function getUserQueue(): Promise<any> {
//   const url = "https://api.spotify.com/v1/me/player/queue";
//   return getRequest(url);
// }

// export function getUserSavedTracks(): Promise<any> {
//   const url = "https://api.spotify.com/v1/me/tracks";
//   return getRequest(url);
// }

// export function getUserPlaylists(user_id: string): Promise<any> {
//   const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
//   return getRequest(url);
// }

// export function getUserTopTracks(): Promise<any> {
//   const url = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term`;

//   return getRequest(url);
// }

// export function getSearch(searchValue: string): Promise<any> {
//   const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow%2Cplaylist`;

//   return getRequest(url);
// }

// export async function getPlaylistTracks(playlist_id: string) {
//   let nextUrl = `https://api.spotify.com/v1/playlists/${playlist_id}?limit=1000`;
//   const tracks: any[] = [];
//   let playlistRes: any;
//   let isFirst = true;

//   do {
//     const data = await getRequest(nextUrl);
//     if (isFirst) {
//       tracks.push(...data.tracks.items.map((item: any) => item.track));
//       nextUrl = data.tracks.next;
//       playlistRes = data;
//     } else {
//       tracks.push(...data.items.map((item: any) => item.track));
//       nextUrl = data.next;
//     }
//     isFirst = false;
//   } while (nextUrl);

//   return { tracks, playlistRes };

//   // return { tracks: [], playlistRes: [] };
// }

// export function getTrack(id: string): Promise<any> {
//   const url = `https://api.spotify.com/v1/tracks/${id}`;
//   return getRequest(url);
// }

// export function removeFromLibrary(ids: string[], type: string): Promise<any> {
//   let requestPromise: Promise<any>;

//   if (type === "playlist") {
//     const url = `https://api.spotify.com/v1/playlists/${ids[0]}/followers`;
//     requestPromise = deleteRequest(url);
//   } else if (type === "album") {
//     const url = `https://api.spotify.com/v1/me/albums`;
//     const body = {
//       ids,
//     };
//     requestPromise = deleteRequest(url, body);
//   } else {
//     throw new Error(`Invalid type: ${type}`);
//   }

//   return requestPromise;
// }

// export function removeFromPlaylist(playlist_id: string, checkedTracks: object[], snapshotId: string): Promise<any> {
//   const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
//   const body = {
//     tracks: checkedTracks,
//     snapshotId,
//   };
//   return deleteRequest(url, body);
// }

// export function updatePlaylistOrder(playlist_id: string, body: any): Promise<any> {
//   const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
//   return updateRequest(url, JSON.stringify(body));
// }

// export function updatePlaylistDetails(playlist_id: string, body: any): Promise<any> {
//   const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
//   return updateRequest(url, JSON.stringify(body));
// }

// export function addTracksToPlaylist(playlist_id: string, body: { uris: string[] }): Promise<any> {
//   const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
//   return addRequest(url, JSON.stringify(body));
// }

// export function addPlaylist(
//   user_id: string,
//   body: {
//     name: string;
//     description: string;
//     public: boolean;
//   }
// ): Promise<any> {
//   const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
//   return addRequest(url, JSON.stringify(body));
// }

// export function getUserAlbums(): Promise<any> {
//   const url = `https://api.spotify.com/v1/me/albums`;
//   return getRequest(url);
// }

// export function getAlbumTracks(album_Id: string): Promise<any> {
//   const url = `https://api.spotify.com/v1/albums/${album_Id}`;
//   return getRequest(url);
// }

// export function isAlbumSaved(ids: string[]): Promise<any> {
//   const idsConcatenatedAsUrlQueryString = ids.join("%2C");
//   const url = `https://api.spotify.com/v1/me/albums/contains?ids=${idsConcatenatedAsUrlQueryString}`;
//   return getRequest(url);
// }

// // Replace these with your actual implementations using a library like Axios

// // export {
// //   useFetchSearch,
// //   fetchInitialData,
// //   fetchPlayableItems,
// //   removeFromLibrary,
// //   removeFromPlaylist,
// //   updatePlaylistOrder,
// //   updatePlaylistDetails,
// //   addTracksToPlaylist,
// //   addPlaylist,
// //   getTrack,
// //   getUserTopTracks
// // };
