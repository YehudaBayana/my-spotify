import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { StoreContext } from "../../context/ContextProvider";
import PlaylistHeader from "../../components/playlistHeader/PlaylistHeader";
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import SearchToAdd from "./SearchToAdd";
import { ListItem, Avatar, ListItemButton, Checkbox, Box, Divider } from "@mui/material";
import { reducerActionTypes } from "../../constants";
import { addTracksToPlaylist, fetchPlayableItems, removeFromPlaylist, updatePlaylistOrder } from "../../customHooks/useFetchMusicInfo";
import { makeArrayUnique, msToMinutesAndSeconds } from "../../utils";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import CheckedTracksActions from "./CheckedTracksActions";
import "./songsList.css";

const StyledListItemNew = styled(ListItem)(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "10px",
}));

interface Item {
  id: string;
  content: string;
}

interface Track {
  uri: string;
  id: string;
  name: string;
  album: {
    images: { url: string }[];
    release_date: string;
  };
  duration_ms: number;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  owner: { id: string };
  images: { url: string }[];
  tracks: { total: number };
  snapshot_id: string;
}

interface ReorderListPlaylistProps {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReorderListPlaylist: React.FC<ReorderListPlaylistProps> = ({ edit, setEdit }) => {
  const location = useLocation();
  const [type, playlistId] = location.pathname.split("/").filter((item) => item);
  const { dispatch, state } = useContext(StoreContext);
  const { accessToken } = state;
  const [draggedItem, setDraggedItem] = useState<Track | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [checkedTracks, setCheckedTracks] = useState<{ uri: string }[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPlaylistEditable, setIsPlaylistEditable] = useState(false);
  const [sourceIndex, setSourceIndex] = useState<number>(0);
  const [destinationIndex, setDestinationIndex] = useState<number>(0);

  const [playlist, setPlaylist] = useState<Playlist>({
    id: "",
    name: "",
    description: "",
    owner: { id: "" },
    images: [{ url: "" }],
    tracks: { total: 0 },
    snapshot_id: "",
  });
  const [rgb, setRgb] = useState<string>("");

  useEffect(() => {
    if (playlist?.owner?.id === state?.userName?.id) {
      setIsPlaylistEditable(true);
    } else {
      setIsPlaylistEditable(false);
    }
  }, [state.userName, playlist]);

  async function execute(playlistId: string) {
    const { playlistRes, tracks } = await fetchPlayableItems(accessToken, playlistId, type);
    setPlaylist(playlistRes);
    if (tracks.length > 0) {
      setTracks(tracks);
    } else {
      setTracks([]);
    }
  }

  useEffect(() => {
    execute(playlistId);
  }, [playlistId, type, accessToken]);

  const handleTrackClick = (e: React.MouseEvent<HTMLUListElement>, track: Track, isCheckbox: boolean) => {
    e.stopPropagation();
    if (!isCheckbox) {
      const targetCondition = (obj: Track) => obj.id === track.id;
      const targetIndex = tracks.findIndex(targetCondition);
      const previousTracks = targetIndex !== -1 ? tracks.slice(0, targetIndex) : tracks;
      const nextTracks = targetIndex !== -1 ? tracks.slice(targetIndex + 1) : [];
      dispatch({
        type: reducerActionTypes.SET_PLAYING_TRACK,
        payload: { playing: track, nextTracks, previousTracks },
      });
    }
  };

  const handleCheckboxToggle = (e: React.MouseEvent<HTMLButtonElement>, track: Track, isCheckbox: boolean) => {
    e.stopPropagation();
    setCheckedTracks((oldValue) => {
      if (e.target instanceof HTMLInputElement && e.target.checked) {
        if (!oldValue.map((item) => item.uri).includes(track.uri)) {
          return [...oldValue, { uri: track.uri }];
        }
        return oldValue;
      } else {
        if (oldValue.map((item) => item.uri).includes(track.uri)) {
          return oldValue.filter((item) => item.uri !== track.uri);
        }
        return oldValue;
      }
    });
  };

  const handleDelete = async () => {
    try {
      const removed = await removeFromPlaylist(accessToken, playlist!.id, checkedTracks, playlist!.snapshot_id);
      await execute(playlistId);
      setEdit(false);
      setCheckedTracks([]);
    } catch (error) {
      console.log("yuda error ", error);
    }
  };

  const handleAddToPlaylist = async (playlist: Playlist) => {
    const body = {
      uris: checkedTracks.map((track) => track.uri),
      position: 0,
    };

    try {
      const added = await addTracksToPlaylist(accessToken, playlist.id, body);
      const res = await added.json();
      if (res?.snapshot_id) {
        setEdit(false);
        setCheckedTracks([]);
      }
    } catch (error) {
      console.log("yuda error ", error);
    }
  };

