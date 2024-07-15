import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Box, Checkbox, Divider, List, ListItem, ListItemButton } from '@mui/material';
import { handleCheckboxToggle, msToMinutesAndSeconds } from 'src/utils';
import { StoreContext } from 'src/context/ContextProvider';
import { Track, TrackShortV } from 'src/types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TrackDetails from "./TrackDetails"
import { Card, CardMedia, CardContent, Chip } from '@mui/material';
import { ListItemAvatar, ListItemText, ListItemSecondaryAction, Typography } from '@mui/material';
import QueueList from './QueueList';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CurrentSongPlaying({ drawerWidthState, open }: { drawerWidthState: number; open: boolean }) {
  const { state, dispatch } = React.useContext(StoreContext);
  const [currTab, setCurrTab] = React.useState('up next');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    console.log('newValue ', newValue);

    setCurrTab(newValue);
  };
  const { checkedTracks, playingTrack } = state;

  const properTracks = [...playingTrack?.previousTracks, playingTrack.playing, ...playingTrack?.nextTracks].filter((item: TrackShortV) => item);
//   console.log('properTracks ', properTracks);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        hideBackdrop
        sx={{
          '& .MuiDialog-paper': {
            width: `calc(100vw - ${drawerWidthState}px)`,
            height: `calc(100vh - ${80 + 65}px)`,
            maxWidth: `calc(100vw - ${drawerWidthState}px)`,
            maxHeight: `calc(100vh - ${80 + 65}px)`,
            pointerEvents: 'auto',
            margin: 0,
            boxShadow: 'none',
            position: 'absolute',
            right: 0,
          },
          zIndex: 9,
          top: '65px',
          bottom: '80px',
          pointerEvents: 'none',
        }}>
        <Grid display="flex" spacing={3} sx={{ width: '100%', height: '100%' }}>
          <Grid height="100%" width="60%" justifyContent="center" alignContent="center" alignSelf="center">
            <TrackDetails/>
          </Grid>
          <Grid height="100%" width="40%" overflow="hidden" display="flex" flexDirection="column" boxShadow="5px 5px 10px rgba(0, 0, 0, 0.3);">
            <Box width="100%" display="flex" justifyContent="center">
              <Tabs sx={{ width: '100%', color:"black" }} value={currTab} onChange={handleChange} textColor="primary" indicatorColor="primary" aria-label="primary tabs example">
                <Tab sx={{ width: '50%' }} value="up next" label="up next" />
                <Tab sx={{ width: '50%' }} value="lyrics" label="lyrics" />
              </Tabs>
            </Box>
            <QueueList currTab={currTab}/>
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
