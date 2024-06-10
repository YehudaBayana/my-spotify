import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import AccountMenu from '../features/accountMenu/AccountMenu';
import { DRAWERHEIGHT, drawerWidth } from '../constants';

const CustomAppBar = ({ open, handleDrawerOpen, drawerWidthState }) => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidthState,
      width: `calc(100% - ${drawerWidthState}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  return (
    <AppBar open={open} sx={{ height: DRAWERHEIGHT }} color="secondary">
      <Toolbar sx={{ height: DRAWERHEIGHT }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}>
          <MenuIcon />
        </IconButton>
        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={4} width="100%">
          {/* <h2>Yuda music</h2> */}
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
