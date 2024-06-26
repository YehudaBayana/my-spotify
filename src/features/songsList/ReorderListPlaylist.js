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
import {  msToMinutesAndSeconds } from '../../utils';
import Divider from '@mui/material/Divider';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  const [isPlaylistEditable, setIsPlaylistEditable] = useState(false);
  const [playlist, setPlaylist] = useState();
  const [rgb, setRgb] = useState();

  useEffect(() => {
    if (playlist?.images[0]?.url) {
      fetch('https://www.wix.com/benko0/dominant-color/_functions/imagecolor?url=' + playlist?.images[0]?.url, {
        method: 'GET',
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log('res ', res);
          const [r, g, b] = res.color;
          setRgb(`rgba(${r},${g},${b}`);
        })
        .catch((err) => {
          console.log('err ', err);
        });
    }
  }, [playlist]);

  async function execute() {
    const { playlistRes, tracks } = await fetchPlayableItems(accessToken || localStorage.getItem('access_token'), playlistId, type);
    setPlaylist(playlistRes);
    console.log('playlistRes ', playlistRes);
    console.log('ids equal: ', playlistRes.owner.id === state.userName.id);
    console.log('playlistRes.owner.id: ', playlistRes.owner.id);
    console.log('state.userName.id: ', state.userName.id);
    if (playlistRes.owner.id === state.userName.id) {
      setIsPlaylistEditable(true);
    } else {
      setIsPlaylistEditable(false);
    }

    // console.log("tracks ,", tracks);
    if (tracks.length > 0) {
      // setTracks(tracks);
      setTracks(tracks);
    } else {
      setTracks([]);
    }
  }
  useEffect(() => {
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
        console.log('res ', res);
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
      // setTracks((oldTracks) => {
      // const filteredTracks = oldTracks.filter((track) => !checkedTracks.map((item) => item.uri).includes(track.uri));
      await execute();
      // if (filteredTracks.length === 0) {
      //   setPlaylist(old=>({...old, tracks:{items: old.tracks.items.filter((track) => !checkedTracks.map((item) => item.uri).includes(track.uri))}}))
      // }
      // return filteredTracks;
      // });
      setEdit(false);
      setCheckedTracks([]);
    } catch (error) {
      console.log('yuda error ', error);
    }
  };

  const handleAddToPlaylist = async (playlist) => {
    console.log('handle delete ', checkedTracks);
    const body = {
      uris: checkedTracks.map((track) => track.uri),
      position: 0,
    };

    try {
      const removed = await addTracksToPlaylist(accessToken, playlist.id, body);
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

  async function handleAddTrack(track) {
    const body = {
      uris: [track.uri],
      position: 0,
    };
    const addToPlaylistRes = await addTracksToPlaylist(accessToken, playlistId, body);
    // const res = await addToPlaylistRes.json();
    // console.log("addToPlaylistRes ",);

    if (addToPlaylistRes.status === 200) {
      // setPlaylist(old=>{
      //   console.log("new playlist ",{...old, tracks:{total: old.tracks.total, items:[...old.tracks.items,track]}});
      //   return ({...old, tracks:{total: old.tracks.total ? old.tracks.total + 1 : 1, items:[...old.tracks.items,track]}})
      // });
      // setTracks(old=>{
      //   return [...old, track]
      // });
      execute();
    }
    return addToPlaylistRes;
  }

  return (
    <>
      <PlaylistHeader rgb={rgb} isPlaylistEditable={isPlaylistEditable} edit={edit} setEdit={setEdit} playlist={playlist} setCheckedTracks={setCheckedTracks} />
      <Paper sx={{ minHeight: '90vh', background: rgb ? `linear-gradient(to bottom, ${rgb}, 0.5) 0%, ${rgb}, 0) 10%)` : 'lightgrey' }}>
        {checkedTracks.length > 0 && <CheckedTracksActions isPlaylistEditable={isPlaylistEditable} selected={checkedTracks.length} handleDelete={handleDelete} handleAddToPlaylist={handleAddToPlaylist} setCheckedTracks={setCheckedTracks} />}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <List elevation={0} style={{ background: 'rgba(255,255,255,0)', borderRadius: '0px' }} {...provided.droppableProps} ref={provided.innerRef} component={Paper}>
                {tracks?.map((track, index) => {
                  console.log("checkedTracks ",checkedTracks);
                  const isChecked = checkedTracks.find(item=>item.uri === track.uri)
                  // console.log('track.id ', track.id);
                  return (
                    <>
                      <Draggable isDragDisabled={!isPlaylistEditable ? true : isUpdating} key={index} draggableId={index + ''} index={index}>
                        {(provided) => (
                          <>
                            <List
                              onClick={(e) => {
                                handleTrackClick(e, track, false);
                              }}
                              // className={draggingIndex === index ? 'dragging' : ''}
                              key={track?.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              role="menubar"
                              orientation="horizontal"
                              sx={{ height: '50px', display: 'flex', flexDirection: 'row', padding: '0' }}>
                              <ListItemButton sx={{ position: 'relative', '&:hover .MuiCheckbox-root': { visibility: 'visible' }}}>
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
                                <StyledListItemNew sx={{ flex: 3 }} role="none">
                                  {track?.album.release_date}
                                </StyledListItemNew>
                                <StyledListItemNew sx={{ flex: 1 }} role="none">
                                  {msToMinutesAndSeconds(track?.duration_ms)}
                                </StyledListItemNew>
                                {/* {edit && ( */}
                                  <StyledListItemNew sx={{ flex: 1, visibility: isChecked ? 'visible' : "hidden" }} role="none">
                                    <Checkbox checked={isChecked} onClick={(e) => handleTrackClick(e, track, true)} />
                                  </StyledListItemNew>
                                {/* )} */}
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

        {/* <Box margin={'auto'} height={200} width={500} my={4} display="flex" alignItems="center" justifyContent="center" gap={4} p={2}>
          <SearchToAdd playlistTracks={tracks} handleAddTrack={handleAddTrack} />
        </Box> */}
      </Paper>
    </>
  );
};
export default ReorderListPlaylist;
