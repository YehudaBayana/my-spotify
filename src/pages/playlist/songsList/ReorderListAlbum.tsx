import React, { useContext, useEffect, useState } from "react";
// import { StoreContext } from '../../context/ContextProvider';
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import { ListItem, Avatar, ListItemButton, Divider } from "@mui/material";
// import { reducerActionTypes } from '../../constants';
// import { fetchPlayableItems } from '../../customHooks/useFetchMusicInfo';
// import { makeArrayUnique, msToMinutesAndSeconds } from '../../utils';
// import AlbumHeader from '../../components/playlistHeader/AlbumHeader';
// import { Album, Track, TrackAlbum } from 'src/types';
// import { StoreContext } from 'src/context/ContextProvider';
// import { fetchPlayableItems } from 'src/customHooks/useFetchMusicInfo';
// import { makeArrayUnique, msToMinutesAndSeconds } from 'src/utils';
import AlbumHeader from "../playlistHeader/AlbumHeader";
import { StoreContext } from "../../../context/ContextProvider";
import { Album, TrackAlbum } from "../../../types";
// import { fetchPlayableItems } from "../../../customHooks/useFetchMusicInfo";
import { makeArrayUnique, msToMinutesAndSeconds } from "../../../utils";
import { reducerActionTypes } from "../../../constants";
// import { reducerActionTypes } from 'src/constants';

const StyledListItemNew = styled(ListItem)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
}));

// interface Track {
//   id: string;
//   name: string;
//   duration_ms: number;
// }

// interface Album {
//   images: { url: string }[];
//   release_date: string;
//   tracks: { items: Track[] };
// }

const ReorderListAlbum: React.FC = () => {
  const location = useLocation();
  const [type, playlistId] = location.pathname.split("/").filter((item) => item);
  const { dispatch, state } = useContext(StoreContext);
  const [album, setAlbum] = useState<Album>({
    artists: [],
    images: [],
    name: "",
    popularity: 0,
    release_date: "",
    total_tracks: 0,
    tracks: {
      items: [],
    },
    id: "",
    uri: "",
    type: "",
  });
  const [items, setItems] = useState<TrackAlbum[]>([]);

  useEffect(() => {
    // async function execute() {
    //   const albumRes = await fetchPlayableItems(playlistId, type);
    //   setAlbum(albumRes);
    //   if (albumRes?.tracks.items?.length > 0) {
    //     setItems(makeArrayUnique(albumRes?.tracks.items));
    //   }
    // }
    // execute();
    return () => {};
  }, [playlistId, type, state.accessToken]);
  console.log("album ", album);

  return (
    <>
      <AlbumHeader album={album} />
      {items?.map((track, i) => (
        <React.Fragment key={track.id}>
          <List
            onClick={() => {
              const targetIndex = i;
              const previousTracks = targetIndex !== -1 ? items.slice(0, targetIndex) : items;
              const nextTracks = targetIndex !== -1 ? items.slice(targetIndex + 1) : [];
              dispatch({
                type: reducerActionTypes.SET_PLAYING_TRACK,
                payload: { playing: track, nextTracks, previousTracks },
              });
            }}
            role="menubar"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <ListItemButton>
              <StyledListItemNew sx={{ flex: 1 }}>
                <Avatar src={album?.images[0]?.url} />
              </StyledListItemNew>
              <StyledListItemNew sx={{ flex: 9 }}>{track.name}</StyledListItemNew>
              <StyledListItemNew sx={{ flex: 2 }}>{album?.release_date}</StyledListItemNew>
              <StyledListItemNew sx={{ flex: 1 }}>{msToMinutesAndSeconds(track.duration_ms)}</StyledListItemNew>
            </ListItemButton>
          </List>
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
};

export default ReorderListAlbum;
