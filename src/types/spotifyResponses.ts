// User Profile Endpoints
export interface GetUserProfileResponse {
    id: string;
    display_name: string;
    email: string;
    images: { url: string }[];
    country: string;
    product: string;
    followers: { total: number };
  }
  
  // User's Top Tracks and Artists
  export interface GetUserTopItemsResponse<T> {
    items: T[];
  }
  
  export interface Artist {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
  }
  
  export interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: Album;
    popularity: number;
    uri:string,
    duration_ms:number,
  }
  
  // Playlist Endpoints
  export interface Playlist {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    owner: { id: string; display_name: string };
    tracks: { total: number };
    public: boolean;

snapshot_id:string;
  }
  
  export interface GetPlaylistTracksResponse extends Playlist {
    tracks:{items: PlaylistTrack[],total:number};
  }
  
  export interface PlaylistTrack {
    track: Track;
  }
  
  export interface AddTracksToPlaylistRequest {
    uris: string[];
  }
  
  // Track Endpoints
  export interface GetTrackResponse {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { name: string; images: { url: string }[] };
    duration_ms: number;
    popularity: number;
  }
  
  // Album Endpoints
  export interface GetAlbumResponse {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
    release_date: string;
    tracks: { items: Track[] };
  }
  
  export interface GetAlbumTracksResponse {
    items: Track[];
  }
  
  // Artist Endpoints
  export interface GetArtistResponse {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
  }
  
  export interface GetArtistAlbumsResponse {
    items: Album[];
  }
  
  export interface Album {
    id: string;
    name: string;
    images: { url: string }[];
    release_date: string;
  }
  
  export interface GetArtistTopTracksResponse {
    tracks: Track[];
  }
  
  // Recommendations Endpoint
  export interface GetRecommendationsResponse {
    tracks: Track[];
  }
  
  // Search Endpoint
  export interface SearchResponse {
    tracks: { items: Track[] };
    artists: { items: Artist[] };
    albums: { items: Album[] };
    playlists: { items: Playlist[] };
  }
  
  // Player Endpoints
  export interface GetCurrentPlaybackResponse {
    item: Track;
    progress_ms: number;
    is_playing: boolean;
  }
  
  export interface TransferPlaybackRequest {
    device_ids: string[];
    play?: boolean;
  }
  
  export interface StartPlaybackRequest {
    context_uri?: string;
    uris?: string[];
    offset?: { position?: number; uri?: string };
    position_ms?: number;
  }
  
  // Follow Endpoints
  export interface FollowArtistsOrUsersRequest {
    type: string; // "artist" or "user"
    ids: string[];
  }
  
  export interface UnfollowArtistsOrUsersRequest {
    type: string; // "artist" or "user"
    ids: string[];
  }
  
  // Browse Endpoints
  export interface GetBrowseCategoriesResponse {
    categories: { items: Category[] };
  }
  
  export interface Category {
    id: string;
    name: string;
    icons: { url: string }[];
  }
  
  export interface GetBrowseFeaturedPlaylistsResponse {
    playlists: { items: Playlist[] };
  }
  
  export interface GetBrowseGenreSeedsResponse {
    genres: string[];
  }
  
  // Playlist Cover Images Endpoint
  export interface GetPlaylistCoverImagesResponse {
    url: string;
  }
  

///////////// Player-related Control Endpoints
export interface GetCurrentPlaybackResponse {
    item: Track;
    progress_ms: number;
    is_playing: boolean;
  }
  
  export interface TransferPlaybackRequest {
    device_ids: string[];
    play?: boolean;
  }
  
  export interface StartPlaybackRequest {
    context_uri?: string;
    uris?: string[];
    offset?: { position?: number; uri?: string };
    position_ms?: number;
  }
  
  export interface PausePlaybackRequest {
    body: {}; // Empty body for pausing playback
  }
  
  // Follow-related Endpoints
  export interface FollowArtistsOrUsersRequest {
    type: string; // "artist" or "user"
    ids: string[];
  }
  
  export interface UnfollowArtistsOrUsersRequest {
    type: string; // "artist" or "user"
    ids: string[];
  }
  
  // Browse Endpoints
  export interface GetBrowseCategoriesResponse {
    categories: { items: Category[] };
  }
  
  export interface Category {
    id: string;
    name: string;
    icons: { url: string }[];
  }
  
  export interface GetBrowseFeaturedPlaylistsResponse {
    playlists: { items: Playlist[] };
  }
  
  export interface GetBrowseGenreSeedsResponse {
    genres: string[];
  }
  
  // Playlist Cover Images Endpoint
  export interface GetPlaylistCoverImagesResponse {
    url: string;
  }
  
  // Artist's Top Tracks
  export interface GetArtistTopTracksResponse {
    tracks: Track[];
  }
  
  // Recommendations Endpoint
  export interface GetRecommendationsResponse {
    tracks: Track[];
  }
  
  // Search Endpoint
  export interface SearchResponse {
    tracks: { items: Track[] };
    artists: { items: Artist[] };
    albums: { items: Album[] };
    playlists: { items: Playlist[] };
  }
  
  // User Profile Endpoints
  export interface GetUserProfileResponse {
    id: string;
    display_name: string;
    email: string;
    images: { url: string }[];
    country: string;
    product: string;
    followers: { total: number };
  }
  
  // Playlist Endpoints
  export interface GetPlaylistTracksResponse {
    items: PlaylistTrack[];
  }
  
  export interface PlaylistTrack {
    track: Track;
  }
  
  export interface AddTracksToPlaylistRequest {
    uris: string[];
  }
  
  // Track-related Endpoints
  export interface GetTrackResponse {
    id: string;
    name: string;
    artists: { name: string }[];
    album: { name: string; images: { url: string }[] };
    duration_ms: number;
    popularity: number;
  }
  
  export interface GetAudioFeaturesResponse {
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number;
    type: string;
    id: string;
    uri: string;
  }
  
  // Album-related Endpoints
  export interface GetAlbumResponse {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
    release_date: string;
    tracks: { items: Track[] };
  }
  
  export interface GetAlbumTracksResponse {
    items: Track[];
  }
  
  // Artist-related Endpoints
  export interface GetArtistResponse {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
  }
  
  export interface GetArtistAlbumsResponse {
    items: Album[];
  }
  
  export interface Album {
    id: string;
    name: string;
    images: { url: string }[];
    release_date: string;
  }
  
  export interface GetArtistTopTracksResponse {
    tracks: Track[];
  }
  
  // Playlist-related Endpoints
  export interface Playlist {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    owner: { id: string; display_name: string };
    tracks: { total: number };
    public: boolean;
  }
  
  export interface AddTracksToPlaylistRequest {
    uris: string[];
  }
  
  // Follow-related Endpoints
  export interface FollowArtistsOrUsersRequest {
    type: string; // "artist" or "user"
    ids: string[];
  }
  
  export interface UnfollowArtistsOrUsersRequest {
    type: string; // "artist" or "user"
    ids: string[];
  }
  