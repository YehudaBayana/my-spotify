import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import { ListItem, Avatar, ListItemButton, Divider } from "@mui/material";
import { reducerActionTypes } from "../../constants";
import { fetchPlayableItems } from "../../customHooks/useFetchMusicInfo";
import { makeArrayUnique, msToMinutesAndSeconds } from "../../utils";
import AlbumHeader from "../../components/playlistHeader/AlbumHeader";

const StyledListItemNew = styled(ListItem)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
}));

interface Track {
  id: string;
  name: string;
  duration_ms: number;
}

interface Album {
  images: { url: string }[];
  release_date: string;
  tracks: { items: Track[] };
}

const ReorderListAlbum: React.FC = () => {
  const location = useLocation();
  const [type, playlistId] = location.pathname.split("/").filter((item) => item);
  const { dispatch, state } = useContext(StoreContext);
  const [album, setAlbum] = useState<Album | undefined>();
  const [items, setItems] = useState<Track[]>([]);

  useEffect(() => {
    async function execute() {
      const albumRes = await fetchPlayableItems(state.accessToken || localStorage.getItem("access_token")!, playlistId, type);
      setAlbum(albumRes);
      if (albumRes?.tracks.items?.length > 0) {
        setItems(makeArrayUnique(albumRes?.tracks.items));
      }
    }
    execute();
    return () => {};
  }, [playlistId, type, state.accessToken]);

  return (
    <>
      <AlbumHeader album={album} />
      {items?.map((track) => (
        <React.Fragment key={track.id}>
          <List
            onClick={() => {
              dispatch({
                type: reducerActionTypes.SET_PLAYING_TRACK,
                payload: track,
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
