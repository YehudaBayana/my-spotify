import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { StoreContext } from '../context/ContextProvider';
import AppRouter from '../AppRouter';
import { CLOSE_WIDTH, MIN_OPEN_WIDTH, links } from '../constants';
import Player from './Player';
import CustomAppBar from './CustomAppBar';
import CustomDrawer from './CustomDrawer';
import { DRAWERHEIGHT, drawerWidth } from '../constants';
import CurrentSongPlaying from '../features/currentSongPlaying/CurrentSongPlaying';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  accessToken: string;
  divRef: React.RefObject<HTMLDivElement>;
}

const AppLayout: React.FC<AppLayoutProps> = ({ accessToken, divRef }) => {
  const { state } = useContext(StoreContext);
  const [drawerWidthState, setDrawerWidthState] = useState(drawerWidth);
  const [deltaXState, setDeltaXState] = useState(drawerWidth);
  const { queue } = state;
  // console.log("queue ",queue);
  
  const currentlyPlaying = queue.find(item=>item.currentlyPlaying);
  const [open, setOpen] = useState(true);
  const [openFullScreen, setOpenFullScreen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setOpenFullScreen(false)
  }, [location]);

  const handleClickOpen = () => {
    setOpenFullScreen(true);
  };

  const handleClose = () => {
    setOpenFullScreen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    setDrawerWidthState(drawerWidth);
    setDeltaXState(drawerWidth);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setDrawerWidthState(CLOSE_WIDTH);
    setDeltaXState(CLOSE_WIDTH);
  };
  console.log("currentlyPlaying ",currentlyPlaying);
  

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} drawerWidthState={drawerWidthState} />
        <CustomDrawer
          // setOpen={setOpen}
          deltaXState={deltaXState}
          setDeltaXState={setDeltaXState}
          drawerWidthState={drawerWidthState}
          setDrawerWidthState={setDrawerWidthState}
          open={open}
          handleDrawerClose={handleDrawerClose}
          // links={links}
          // userPlaylists={userPlaylists}
          // userAlbums={userAlbums}
        />
        <Box
          component="main"
          sx={{
            marginTop: `${DRAWERHEIGHT}px`,
            marginLeft: '-23px',
            marginRight: '-23px',
            flexGrow: 1,
            width: open ? `calc(100% - ${drawerWidthState}px)` : '90%',
            position: 'relative',
          }}>
          <Grid>
            <div ref={divRef}></div>
            <AppRouter drawerWidthState={drawerWidthState} accessToken={accessToken} />
          </Grid>
          <Grid
            position="fixed"
            width={`calc(100% - ${open ? drawerWidthState : CLOSE_WIDTH}px)`}
            sx={{
              top: `calc(100vh - 80px)`,
              left: `${open ? drawerWidthState : CLOSE_WIDTH}px`,
              zIndex: 10,
              transition: '0s',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              display: state.isDragging ? 'none' : currentlyPlaying ? 'block': 'none',
            }}
            id="yuda"
            onClick={(e:any) => {//_ContentRSWP
              if (e.target.nodeName === "DIV") {
                setOpenFullScreen((old) => !old);
              }
            }}>
            <div className="playerBackground">
              <div className="playerSticky">
                <Player accessToken={accessToken} />
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
      <CurrentSongPlaying open={openFullScreen} drawerWidthState={drawerWidthState} />
    </>
  );
};

export default AppLayout;
