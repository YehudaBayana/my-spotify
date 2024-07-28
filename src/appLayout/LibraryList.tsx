import React, { useContext, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { myColors, reducerActionTypes } from '../constants';
import RightClickMenu from '../features/RightClickMenu';
import { StyledListItemIcon } from './styledComponents';
import { StoreContext } from '../context/ContextProvider';
import AreYouSurePrompt from '../components/AreYouSurePrompt';
import { removeFromLibrary } from '../customHooks/useFetchMusicInfo';
import { makeArrayUnique } from '../utils';
import { Avatar, ListItemAvatar } from '@mui/material';
import { Album, Playlist } from '../types';
// import { Album, Playlist } from 'src/types';

interface LibraryListProps {
  open: boolean;
  search: string;
  sortBy: string;
}

const LibraryList: React.FC<LibraryListProps> = ({ open, search, sortBy }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { userPlaylists, userAlbums } = state;
  const { accessToken } = state;
  const [menuOptions, setMenuOptions] = useState<Array<{ label: string; action: () => void }>>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Adjust type as per your item structure
  const [openDialog, setOpenDialog] = useState(false);
  
  let filteredPlaylists: any = [];
  if (userPlaylists) {
    filteredPlaylists = [...userPlaylists, ...userAlbums].filter((item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1); 
  }
  const handleContextMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: any) => {
    event.preventDefault();
    setSelectedItem(item);
    setMenuOptions([{ label: 'remove from library', action: () => setOpenDialog(true) }]);
  };

  const removeFromLibraryHandler = async (playlist: Album | Playlist) => {
    try {
      
      const removeRes = await removeFromLibrary(accessToken, [playlist.id], playlist.type);
      console.log('removeRes ', removeRes);
      if (playlist.type === "playlist") {
        dispatch({
          type: reducerActionTypes.SET_USER_PLAYLISTS,
          payload: state.userPlaylists.filter((item) => item.id !== playlist.id),
        });
        
      } else if (playlist.type === "album"){
        dispatch({
          type: reducerActionTypes.SET_USER_ALBUMS,
          payload: state.userAlbums.filter((item) => item.id !== playlist.id),
        });
      }
    } catch (error) {
      console.log('err ', error);
    }
  };

  const handleDeleteConfirm = async () => {
    await removeFromLibraryHandler(selectedItem);
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSortBy = (array: any[]) => {
    let resArray = array;
    
    if (sortBy === 'A-Z') {
      resArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Z-A') {
      resArray.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    return resArray;
  };

  return (
    <List sx={{background: myColors.background}}>
      <AreYouSurePrompt open={openDialog} onClose={handleDialogClose} onConfirm={handleDeleteConfirm} />
      <RightClickMenu menuOptions={menuOptions}>
        {handleSortBy(filteredPlaylists).map((item, i) => {
          return item ? (
            <Link key={item.id} style={{ textDecoration: 'none', color: 'black' }} to={`/${item.type}/${item.id}`}>
              <ListItem onContextMenu={(event) => handleContextMenu(event, item)} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                  }}>
                  <StyledListItemIcon
                    sx={{
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}>
                    {item?.images?.length > 0 ? <img src={item?.images[item.type === 'playlist' ? 0 : 2].url} alt="Folder Icon" /> : <Avatar>{item?.name[0]}</Avatar>}
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
          ) : null;
        })}
      </RightClickMenu>
    </List>
  );
};

export default LibraryList;
