import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { StoreContext } from "../context/ContextProvider";
import AppRouter from "../AppRouter";
import { CLOSE_WIDTH, MIN_OPEN_WIDTH, links } from "../constants";
import Player from "./Player";
import CustomAppBar from "./CustomAppBar";
import CustomDrawer from "./CustomDrawer";
import { DRAWERHEIGHT, drawerWidth } from "../constants";

const AppLayout = ({ accessToken, divRef }) => {
  
  const { state } = useContext(StoreContext);
  const [drawerWidthState, setDrawerWidthState] = useState(drawerWidth);
  const [deltaXState, setDeltaXState] = useState(drawerWidth);
  const { userPlaylists, userAlbums } = state;
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
    setDrawerWidthState(drawerWidth);
    setDeltaXState(drawerWidth)
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
    setDrawerWidthState(CLOSE_WIDTH)
    setDeltaXState(CLOSE_WIDTH)
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen} 
        drawerWidthState={drawerWidthState}
        />
        <CustomDrawer
        setOpen={setOpen}
        deltaXState={deltaXState}
        setDeltaXState={setDeltaXState}
          drawerWidthState={drawerWidthState}
          setDrawerWidthState={setDrawerWidthState}
          open={open}
          handleDrawerClose={handleDrawerClose}
          links={links}
          userPlaylists={userPlaylists}
          userAlbums={userAlbums}
        />
        <Box
          component="main"
          sx={{
            marginTop: DRAWERHEIGHT + "px",
            marginLeft: "-23px",
            marginRight: "-23px",
            flexGrow: 1,
            width: open ? `calc(100% - ${drawerWidthState}px)` : "90%",
            position: "relative",
          }}
        >
          <Grid>
            <div ref={divRef}></div>
            <AppRouter drawerWidthState={drawerWidthState} accessToken={accessToken} />
          </Grid>
          <Grid
            position="fixed"
            width={`calc(100% - ${open ? drawerWidthState : 90}px)`}
            // width={`100vw`}
            sx={{
              top: `calc(100vh - 80px)`,
              left: `${open ? drawerWidthState : 90}px`,
              // left: "0px",
              zIndex: 9999,
              transition: "0s",
              // transition: "0.27s",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="playerBackground">
              <div className="playerSticky">
                <Player
                  accessToken={accessToken}
                  // trackUri={state?.playingTrack}
                />
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default AppLayout;