  async function handleAddTrack(track: Track) {
    const body = {
      uris: [track.uri],
      position: 0,
    };
    const addToPlaylistRes = await addTracksToPlaylist(accessToken, playlistId, body);
    if (addToPlaylistRes.status === 200) {
      execute(playlistId);
    }
    return addToPlaylistRes;
  }

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setSourceIndex(index);
    setDraggedItem(tracks[index]);
    dispatch({
      type: reducerActionTypes.SET_IS_DRAGGING,
      payload: true,
    });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.parentNode?.toString() || "");
    setTimeout(() => {
      if (e?.currentTarget?.classList) {
        e.currentTarget.classList.add("dragging");
      }
    }, 0);
  };

  const onDragOver = (index: number) => {
    setDestinationIndex(index);
    if (!draggedItem) return;

    const draggedOverItem = tracks[index];

    if (draggedItem === draggedOverItem) {
      return;
    }

    let itemsCopy = tracks.filter((track) => track !== draggedItem);
    itemsCopy.splice(index, 0, draggedItem);
    console.log("draggOver");

    setTracks(itemsCopy);
  };

  const onDrop = () => {
    const body = {
      range_start: sourceIndex,
      insert_before: sourceIndex < destinationIndex ? destinationIndex + 1 : destinationIndex,
      range_length: 1,
    };
    console.log("body ", body);

    setIsUpdating(true);
    // const tempTracks = tracks;
    // setTracks(newItems);
    updatePlaylistOrder(accessToken, playlistId, body)
      .then((res) => {
        console.log("res ", res);
      })
      .catch((err) => {
        console.log("err ", err);
      })
      .finally(() => {
        setIsUpdating(false);
      });
    dispatch({
      type: reducerActionTypes.SET_IS_DRAGGING,
      payload: false,
    });
  };

  return (
    <>
      <PlaylistHeader rgb={rgb} isPlaylistEditable={isPlaylistEditable} edit={edit} setEdit={setEdit} playlist={playlist} setCheckedTracks={setCheckedTracks} />
      <Paper
        elevation={0}
        square
        sx={{
          minHeight: "90vh",
          background: rgb ? `linear-gradient(to bottom, ${rgb}, 0.5) 0%, ${rgb}, 0) 10%)` : "transparent",
        }}
      >
        {checkedTracks.length > 0 && (
          <CheckedTracksActions
            isPlaylistEditable={isPlaylistEditable}
            selected={checkedTracks.length}
            handleDelete={handleDelete}
            handleAddToPlaylist={handleAddToPlaylist}
            setCheckedTracks={setCheckedTracks}
          />
        )}

        <List
          square
          elevation={0}
          style={{
            background: "rgba(255,255,255,1)",
            borderRadius: "0px",
          }}
          component={Paper}
        >
          {makeArrayUnique(tracks)?.map((track, index) => {
            const isChecked = !!checkedTracks.find((item) => item.uri === track.uri);
            return (
              <React.Fragment key={index}>
                <List
                  onDragOver={(e) => {
                    e.preventDefault();
                    onDragOver(index);
                  }}
                  onDrop={(e) => {
                    onDrop();
                  }}
                  className="list-item"
                  onClick={(e: React.MouseEvent<HTMLUListElement>) => {
                    handleTrackClick(e, track, false);
                  }}
                  key={track.id}
                  sx={{
                    height: "50px",
                    display: "flex",
                    flexDirection: "row",
                    padding: "0",
                  }}
                >
                  <ListItemButton
                    sx={{
                      position: "relative",
                      "&:hover .MuiCheckbox-root": {
                        visibility: "visible",
                      },
                    }}
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    // onDragEnd={onDragEnd}
                    className="draggable"
                    disableRipple
                  >
                    <StyledListItemNew sx={{ flex: 1 }} role="none">
                      {index + 1}
                    </StyledListItemNew>
                    {track?.album?.images[0]?.url && (
                      <StyledListItemNew sx={{ flex: 2 }} role="none">
                        <Avatar src={track?.album?.images[0]?.url} />
                      </StyledListItemNew>
                    )}

                    <StyledListItemNew sx={{ flex: 25 }} role="none">
                      {track?.name}
                    </StyledListItemNew>
                    <StyledListItemNew sx={{ flex: 6 }} role="none">
                      {track?.album.release_date}
                    </StyledListItemNew>
                    <StyledListItemNew sx={{ flex: 1 }} role="none">
                      {msToMinutesAndSeconds(track?.duration_ms)}
                    </StyledListItemNew>
                    <StyledListItemNew
                      sx={{
                        flex: 1,
                        visibility: isChecked ? "visible" : "hidden",
                      }}
                      role="none"
                    >
                      <Checkbox checked={isChecked} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCheckboxToggle(e, track, true)} />
                    </StyledListItemNew>
                  </ListItemButton>
                </List>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>

        <Box margin={"auto"} height={200} width={500} my={4} display="flex" alignItems="center" justifyContent="center" gap={4} p={2}>
          <SearchToAdd playlistTracks={tracks} handleAddTrack={handleAddTrack} setTracks={setTracks} />
        </Box>
      </Paper>
    </>
  );
};

export default ReorderListPlaylist;
