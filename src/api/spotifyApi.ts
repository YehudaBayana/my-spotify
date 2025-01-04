import { useQuery, useMutation, UseQueryOptions, UseMutationOptions, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { serializeParams, SpotifyApiUrls, stringifyParams, toQueryString } from './utils';
import {
  AddTracksToPlaylistRequest,
  Artist,
  FollowArtistsOrUsersRequest,
  GetAlbumResponse,
  GetAlbumTracksResponse,
  GetArtistAlbumsResponse,
  GetArtistResponse,
  GetArtistTopTracksResponse,
  GetAudioFeaturesResponse,
  GetBrowseCategoriesResponse,
  GetBrowseFeaturedPlaylistsResponse,
  GetBrowseGenreSeedsResponse,
  GetCurrentPlaybackResponse,
  GetPlaylistCoverImagesResponse,
  GetPlaylistTracksResponse,
  GetRecommendationsResponse,
  GetTrackResponse,
  GetUserProfileResponse,
  GetUserTopItemsResponse,
  Playlist,
  StartPlaybackRequest,
  Track,
  TransferPlaybackRequest,
  UnfollowArtistsOrUsersRequest,
} from '../types/spotifyResponses';
import { useGetRequest } from './CRUD/useGetRequest';
import { usePutRequest } from './CRUD/usePutRequest';
import { usePostRequest } from './CRUD/usePostRequest';
import { useDeleteRequest } from './CRUD/useDeleteRequest';
import { SearchResponse } from '../types/spotifyResponses';
// import { useGetRequest, usePostRequest, usePutRequest, useDeleteRequest } from './CRUD';

export function useGeneralizedQuery<T>(
  key: string[],
  url: SpotifyApiUrls,
  params?: Record<string, string | any>,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
): UseQueryResult<T, Error> {
  const queryString = toQueryString(params);
  const { get } = useGetRequest<T>(url+queryString as SpotifyApiUrls, params); // Call `useGetRequest` directly here

  return useQuery<T, Error>({
    queryKey: key,
    queryFn: get, // Pass the `get` function as the query function
    ...options,
  });
}

export function useGeneralizedMutation<T, V>(
  key: string[],
  url: SpotifyApiUrls,
  params?: Record<string, string | string[]>,
  options?: Omit<UseMutationOptions<T, Error, V>, 'mutationKey' | 'mutationFn'>
): UseMutationResult<T, Error, V> {
  const queryString = toQueryString(params);
  const { put } = usePutRequest<T>(url+queryString as SpotifyApiUrls, params); // Call `usePutRequest` directly here

  return useMutation<T, Error, V>({
    mutationKey: key,
    mutationFn: put, // Pass the `put` function as the mutation function
    ...options,
  });
}
// User Profile
export const useGetUserProfile = () =>
  useGeneralizedQuery<GetUserProfileResponse>(
    ['getUserProfile'],
    SpotifyApiUrls.GET_USER
  );

// User's Top Tracks and Artists
export const useGetUserTopTracks = (params?: { time_range?: string; limit?: number; offset?: number }) =>
  useGeneralizedQuery<GetUserTopItemsResponse<Track>>(
    ['getUserTopTracks', JSON.stringify(params)],
    SpotifyApiUrls.GET_USER_TOP_TRACKS,
    stringifyParams(params)
  );

export const useGetUserTopArtists = (params?: { time_range?: string; limit?: number; offset?: number }) =>
  useGeneralizedQuery<GetUserTopItemsResponse<Artist>>(
    ['getUserTopArtists', JSON.stringify(params)],
    SpotifyApiUrls.GET_USER_TOP_ARTISTS,
    stringifyParams(params)
  );

// Playlist Endpoints
export const useGetPlaylistTracks = (playlistId: string) =>
  useGeneralizedQuery<GetPlaylistTracksResponse>(
    ['getPlaylistTracks', playlistId],
    SpotifyApiUrls.GET_PLAYLIST_TRACKS,
    stringifyParams({ playlist_id: playlistId })
  );

export const useCreatePlaylist = (userId: string) =>
  useGeneralizedMutation<Playlist, { name: string; description?: string; public?: boolean }>(
    ['createPlaylist', userId],
    SpotifyApiUrls.ADD_PLAYLIST,
    stringifyParams({ user_id: userId })
  );

export const useAddTracksToPlaylist = (playlistId: string) =>
  useGeneralizedMutation<void, AddTracksToPlaylistRequest>(
    ['addTracksToPlaylist', playlistId],
    SpotifyApiUrls.ADD_TRACKS_TO_PLAYLIST,
    stringifyParams({ playlist_id: playlistId })
  );

export const useUpdatePlaylistDetails = (playlistId: string) =>
  useGeneralizedMutation<void, { name?: string; description?: string; public?: boolean }>(
    ['updatePlaylistDetails', playlistId],
    SpotifyApiUrls.SET_PLAYLIST_DETAILS,
    stringifyParams({ playlist_id: playlistId })
  );

// Track Endpoints
export const useGetTrack = (trackId: string) =>
  useGeneralizedQuery<GetTrackResponse>(
    ['getTrack', trackId],
    SpotifyApiUrls.GET_TRACK,
    stringifyParams({ id: trackId })
  );

// Album Endpoints
export const useGetAlbum = (albumId: string) =>
  useGeneralizedQuery<GetAlbumResponse>(
    ['getAlbum', albumId],
    SpotifyApiUrls.GET_ALBUM_TRACKS,
    stringifyParams({ album_Id: albumId })
  );

export const useGetAlbumTracks = (albumId: string) =>
  useGeneralizedQuery<GetAlbumTracksResponse>(
    ['getAlbumTracks', albumId],
    SpotifyApiUrls.GET_ALBUM_TRACKS,
    stringifyParams({ album_Id: albumId })
  );

// Artist Endpoints
export const useGetArtist = (artistId: string) =>
  useGeneralizedQuery<GetArtistResponse>(
    ['getArtist', artistId],
    SpotifyApiUrls.GET_ARTIST,
    stringifyParams({ artist_id: artistId })
  );

export const useGetArtistAlbums = (artistId: string) =>
  useGeneralizedQuery<GetArtistAlbumsResponse>(
    ['getArtistAlbums', artistId],
    SpotifyApiUrls.GET_ARTIST_ALBUMS,
    stringifyParams({ artist_id: artistId })
  );

export const useGetArtistTopTracks = (artistId: string, params?: { market?: string }) =>
  useGeneralizedQuery<GetArtistTopTracksResponse>(
    ['getArtistTopTracks', artistId, JSON.stringify(params)],
    SpotifyApiUrls.GET_ARTIST_TOP_TRACKS,
    stringifyParams({ artist_id: artistId, ...params })
  );

// Recommendations
export const useGetRecommendations = (params: { seed_tracks?: string[]; seed_artists?: string[]; seed_genres?: string[] }) =>
  useGeneralizedQuery<GetRecommendationsResponse>(
    ['getRecommendations', JSON.stringify(params)],
    SpotifyApiUrls.GET_RECOMMENDATIONS,
    stringifyParams(params)
  );

// Search
export const useSearch = (query: string, type: string, params?: { limit?: number; market?: string }) =>
  useGeneralizedQuery<SearchResponse>(
    ['search', query, type, JSON.stringify(params)],
    SpotifyApiUrls.GET_SEARCH,
    stringifyParams({ q: query, type, ...params })
  );

// Playback Control
export const useGetCurrentPlayback = () =>
  useGeneralizedQuery<GetCurrentPlaybackResponse>(
    ['getCurrentPlayback'],
    SpotifyApiUrls.GET_CURRENT_PLAYBACK
  );

export const useTransferPlayback = () =>
  useGeneralizedMutation<void, TransferPlaybackRequest>(
    ['transferPlayback'],
    SpotifyApiUrls.TRANSFER_PLAYBACK
  );

export const useStartPlayback = () =>
  useGeneralizedMutation<void, StartPlaybackRequest>(
    ['startPlayback'],
    SpotifyApiUrls.START_PLAYBACK
  );

// Browse Endpoints
export const useGetBrowseCategories = (params?: { limit?: number; offset?: number }) =>
  useGeneralizedQuery<GetBrowseCategoriesResponse>(
    ['getBrowseCategories', JSON.stringify(params)],
    SpotifyApiUrls.GET_BROWSE_CATEGORIES,
    stringifyParams(params)
  );

export const useGetBrowseFeaturedPlaylists = () =>
  useGeneralizedQuery<GetBrowseFeaturedPlaylistsResponse>(
    ['getBrowseFeaturedPlaylists'],
    SpotifyApiUrls.GET_BROWSE_FEATURED_PLAYLISTS
  );

export const useGetBrowseGenreSeeds = () =>
  useGeneralizedQuery<GetBrowseGenreSeedsResponse>(
    ['getBrowseGenreSeeds'],
    SpotifyApiUrls.GET_BROWSE_GENRE_SEEDS
  );

// Utility Endpoints
export const useCheckIfUserFollowsArtists = (params: { ids: string }) =>
  useGeneralizedQuery<boolean>(
    ['checkIfUserFollowsArtists', JSON.stringify(params)],
    SpotifyApiUrls.CHECK_IF_USER_FOLLOWS_ARTISTS,
    stringifyParams(params)
  );

export const useGetPlaylistCoverImages = (playlistId: string) =>
  useGeneralizedQuery<GetPlaylistCoverImagesResponse>(
    ['getPlaylistCoverImages', playlistId],
    SpotifyApiUrls.GET_PLAYLIST_COVER_IMAGES,
    stringifyParams({ playlist_id: playlistId })
  );
