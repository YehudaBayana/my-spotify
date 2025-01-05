// utils.ts file
// Enum for GET requests
export enum SpotifyApiUrls {
  GET_USER = "https://api.spotify.com/v1/me",
  GET_USER_QUEUE = "https://api.spotify.com/v1/me/player/queue",
  GET_USER_SAVED_TRACKS = "https://api.spotify.com/v1/me/tracks",
  GET_USER_TOP_TRACKS = "https://api.spotify.com/v1/me/top/tracks",
  GET_USER_TOP_ARTISTS = "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
  GET_CURR_USER_PLAYLISTS = "https://api.spotify.com/v1/me/playlists",
  GET_USER_PLAYLISTS = "https://api.spotify.com/v1/users/{user_id}/playlists",
  GET_SEARCH = "https://api.spotify.com/v1/search",
  GET_PLAYLIST_TRACKS = "https://api.spotify.com/v1/playlists/{playlist_id}",
  GET_TRACK = "https://api.spotify.com/v1/tracks/{id}",
  GET_USER_ALBUMS = "https://api.spotify.com/v1/me/albums",
  GET_ALBUM_TRACKS = "https://api.spotify.com/v1/albums/{album_Id}",
  GET_ARTIST = "https://api.spotify.com/v1/artists/{artist_id}",
  GET_ARTIST_ALBUMS = "https://api.spotify.com/v1/artists/{artist_id}/albums",
  GET_CURRENT_PLAYBACK = "https://api.spotify.com/v1/me/player/currently-playing",
  CHECK_IF_USER_FOLLOWS_ARTISTS = "https://api.spotify.com/v1/me/following/contains?type=artist&ids={ids}",
  GET_AUDIO_FEATURES = "https://api.spotify.com/v1/audio-features/{id}",
  GET_PLAYLIST_COVER_IMAGES = "https://api.spotify.com/v1/playlists/{playlist_id}/images", // Playlist cover images
  GET_RECOMMENDATIONS = "https://api.spotify.com/v1/recommendations", // Get recommendations
  GET_BROWSE_CATEGORIES = "https://api.spotify.com/v1/browse/categories", // Categories endpoint
  GET_BROWSE_FEATURED_PLAYLISTS = "https://api.spotify.com/v1/browse/featured-playlists", // Featured playlists
  GET_BROWSE_GENRE_SEEDS = "https://api.spotify.com/v1/browse/genre-seeds", // Genre seeds for recommendations
  GET_ARTIST_TOP_TRACKS = "https://api.spotify.com/v1/artists/{artist_id}/top-tracks", // Get an artist's top tracks

// Enum for POST requests
  ADD_TRACKS_TO_PLAYLIST = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
  ADD_PLAYLIST = "https://api.spotify.com/v1/users/{user_id}/playlists",
  SKIP_TO_NEXT_TRACK = "https://api.spotify.com/v1/me/player/next",
  SKIP_TO_PREVIOUS_TRACK = "https://api.spotify.com/v1/me/player/previous",

// Enum for PUT requests

  TRANSFER_PLAYBACK = "https://api.spotify.com/v1/me/player",
  START_PLAYBACK = "https://api.spotify.com/v1/me/player/play",
  PAUSE_PLAYBACK = "https://api.spotify.com/v1/me/player/pause",
  FOLLOW_ARTISTS_OR_USERS = "https://api.spotify.com/v1/me/following",
  SET_SHUFFLE = "https://api.spotify.com/v1/me/player/shuffle", // Set shuffle mode for player
  SET_REPEAT = "https://api.spotify.com/v1/me/player/repeat", // Set repeat mode for player
  SET_PLAYLIST_DETAILS = "https://api.spotify.com/v1/playlists/{playlist_id}", // Set repeat mode for player

// Enum for DELETE requests
  REMOVE_FROM_LIBRARY_PLAYLIST = "https://api.spotify.com/v1/playlists/{playlist_id}/followers",
  REMOVE_FROM_LIBRARY_ALBUM = "https://api.spotify.com/v1/me/albums",
  REMOVE_FROM_PLAYLIST = "https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
  UNFOLLOW_ARTISTS_OR_USERS = "https://api.spotify.com/v1/me/following",
}

