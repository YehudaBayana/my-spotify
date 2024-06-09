import React, { useContext, useRef } from "react";
import { Route, Switch } from "react-router";
import { StoreContext } from "./context/ContextProvider";
import SearchPage from "./pages/search/SearchPage";
// import React from 'react';
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
// import React from 'react';
import { styled } from "@mui/material/styles";

import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import SongList from "./features/songsList/SongList";
import Main from "./features/Main";

const ResizableDrawer = ({ children, open, handleDrawerClose }) => {
  const [drawerWidth, setDrawerWidth] = useState(250);
  const resizeRef = useRef(null);
  let mouseMoveListener; // Variable to store the reference to the mousemove listener

  const handleMouseDown = (event) => {
    event.preventDefault();
    const initialX = event.clientX;
    mouseMoveListener = handleMouseMove.bind(null, initialX); // Bind with initialX
    document.addEventListener("mousemove", mouseMoveListener);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (initialX, event) => {
    const deltaX = event.clientX - initialX;
    const newWidth = drawerWidth + deltaX;
    setDrawerWidth(Math.max(0, Math.min(window.innerWidth, newWidth))); // Ensure minimum and maximum width
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", mouseMoveListener); // Use the stored reference
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          position: "relative",
          whiteSpace: "nowrap",
          width: drawerWidth,
          transition: "width 0s linear",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton onClick={handleDrawerClose}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        <div
          ref={resizeRef}
          style={{ width: 5, cursor: "ew-resize" }}
          onMouseDown={handleMouseDown}
        />
      </div>
      <Divider />
      {children}
    </Drawer>
  );
};

const StyledListItemIcon = styled(ListItemIcon)({
  width: "36px", // Adjust width as needed for your image
  height: "36px", // Adjust height as needed for your image
  minWidth: "unset",
});

function FolderList() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List>
      <ListItemButton onClick={handleClick}>
        <StyledListItemIcon>
          <img
            src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
            alt="Folder Icon"
          />
        </StyledListItemIcon>
        <ListItemText primary="Documents" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <StyledListItemIcon>
              <img
                src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
                alt="Subfolder Icon"
              />
            </StyledListItemIcon>
            <ListItemText primary="Work" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <StyledListItemIcon>
              <img
                src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
                alt="Subfolder Icon"
              />
            </StyledListItemIcon>
            <ListItemText primary="Personal" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
        <StyledListItemIcon>
          <img
            src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
            alt="Other Folder Icon"
          />
        </StyledListItemIcon>
        <ListItemText primary="Images" />
      </ListItemButton>
    </List>
  );
}
// export default FolderList;

const AppRouter = ({ chooseTrack, accessToken }) => {
  const { state } = useContext(StoreContext);
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main chooseTrack={chooseTrack} />
        </Route>
        <Route exact path="/search">
          <SearchPage accessToken={accessToken} chooseTrack={chooseTrack} />
        </Route>
        <Route path="/savedTracks">
          <h1>saved tracks</h1>
          {/* <SavedTracks chooseTrack={chooseTrack} /> */}
        </Route>
        <Route path="/playlist/:id">
          <SongList chooseTrack={chooseTrack} />
        </Route>
        <Route path="/album/:id">
          <SongList chooseTrack={chooseTrack} />
        </Route>
        <Route path="/folder">
          <FolderList />
        </Route>
        <Route path="/resize">
          <ResizableDrawer open={true}>
            <p>dfdsf</p>
          </ResizableDrawer>
        </Route>
        {/* <Route path="/:id">
          <SeeMore accessToken={accessToken} />
          {state.isClicked && <Playlist chooseTrack={chooseTrack} />}
        </Route> */}
        {/* <Redirect to='/' /> */}
      </Switch>
    </>
  );
};

export default AppRouter;
