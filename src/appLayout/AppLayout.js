import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { StoreContext } from "../context/ContextProvider";
import AppRouter from "../AppRouter";
import { links } from "../constants";
import Player from "./Player";
import CustomAppBar from "./CustomAppBar";
import CustomDrawer from "./CustomDrawer";
import { DRAWERHEIGHT, drawerWidth } from "../constants";

const AppLayout = ({ chooseTrack, accessToken, playingTrack, divRef }) => {
  const { state } = useContext(StoreContext);
  const { userPlaylists, userAlbums } = state;
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <CustomDrawer
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
            width: open ? `calc(100% - ${drawerWidth}px)` : "90%",
            position: "relative",
          }}
        >
          <Grid>
            <div ref={divRef}></div>
            <AppRouter chooseTrack={chooseTrack} accessToken={accessToken} />
          </Grid>
          <Grid
            position="fixed"
            width={`calc(100% - ${open ? drawerWidth : 64}px)`}
            sx={{
              top: `calc(100vh - 52px)`,
              left: (open ? drawerWidth : 64) + "px",
              zIndex: 9999,
              transition: "0.27s",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="playerBackground">
              <div className="playerSticky">
                <Player
                  accessToken={accessToken}
                  trackUri={playingTrack?.uri}
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
