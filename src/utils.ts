import { reducerActionTypes } from "./constants";
// import { addTracksToPlaylist } from "./customHooks/useFetchMusicInfo";
import { Playlist, Track, TrackShortV } from "./types";

export function formatNumberShortcut(num: number): string {
  if (num >= 1000000000) {
    // Billion
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (num >= 1000000) {
    // Million
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    // Thousand
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
}

export function msToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}

export function isIncludeHtml(string: string): boolean {
  if (typeof string !== "string") {
    return false;
  }

  const regex = /href=([^" >]+)/g;
  const isIncludeHtmlTag = string.match(regex);
  return !!isIncludeHtmlTag && isIncludeHtmlTag.length > 0;
}

export function makeArrayUnique<T extends { id: string | number }>(items: T[]): T[] {
  return [...new Map(items.map((item) => [item.id, item])).values()];
}

export const handleCheckboxToggle = (e: React.MouseEvent<HTMLButtonElement>, track: Track | TrackShortV, dispatch: any, checkedTracks: { uri: string }[]) => {
  e.stopPropagation();
  let res = [];
  if (e.target instanceof HTMLInputElement && e.target.checked) {
    if (!checkedTracks.map((item) => item.uri).includes(track.uri)) {
      res = [...checkedTracks, { uri: track.uri }];
    } else {
      res = checkedTracks;
    }
  } else {
    if (checkedTracks.map((item) => item.uri).includes(track.uri)) {
      res = checkedTracks.filter((item) => item.uri !== track.uri);
    } else {
      res = checkedTracks;
    }
  }
  dispatch({
    type: reducerActionTypes.SET_CHECKED_TRACKS,
    payload: res,
  });
  // setCheckedTracks((oldValue) => {
  //   if (e.target instanceof HTMLInputElement && e.target.checked) {
  //     if (!oldValue.map((item) => item.uri).includes(track.uri)) {
  //       return [...oldValue, { uri: track.uri }];
  //     }
  //     return oldValue;
  //   } else {
  //     if (oldValue.map((item) => item.uri).includes(track.uri)) {
  //       return oldValue.filter((item) => item.uri !== track.uri);
  //     }
  //     return oldValue;
  //   }
  // });
};

export const handleAddToPlaylist = async (playlist: Playlist, accessToken: string, checkedTracks: any, dispatch: any, setEdit: any) => {
  const body = {
    uris: checkedTracks.map((track: any) => track.uri),
    position: 0,
  };

  try {
    // const added = await addTracksToPlaylist(playlist.id, body);
    // const { data, post } = usePostRequest(SpotifyApiUrlsPost.ADD_TRACKS_TO_PLAYLIST, { playlist_id: playlist.id }, body);
    // await post();
    // const res = await data.json();
    // if (res?.snapshot_id) {
    //   setEdit(false);
    //   // setCheckedTracks([]);
    //   dispatch({
    //     type: reducerActionTypes.SET_CHECKED_TRACKS,
    //     payload: [],
    //   });
    // }
  } catch (error) {
    console.log("yuda error ", error);
  }
};

export const handlePlayTrack = (tracks: any[], clickedTrack: Track | TrackShortV, dispatch: any) => {
  const targetCondition = (obj: Track) => obj.id === clickedTrack.id;
  const targetIndex = tracks.findIndex(targetCondition);
  const previousTracks = targetIndex !== -1 ? tracks.slice(0, targetIndex) : tracks;
  const nextTracks = targetIndex !== -1 ? tracks.slice(targetIndex + 1) : [];
  dispatch({
    type: reducerActionTypes.SET_PLAYING_TRACK,
    payload: { playing: clickedTrack, nextTracks, previousTracks },
  });
};
