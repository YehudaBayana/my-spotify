import React, { useState, useEffect, useRef, useContext } from "react";
import AppRouter from "../../../AppRouter";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Grid, Input, TextField, Typography } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import "./appLayout.css";
import classNames from "classnames";
import AccountMenu from "../accountMenu/AccountMenu";
import Player from "../Player";
import { links } from "../../../constants";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { StoreContext } from "../../context/ContextProvider";

const StyledListItemIcon = styled(ListItemIcon)({
  width: "36px", // Adjust width as needed for your image
  height: "36px", // Adjust height as needed for your image
  minWidth: "unset",
  marginRight: "10px !important",
});

const drawerWidth = 240;
const DRAWERHEIGHT = 65;
// const openIframe = () => {
//     const spotifyEmbedWindow = document.querySelector('iframe[src*="spotify.com/embed"]').contentWindow;
//     spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
// }
const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    ["@media (min-width:600px)"]: {
      minHeight: DRAWERHEIGHT,
    },
  };
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
//-------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    // Reset all default CSS styles
    all: "unset",
  },
}));

const AppLayout = ({ chooseTrack, accessToken, playingTrack, divRef }) => {
  const { state } = useContext(StoreContext);
  const { userPlaylists, userAlbums } = state;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //------
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} sx={{ height: DRAWERHEIGHT }} color="secondary">
          <Toolbar sx={{ height: DRAWERHEIGHT }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={4}
              width="100%"
            >
              {/* <SearchInput /> */}
              <h2>Yuda music</h2>
              <AccountMenu />
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <h2>Yuda music</h2>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {links.map((obj, index) => (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={obj.path}
              >
                <ListItem
                  key={obj.text}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {obj.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={obj.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            <Typography variant="h6" gutterBottom>
              your library
            </Typography>
            <Divider />
            {[...userPlaylists, ...userAlbums].map((item, i) => {
              return (
                <ListItem key={i} disablePadding sx={{ display: "block" }}>
                  {/* <Link style={{ textDecoration: 'none', color: 'black' }} to="/search"> */}
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/${item.type}/${item.id}`}
                    key={item.id}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        // px: 2.5,
                        backgroundColor: "lightgrey",
                      }}
                    >
                      <StyledListItemIcon
                        sx={{
                          // width: 0,
                          // min
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={
                            item.images[item.type === "playlist" ? 0 : 2].url
                          } //"https://images.unsplash.com/photo-1717318104110-d8ef457d9c2e?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D" // Replace with your image path
                          alt="Folder Icon"
                        />
                      </StyledListItemIcon>
                      <ListItemText
                        secondary={item.type}
                        primaryTypographyProps={{
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                        primary={item.name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                  {/* </Link> */}
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box
          style={{}}
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
            position={"fixed"}
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
                <div>
                  <Player
                    accessToken={accessToken}
                    trackUri={playingTrack?.uri}
                  />
                </div>
              </div>
            </div>
          </Grid>
        </Box>
      </Box>
      {/* <div className='siteWrapper'> */}
      {/* <SideBar myFocus={searchFocus} /> */}
      {/* <div className='main'> */}
      {/* <Navbar searchRef={searchRef} /> */}
      {/* <AppRouter chooseTrack={chooseTrack} />
         <div style={{ height: '30px', marginBottom: '70px' }}></div>
       </div>
     </div> */}
    </>
  );
};

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppLayout);
