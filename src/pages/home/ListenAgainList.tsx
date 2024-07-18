import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/ContextProvider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Avatar, Container, Divider, List, ListItem, ListItemButton, Typography } from '@mui/material';
import { myColors, reducerActionTypes } from '../../constants';
import { getUserTopTracks } from 'src/customHooks/useFetchMusicInfo';
import { Track } from 'src/types';
import { handlePlayTrack, msToMinutesAndSeconds } from 'src/utils';

const TrackItem = ({ track, tracks, dispatch }: { track: Track; tracks: Track[]; dispatch: any }) => {
  return (
    <>
      <List
        className="list-item"
        onClick={(e: React.MouseEvent<HTMLUListElement>) => {
          handlePlayTrack(tracks, track, dispatch);
        }}
        sx={{
          borderRadius: '5px',
          background: myColors.secondary,
          height: '50px',
          display: 'flex',
          flexDirection: 'row',
          padding: '0',
          margin: '10px',
        }}>
        <ListItemButton
          sx={{
            padding: 0,
            position: 'relative',
            '&:hover .MuiCheckbox-root': {
              visibility: 'visible',
            },
          }}
          className="draggable"
          disableRipple>
          {/* {track?.album?.images[0]?.url && ( */}
          <ListItem sx={{ flex: 1, padding: '5px' }} role="none">
            <Avatar variant="square" src={track.album.images[0].url} />
          </ListItem>
          {/* )} */}

          <ListItem sx={{ flex: 25 }} role="none">
            {track.name}
          </ListItem>
          <ListItem sx={{ flex: 1 }} role="none">
            {msToMinutesAndSeconds(track.duration_ms)}
          </ListItem>
        </ListItemButton>
      </List>
      <Divider />
    </>
  );
};


export function ListenAgainList() {
  const { state, dispatch } = useContext(StoreContext);
  const { accessToken, listenAgainTracks } = state;
  useEffect(() => {
    async function execute() {
      if (accessToken && listenAgainTracks.length < 1) {
        try {
          const topTracksRes = await getUserTopTracks(accessToken);
          console.log('top Tracks res ', topTracksRes);
          dispatch({
            type: reducerActionTypes.SET_LISTEN_AGAIN_TRACKS,
            payload:topTracksRes.items
          })
        } catch (error) {
          console.log('error ', error);
        }
      }
    }
    execute();
    return () => {};
  }, [accessToken]);

  const itemsPerColumn = 3;
  const itemWidth = 350; // Adjust the item width as needed
  let content: any[] = [];
  for (let i = 0; i < listenAgainTracks?.length; i++) {
    const track = listenAgainTracks[i];
    const trackTwo = listenAgainTracks[i + 1];
    const trackThree = listenAgainTracks[i + 2];
    if (i % itemsPerColumn === 0) {
      content.push(
        <Grid>
          <Grid item sx={{ width: itemWidth }}>
            <TrackItem tracks={listenAgainTracks} dispatch={dispatch} track={track} />
          </Grid>
          {trackTwo && (
            <Grid item sx={{ width: itemWidth }}>
              <TrackItem tracks={listenAgainTracks} dispatch={dispatch} track={trackTwo} />
            </Grid>
          )}
          {trackThree && (
            <Grid item sx={{ width: itemWidth }}>
              <TrackItem tracks={listenAgainTracks} dispatch={dispatch} track={trackThree} />
            </Grid>
          )}
        </Grid>
      );
    }
  }

  return (
    <Box padding="0 24px" marginTop="40px">
      <Typography variant="h4" padding="0 10px">
        Listen Again
      </Typography>
      <Box className="scrollable-element" sx={{ display: 'flex', overflow: 'auto', width: '100%' }}>
        {content}
      </Box>
    </Box>
  );
}
