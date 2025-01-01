import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { StoreContext } from "./context/ContextProvider";
import SearchPage from "./pages/search/SearchPage";
// import SongList from './features/songsList/SongList';

import GenreList from "./pages/genreList/GenreList";
import SongList from "./pages/playlist/songsList/SongList";
import Home from "./pages/home/Home";
interface AppRouterProps {
  drawerWidthState: number;
}

const AppRouter: React.FC<AppRouterProps> = ({ drawerWidthState }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/search"
        element={
          <SearchPage
            addToPlaylist={false}
            handleAddTrack={() => {}}
            playlistTracks={[]}
            setTracks={() => {}}
          />
        }
      />
      <Route path="/savedTracks" element={<h1>Saved</h1>} />
      <Route path="/playlist/:id" element={<SongList />} />
      <Route path="/genre/:id" element={<GenreList />} />
      <Route path="/album/:id" element={<SongList />} />
    </Routes>
  );
};

export default AppRouter;

// function FolderList() {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <List>
//       <ListItemButton onClick={handleClick}>
//         <StyledListItemIcon>
//           <img
//             src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
//             alt="Folder Icon"
//           />
//         </StyledListItemIcon>
//         <ListItemText primary="Documents" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }}>
//             <StyledListItemIcon>
//               <img
//                 src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
//                 alt="Subfolder Icon"
//               />
//             </StyledListItemIcon>
//             <ListItemText primary="Work" />
//           </ListItemButton>
//           <ListItemButton sx={{ pl: 4 }}>
//             <StyledListItemIcon>
//               <img
//                 src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
//                 alt="Subfolder Icon"
//               />
//             </StyledListItemIcon>
//             <ListItemText primary="Personal" />
//           </ListItemButton>
//         </List>
//       </Collapse>
//       <ListItemButton>
//         <StyledListItemIcon>
//           <img
//             src="https://images.unsplash.com/photo-1717313860625-4d4311b5f9d3?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8" // Replace with your image path
//             alt="Other Folder Icon"
//           />
//         </StyledListItemIcon>
//         <ListItemText primary="Images" />
//       </ListItemButton>
//     </List>
//   );
// }
