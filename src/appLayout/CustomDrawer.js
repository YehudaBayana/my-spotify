import React, { useContext, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { drawerWidth, DRAWERHEIGHT, MIN_OPEN_WIDTH, CLOSE_WIDTH, reducerActionTypes } from '../constants';
// import { useTheme } from '@mui/styles';
import LibrarySearch from './LibrarySearch';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import RightClickMenu from '../features/RightClickMenu';
import { Drawer, DrawerHeader, StyledListItemIcon } from './styledComponents';
import { removePlaylistPlaylist } from '../customHooks/useFetchMusicInfo';
import { StoreContext } from '../context/ContextProvider';
import AreYouSurePrompt from '../components/AreYouSurePrompt';
import LibraryList from './LibraryList';


const CustomDrawer = ({ open, handleDrawerClose, links, userPlaylists, userAlbums, drawerWidthState, setDrawerWidthState, deltaXState, setDeltaXState, setOpen }) => {
  // const theme = useTheme();
  const resizeRef = useRef(null);
  let mouseMoveListener; 

  // const handleContextMenu = (event, item) => {
  //   setSelectedItem(item);
  //   setMenuOptions([
  //     { label: 'remove from library', action: () => setOpenDialog(item) },
  //   ]);
  // };

  // const removeFromLibrary = async (playlist) => {
  //   try {
  //     const removeRes = await removePlaylistPlaylist(accessToken, playlist.id)
  //     dispatch({
  //       type: reducerActionTypes.SET_USER_PLAYLISTS,
  //       payload: state.userPlaylists.filter(item => item.id !== playlist.id)
  //     })
  //   } catch (error) {
  //    console.log("err ",error); 
  //   }
  // };

  // const handleDeleteConfirm = async () => {
  //   await removeFromLibrary(selectedItem);
  //   setOpenDialog(false);
  // };

  // const handleDialogClose = () => {
  //   setOpenDialog(false);
  // };

  const handleMouseDown = (event) => {
    event.preventDefault();
    const initialX = event.clientX;
    mouseMoveListener = handleMouseMove.bind(null, initialX); // Bind with initialX
    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (initialX, event) => {
    const deltaX = event.clientX - initialX;
    let newWidth;
    if (open) {
      if ((drawerWidthState + deltaX) < 500 && (drawerWidthState + deltaX) > MIN_OPEN_WIDTH) {
        newWidth = (drawerWidthState + deltaX);
      }else if ((drawerWidthState + deltaX) > 500) {
        newWidth = 500;
      } else {
          newWidth = MIN_OPEN_WIDTH;
      }
    }else{
      newWidth = CLOSE_WIDTH
    }
    setDeltaXState(newWidth);
    setDrawerWidthState(Math.max(0, Math.min(window.innerWidth, newWidth))); // Ensure minimum and maximum width
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', mouseMoveListener); // Use the stored reference
    document.removeEventListener('mouseup', handleMouseUp);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidthState,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          whiteSpace: 'nowrap',
          width: drawerWidthState,
          transition: 'width 0s linear',
        },
        '& ::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none' /* IE and Edge */,
        scrollbarWidth: 'none' /* Firefox */,
      }}
      variant="permanent"
      open={open}>
      <div style={{ height: '100vh', overflow: 'visible', padding: 0, margin: 0, boxSizing: 'border-box' }}>
        <div ref={resizeRef} style={{ left: deltaXState, position: 'fixed', float: 'right', height: '100vh', width: 5, cursor: 'ew-resize', zIndex: 999999 }} onMouseDown={handleMouseDown} />
        <DrawerHeader>
          <h2>Yuda music</h2>
          <IconButton onClick={handleDrawerClose}><ChevronLeftIcon /></IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((obj) => (
            <Link key={obj.text} style={{ textDecoration: 'none', color: 'black' }} to={obj.path}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}>
                    {obj.icon}
                  </ListItemIcon>
                  <ListItemText primary={obj.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <Grid container>
          <Grid xs={10} md={9}>
            <Typography bgcolor="lightgray" textAlign="center" variant="h6" gutterBottom>
              Your Library
            </Typography>
          </Grid>
          <Grid xs={2} md={3}>
            <Button color="secondary">
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid xs={10} md={8}>
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <LibrarySearch />

            <Button color="secondary">
            <SortIcon />
            </Button>
          </div>
        </Grid>
        <Divider />
        <LibraryList open={open}/>
        {/* <List>
        <AreYouSurePrompt
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirm}
      />
          <RightClickMenu menuOptions={menuOptions} >
          {[...userPlaylists, ...userAlbums].map((item) => (
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${item.type}/${item.id}`}>
              <ListItem onContextMenu={(event) => handleContextMenu(event, item)} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    backgroundColor: 'lightgrey',
                  }}>
                  <StyledListItemIcon
                    sx={{
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}>
                    <img src={item.images[item.type === 'playlist' ? 0 : 2].url} alt="Folder Icon" />
                  </StyledListItemIcon>
                  <ListItemText
                    secondary={item.type}
                    primaryTypographyProps={{
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                    primary={item.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </RightClickMenu>
        </List> */}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
