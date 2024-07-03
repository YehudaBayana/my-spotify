import React, { useContext, useRef } from 'react';
// import { Route, Switch } from 'react-router';
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';
import { StoreContext } from './context/ContextProvider';
import SearchPage from './pages/search/SearchPage';
// import React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import SongList from './features/songsList/SongList';
import Main from './features/Main';
// import './index.css';

const StyledListItemIcon = styled(ListItemIcon)({
  width: '36px', // Adjust width as needed for your image
  height: '36px', // Adjust height as needed for your image
  minWidth: 'unset',
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
// export const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Main drawerWidthState={drawerWidthState}  />}>
//       <Route path="dashboard" element={<Dashboard />} />
//       {/* ... etc. */}
//     </Route>
//   )
// );
const AppRouter = ({ accessToken, drawerWidthState }) => {
  const { state } = useContext(StoreContext);
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main drawerWidthState={drawerWidthState} />} />
        <Route path="/search" element={<SearchPage accessToken={accessToken} />} />
        <Route path="/savedTracks" element={<h1>Saved</h1>} />
        <Route path="/playlist/:id" element={<SongList />} />
        <Route path="/album/:id" element={<SongList />} />
      </Routes>
    // </BrowserRouter>
    // <BrowserRouter>
    //   <Routes>
    //     <Route exact path="/">
    //       <Main drawerWidthState={drawerWidthState} />
    //     </Route>
    //     <Route path="/search">
    //       <SearchPage accessToken={accessToken} />
    //     </Route>
    //     <Route path="/savedTracks">
    //       <h1>saved </h1>
    //     </Route>
    //     <Route path="/playlist/:id">
    //       <SongList />
    //     </Route>
    //     <Route path="/album/:id">
    //       <SongList />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
};

export default AppRouter;
