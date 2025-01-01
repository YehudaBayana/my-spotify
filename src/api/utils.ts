// Enum for predefined URLs with dynamic parts
// GET_PLAYLIST = "/get/{playlist_id}",
// Enum for GET requests
export enum SpotifyApiUrlsGet {
  GET_USER = "https://api.spotify.com/v1/me",
  GET_USER_QUEUE = "https://api.spotify.com/v1/me/player/queue",
  GET_USER_SAVED_TRACKS = "https://api.spotify.com/v1/me/tracks",
  GET_USER_TOP_TRACKS = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
  GET_SEARCH = "https://api.spotify.com/v1/search?q={searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow%2Cplaylist",
  GET_USER_PLAYLISTS = "https://api.spotify.com/v1/users/{user_id}/playlists",
  GET_PLAYLIST_TRACKS = "https://api.spotify.com/v1/playlists/{playlist_id}?limit=1000",
  GET_TRACK = "https://api.spotify.com/v1/tracks/{id}",
  GET_USER_ALBUMS = "https://api.spotify.com/v1/me/albums",
  GET_ALBUM_TRACKS = "https://api.spotify.com/v1/albums/{album_Id}",
  CATEGORIES = "https://api.spotify.com/v1/browse/categories",
  IS_ALBUM_SAVED = "https://api.spotify.com/v1/me/albums/contains?ids={idsConcatenatedAsUrlQueryString}",
}

// Enum for POST requests
export enum SpotifyApiUrlsPost {
  ADD_TRACKS_TO_PLAYLIST = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
  ADD_PLAYLIST = "https://api.spotify.com/v1/users/{user_id}/playlists",
}

// Enum for PUT requests
export enum SpotifyApiUrlsPut {
  UPDATE_PLAYLIST_ORDER = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
  UPDATE_PLAYLIST_DETAILS = "https://api.spotify.com/v1/playlists/{playlist_id}",
}

// Enum for DELETE requests
export enum SpotifyApiUrlsDelete {
  REMOVE_FROM_LIBRARY_PLAYLIST = "https://api.spotify.com/v1/playlists/{playlist_id}/followers",
  REMOVE_FROM_LIBRARY_ALBUM = "https://api.spotify.com/v1/me/albums",
  REMOVE_FROM_PLAYLIST = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
}

// Define the parameters required for each URL in the enums
type ParamMap = {
  // GET
  [SpotifyApiUrlsGet.GET_USER]: never;
  [SpotifyApiUrlsGet.GET_USER_QUEUE]: never;
  [SpotifyApiUrlsGet.GET_USER_SAVED_TRACKS]: never;
  [SpotifyApiUrlsGet.GET_USER_TOP_TRACKS]: never;
  [SpotifyApiUrlsGet.GET_SEARCH]: { searchValue: string };
  [SpotifyApiUrlsGet.GET_USER_PLAYLISTS]: { user_id: string };
  [SpotifyApiUrlsGet.GET_PLAYLIST_TRACKS]: { playlist_id: string };
  [SpotifyApiUrlsGet.GET_TRACK]: { id: string };
  [SpotifyApiUrlsGet.GET_USER_ALBUMS]: never;
  [SpotifyApiUrlsGet.GET_ALBUM_TRACKS]: { album_Id: string };
  [SpotifyApiUrlsGet.IS_ALBUM_SAVED]: { idsConcatenatedAsUrlQueryString: string };

  // POST
  [SpotifyApiUrlsPost.ADD_TRACKS_TO_PLAYLIST]: { playlist_id: string };
  [SpotifyApiUrlsPost.ADD_PLAYLIST]: { user_id: string };

  // PUT
  [SpotifyApiUrlsPut.UPDATE_PLAYLIST_ORDER]: { playlist_id: string };
  [SpotifyApiUrlsPut.UPDATE_PLAYLIST_DETAILS]: { playlist_id: string };

  // DELETE
  [SpotifyApiUrlsDelete.REMOVE_FROM_LIBRARY_PLAYLIST]: { playlist_id: string[] };
  [SpotifyApiUrlsDelete.REMOVE_FROM_LIBRARY_ALBUM]: never;
  [SpotifyApiUrlsDelete.REMOVE_FROM_PLAYLIST]: { playlist_id: string };
};

// Type for `params` based on the URL passed
type ExtractParams<T> = T extends `${infer Prefix}{${infer ParamName}}${infer Suffix}` ? { [K in ParamName]: string } : {};

export type ParamsForUrl<T extends SpotifyApiUrlsGet | SpotifyApiUrlsPost | SpotifyApiUrlsPut | SpotifyApiUrlsDelete> = T extends keyof ParamMap ? ParamMap[T] : ExtractParams<T>;
// Helper function to replace dynamic URL placeholders
export function buildUrl(urlTemplate: string, params: Record<string, string | string[]>): string {
  let url = urlTemplate;
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      url = url.replace(`{${key}}`, value.join(","));
    } else {
      url = url.replace(`{${key}}`, value);
    }
  }
  return url;
}
