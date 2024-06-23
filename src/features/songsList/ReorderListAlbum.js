import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/ContextProvider';
import { useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { ListItem, Avatar, ListItemButton } from '@mui/material';
import { reducerActionTypes } from '../../constants';
import { fetchPlayableItems } from '../../customHooks/useFetchMusicInfo';
import { makeArrayUnique, msToMinutesAndSeconds } from '../../utils';
import Divider from '@mui/material/Divider';
import AlbumHeader from '../../components/playlistHeader/AlbumHeader';

const StyledListItemNew = styled(ListItem)(({ theme }) => ({
  // flex: '1',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  // border: '1px solid #ccc',
  padding: '10px',
}));

const ReorderListAlbum = () => {
  const location = useLocation();
  const [type, playlistId] = location.pathname.split('/').filter((item) => item);
  const { dispatch, state } = useContext(StoreContext);
  const [album, setAlbum] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function execute() {
      const albumRes = await fetchPlayableItems(state.accessToken || localStorage.getItem('access_token'), playlistId, type);
      console.log('trackRes ', albumRes);
      setAlbum(albumRes);
      if (albumRes?.tracks.items?.length > 0) {
        setItems(makeArrayUnique(albumRes?.tracks.items));
      }
    }
    execute();
  }, [playlistId, type]);

  return (
    <>
      <AlbumHeader album={album} />
      {items?.map((track, index) => {
        return (
          <>
            <List
              onClick={(e) => {
                dispatch({
                  type: reducerActionTypes.SET_PLAYING_TRACK,
                  payload: track,
                });
              }}
              // className={draggingIndex === index ? 'dragging' : ''}
              key={track.id}
              role="menubar"
              orientation="horizontal"
              sx={{ display: 'flex', flexDirection: 'row' }}>
              <ListItemButton>
                <StyledListItemNew key={track.id} sx={{ flex: 1 }} role="none">
                  <Avatar src={album?.images[0]?.url} />
                </StyledListItemNew>
                <StyledListItemNew key={track.id} sx={{ flex: 9 }} role="none">
                  {track.name}
                </StyledListItemNew>
                <StyledListItemNew key={track.id} sx={{ flex: 2 }} role="none">
                  {album.release_date}
                </StyledListItemNew>
                <StyledListItemNew key={track.id} sx={{ flex: 1 }} role="none">
                  {msToMinutesAndSeconds(track.duration_ms)}
                </StyledListItemNew>
              </ListItemButton>
            </List>
            <Divider />
          </>
        );
      })}
    </>
  );
};

export default ReorderListAlbum;