// Define the parameters required for each URL in the enums
type ParamMap = {
  // GET
  [SpotifyApiUrls.GET_USER]: never;
  [SpotifyApiUrls.GET_USER_QUEUE]: never;
  [SpotifyApiUrls.GET_USER_SAVED_TRACKS]: never;
  [SpotifyApiUrls.GET_USER_TOP_TRACKS]: { time_range?: string; limit?: number; offset?: number };
  [SpotifyApiUrls.GET_USER_TOP_ARTISTS]: { time_range?: string; limit?: number; offset?: number };
  [SpotifyApiUrls.GET_SEARCH]: { q: string };
  [SpotifyApiUrls.GET_USER_PLAYLISTS]: { user_id: string };
  [SpotifyApiUrls.GET_PLAYLIST_TRACKS]: { playlist_id: string };
  [SpotifyApiUrls.GET_TRACK]: { id: string };
  [SpotifyApiUrls.GET_USER_ALBUMS]: never;
  [SpotifyApiUrls.GET_ALBUM_TRACKS]: { album_Id: string };
  [SpotifyApiUrls.GET_ARTIST]: { artist_id: string };
  [SpotifyApiUrls.GET_ARTIST_ALBUMS]: { artist_id: string };
  [SpotifyApiUrls.GET_CURRENT_PLAYBACK]: never;
  [SpotifyApiUrls.CHECK_IF_USER_FOLLOWS_ARTISTS]: { ids: string };
  [SpotifyApiUrls.GET_AUDIO_FEATURES]: { id: string };

  // POST
  [SpotifyApiUrls.ADD_TRACKS_TO_PLAYLIST]: { playlist_id: string };
  [SpotifyApiUrls.ADD_PLAYLIST]: { user_id: string };

  // PUT
  [SpotifyApiUrls.TRANSFER_PLAYBACK]: { device_ids: string[]; play?: boolean };
  [SpotifyApiUrls.START_PLAYBACK]: { context_uri?: string; uris?: string[]; offset?: { position?: number; uri?: string }; position_ms?: number };
  [SpotifyApiUrls.PAUSE_PLAYBACK]: never;
  [SpotifyApiUrls.FOLLOW_ARTISTS_OR_USERS]: { type: string; ids: string[] };

  // DELETE
  [SpotifyApiUrls.REMOVE_FROM_LIBRARY_PLAYLIST]: { playlist_id: string[] };
  [SpotifyApiUrls.REMOVE_FROM_LIBRARY_ALBUM]: never;
  [SpotifyApiUrls.REMOVE_FROM_PLAYLIST]: { playlist_id: string };
  [SpotifyApiUrls.UNFOLLOW_ARTISTS_OR_USERS]: { type: string; ids: string[] };
};

// Type for `params` based on the URL passed
type ExtractParams<T> = T extends `${infer Prefix}{${infer ParamName}}${infer Suffix}` ? { [K in ParamName]: string } : {};

export type ParamsForUrl<T extends SpotifyApiUrls> = T extends keyof ParamMap ? ParamMap[T] : ExtractParams<T>;

// Helper function to replace dynamic URL placeholders
export function buildUrl(urlTemplate: string, params: Record<string, string | string[]>): string {
  let url = urlTemplate;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`{${key}}`, Array.isArray(value) ? value.join(',') : value);
  }
  return url;
}

export function toQueryString(params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) return '';

  const queryString = Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&');
      }
      if (value !== undefined && value !== null) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      }
      return null;
    })
    .filter(Boolean)
    .join('&');

  return queryString ? `?${queryString}` : '';
}



export function serializeParams(params: Record<string, any> | undefined): string {
  if (!params) return '';
  return JSON.stringify(Object.keys(params).sort().reduce((acc, key) => {
    acc[key] = params[key];
    return acc;
  }, {} as Record<string, any>));
}

export function stringifyParams(params: Record<string, any> | undefined): Record<string, string | string[]> {
  if (!params) return {};
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.map(String) : String(value), // Convert values to strings
    ])
  );
}
