import React, { useContext, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { StoreContext } from '../../context/ContextProvider';
import PlaylistHeader from '../../components/playlistHeader/PlaylistHeader';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { ListItem, Avatar, ListItemButton, Checkbox } from '@mui/material';
import { reducerActionTypes } from '../../constants';
import { addTracksToPlaylist, fetchPlayableItems, removeFromPlaylist, updatePlaylist } from '../../customHooks/useFetchMusicInfo';
import { makeArrayUnique, msToMinutesAndSeconds } from '../../utils';
import Divider from '@mui/material/Divider';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Height } from '@mui/icons-material';
import CheckedTracksActions from './CheckedTracksActions';

const StyledListItemNew = styled(ListItem)(({ theme }) => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '10px',
}));

const ReorderListPlaylist = ({ edit, setEdit }) => {
  const location = useLocation();
  const [type, playlistId] = location.pathname.split('/').filter((item) => item);
  const { dispatch, state } = useContext(StoreContext);
  const { accessToken } = state;
  const [tracks, setTracks] = useState([]);
  const [checkedTracks, setCheckedTracks] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [playlist, setPlaylist] = useState();
  // const [checkedActionsOpen, setCheckedActionsOpen] = useState(false);

  // useEffect(() => {
  //   // setCheckedActionsOpen(true);
  // }, [edit])

  // const handleClick = (newState) => () => {
  //   setCheckedActionsOpen({ ...checkedActionsOpen, open: true });
  // };

  // const handleClose = () => {
  //   setCheckedActionsOpen({ ...checkedActionsOpen, open: false });
  // };

  useEffect(() => {
    async function execute() {
      const { playlistRes, tracks } = await fetchPlayableItems(accessToken || localStorage.getItem('access_token'), playlistId, type);
      setPlaylist(playlistRes);
      // console.log("tracks ,", tracks);
      if (tracks.length > 0) {
        // setTracks(tracks);
        setTracks(
          tracks
          // makeArrayUnique(tracks)
          // [...new Set(tracks.map((obj) => obj.id))].map((id) => {
          //   // Find the object with the matching ID in the original array
          //   return tracks.find((obj) => obj.id === id);
          // })
        );
      }
    }
    execute();
  }, [playlistId, type]);

  const handleOnDragEnd = (result) => {
    console.log('result ', result);
    if (!result.destination) return;

    const newItems = Array.from(tracks);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    const body = {
      range_start: result.source.index,
      insert_before: result.destination.index + 1,
      range_length: 1,
    };
    setIsUpdating(true);
    const tempTracks = tracks;
    setTracks(newItems);
    updatePlaylist(accessToken, playlistId, body)
      .then((res) => {
        console.log("res ",res);
        if (!res) {
          setTracks(tempTracks);
        }
      })
      .catch((err) => {
        setTracks(tempTracks);
        console.log('err ', err);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleTrackClick = (e, track, isCheckbox) => {
    e.stopPropagation();
    if (isCheckbox) {
      // setAllChecked(old=>!old);
      setCheckedTracks((oldValue) => {
        if (e.target.checked) {
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
    } else {
      dispatch({
        type: reducerActionTypes.SET_PLAYING_TRACK,
        payload: track,
      });
    }
  };

  const handleDelete = async () => {
    console.log('handle delete ', checkedTracks);
    try {
      const removed = await removeFromPlaylist(accessToken, playlist.id, checkedTracks, playlist.snapshot_id);
      console.log('removed ', removed.json());
      setTracks((oldTracks) => {
        console.log('before ', oldTracks);
        console.log(
          'after ',
          oldTracks.filter((track) => !checkedTracks.map((item) => item.uri).includes(track.uri))
        );
        return oldTracks.filter((track) => !checkedTracks.map((item) => item.uri).includes(track.uri));
      });
      setEdit(false);
      setCheckedTracks([]);
    } catch (error) {
      console.log('yuda error ', error);
    }
  };

  const handleAddToPlaylist = async () => {
    console.log('handle delete ', checkedTracks);
    // const body = {
    //   uris: checkedTracks.map(track => track.uri),
    //   position:0
    // }
    // try {
    //   const removed = await addTracksToPlaylist(accessToken, playlist.id, body);
    //   console.log('removed ', removed.json());
    //   setTracks((oldTracks) => {
    //     console.log('before ', oldTracks);
    //     console.log(
    //       'after ',
    //       oldTracks.filter((track) => !checkedTracks.map((item) => item.uri).includes(track.uri))
    //     );
    //     return oldTracks.filter((track) => !checkedTracks.map((item) => item.uri).includes(track.uri));
    //   });
    //   setEdit(false);
    //   setCheckedTracks([]);
    // } catch (error) {
    //   console.log('yuda error ', error);
    // }
  };

  return (
    <>
      <PlaylistHeader edit={edit} setEdit={setEdit} playlist={playlist} />
      {edit && <CheckedTracksActions selected={checkedTracks.length} handleDelete={handleDelete} handleAddToPlaylist={handleAddToPlaylist} open={edit} />}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <List style={{ borderRadius: '0px' }} {...provided.droppableProps} ref={provided.innerRef} component={Paper}>
              {tracks?.map((track, index) => {
                // console.log('track.id ', track.id);
                return (
                  <>
                    <Draggable isDragDisabled={isUpdating} key={index} draggableId={index+""} index={index}>
                      {(provided) => (
                        <>
                          <List
                            onClick={(e) => {
                              handleTrackClick(e, track, false);
                            }}
                            // className={draggingIndex === index ? 'dragging' : ''}
                            key={track.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            role="menubar"
                            orientation="horizontal"
                            sx={{ height: '50px', display: 'flex', flexDirection: 'row', padding: '0' }}>
                            <ListItemButton>
                            <StyledListItemNew key={track.id} sx={{ flex: 1 }} role="none">
                                  {index + 1}
                                </StyledListItemNew>
                              <StyledListItemNew key={track.id} sx={{ flex: 2 }} role="none">
                                <Avatar src={track?.album?.images[0]?.url} />
                              </StyledListItemNew>
                              <StyledListItemNew key={track.id} sx={{ flex: 25 }} role="none">
                                {track.name}
                              </StyledListItemNew>
                              <StyledListItemNew key={track.id} sx={{ flex: 5 }} role="none">
                                {track.album.release_date}
                              </StyledListItemNew>
                              <StyledListItemNew key={track.id} sx={{ flex: 3 }} role="none">
                                {msToMinutesAndSeconds(track.duration_ms)}
                              </StyledListItemNew>
                              {edit && (
                                <StyledListItemNew key={track.id} sx={{ flex: 5 }} role="none">
                                  <Checkbox onClick={(e) => handleTrackClick(e, track, true)} />
                                </StyledListItemNew>
                              )}
                            </ListItemButton>
                          </List>
                          <Divider />
                        </>
                      )}
                    </Draggable>
                  </>
                );
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default ReorderListPlaylist;
