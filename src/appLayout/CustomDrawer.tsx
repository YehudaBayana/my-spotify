import React, { useRef, useState } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SortIcon from '@mui/icons-material/Sort';
import { Drawer, DrawerHeader } from './styledComponents';
import LibrarySearch from './LibrarySearch';
import LibraryList from './LibraryList';
import { DRAWERHEIGHT, drawerWidth, MIN_OPEN_WIDTH, CLOSE_WIDTH, links, myColors } from '../constants';
import CreatePlaylist from '../components/CreatePlaylist';

interface CustomDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  drawerWidthState: number;
  setDrawerWidthState: React.Dispatch<React.SetStateAction<number>>;
  deltaXState: number;
  setDeltaXState: React.Dispatch<React.SetStateAction<number>>;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, handleDrawerClose, drawerWidthState, setDrawerWidthState, deltaXState, setDeltaXState }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const resizeRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openNewPlaylist, setOpenNewPlaylist] = React.useState<boolean>(false);
  const openSort = Boolean(anchorEl);
  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = (sortByArg: string) => {
    setAnchorEl(null);
    setSortBy(sortByArg);
  };

  let mouseMoveListener: (event: MouseEvent) => void;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const initialX = event.clientX;
    mouseMoveListener = handleMouseMove.bind(null, initialX);
    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (initialX: number, event: MouseEvent) => {
    const deltaX = event.clientX - initialX;
    let newWidth;
    if (open) {
      if (drawerWidthState + deltaX < 500 && drawerWidthState + deltaX > MIN_OPEN_WIDTH) {
        newWidth = drawerWidthState + deltaX;
      } else if (drawerWidthState + deltaX > 500) {
        newWidth = 500;
      } else {
        newWidth = MIN_OPEN_WIDTH;
      }
    } else {
      newWidth = CLOSE_WIDTH;
    }
    setDeltaXState(newWidth);
    setDrawerWidthState(Math.max(0, Math.min(window.innerWidth, newWidth)));
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', mouseMoveListener);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <CreatePlaylist open={openNewPlaylist} setOpen={setOpenNewPlaylist} />
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
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        variant="permanent"
        open={open}>
        <div style={{ height: '100vh', overflow: 'visible', padding: 0, margin: 0, boxSizing: 'border-box', background: myColors.background }}>
          <div ref={resizeRef} style={{ left: deltaXState, position: 'fixed', float: 'right', height: '100vh', width: 5, cursor: 'ew-resize', zIndex: 999999 }} onMouseDown={handleMouseDown} />
          <DrawerHeader>
            <h2>Yuda music</h2>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
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
          <Grid justifyContent="space-between" container>
            <Grid padding="3px 15px" xs={10} md={9}>
              <Typography bgcolor={myColors.background} color="black" textAlign="start" variant="h6" gutterBottom>
                Your Library
              </Typography>
            </Grid>
            <Grid xs={2} md={3}>
              <Button onClick={() => setOpenNewPlaylist(true)} sx={{ float: 'right' }} color="primary">
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
          <Grid xs={10} md={8}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <LibrarySearch setSearch={setSearch} search={search} />

              <Button
                id="basic-button"
                aria-controls={openSort ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openSort ? 'true' : undefined}
                onClick={handleSortClick}
                color="primary">
                <SortIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openSort}
                onClose={() => handleSortClose(sortBy)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}>
                <MenuItem sx={{ background: sortBy === '' ? 'lightgrey' : '' }} onClick={() => handleSortClose('')}>
                  default
                </MenuItem>
                <MenuItem sx={{ background: sortBy === 'A-Z' ? 'lightgrey' : '' }} onClick={() => handleSortClose('A-Z')}>
                  A-Z
                </MenuItem>
                <MenuItem sx={{ background: sortBy === 'Z-A' ? 'lightgrey' : '' }} onClick={() => handleSortClose('Z-A')}>
                  Z-A
                </MenuItem>
              </Menu>
            </div>
          </Grid>
          <Divider />
          <LibraryList search={search} sortBy={sortBy} open={open} />
        </div>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
