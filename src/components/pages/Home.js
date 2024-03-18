import React, { useState, useEffect, useRef, useContext } from "react";
import useAuth from "../../customHooks/useAuth";
import Player from "../features/Player";
import TrackSearchResult from "../features/TrackSearchResult";
import "../../index.css";
import Mobile from "../features/mobile/Mobile";
import SideBar from "../features/sidebar/SideBar";
import { StoreContext } from "../context/ContextProvider";
import useFetchAllMusic from "../../customHooks/useFetchAllMusic";
import Navbar from "../features/Navbar";
import AppRouter from "../../AppRouter";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
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
import Slide from "@mui/material/Slide";
import { Grid } from "@mui/material";
import AppLayout from "../features/appLayout/AppLayout";

//------------------------
const drawerWidth = 240;

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
      minHeight: 55,
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

export default function Home({ code }) {
  //----------------
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //----------------
  const { state, dispatch } = useContext(StoreContext);
  const accessToken = useAuth(code);
  const searchRef = useRef("");
  const [playingTrack, setPlayingTrack] = useState();
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  function chooseTrack(track) {
    setPlayingTrack(track);
    dispatch({ type: "setSearch", payload: "" });
    searchRef.current.value = "";
  }

  useFetchAllMusic(accessToken);

  function searchFocus() {
    searchRef.current.focus();
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  return (
    <>
      {windowWith > 500 ? (
        <AppLayout chooseTrack={chooseTrack} />
      ) : (
        <>
          <Mobile
            searchRef={searchRef}
            chooseTrack={chooseTrack}
            myFocus={searchFocus}
          />
          <div className="searchResultsWrapper">
            {state.searchResults.map((track) => (
              <TrackSearchResult
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </div>
        </>
      )}

      <div className="playerBackground">
        <div className="playerSticky">
          <div>
            <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
          </div>
        </div>
      </div>
    </>
  );
}
