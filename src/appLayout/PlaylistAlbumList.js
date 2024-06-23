// PlaylistAlbumList.js
import React, { useContext, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import RightClickMenu from '../features/RightClickMenu';
import { removePlaylistPlaylist } from '../customHooks/useFetchMusicInfo';
import { StoreContext } from '../context/ContextProvider';
import { StyledListItemIcon } from './styledComponents';
import AreYouSurePrompt from '../components/AreYouSurePrompt';
import { reducerActionTypes } from '../constants';

const PlaylistAlbumList = ({ userPlaylists, userAlbums }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { accessToken } = state;
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleContextMenu = (event, item) => {
    setSelectedItem(item);
    setMenuOptions([
      { label: 'remove from library', action: () => setOpenDialog(item) },
    ]);
  };

  const removeFromLibrary = async (playlist) => {
    try {
      const removeRes = await removePlaylistPlaylist(accessToken, playlist.id);
     
      dispatch({
        type: reducerActionTypes.SET_USER_PLAYLISTS,
        payload: state.userPlaylists.filter(item => item.id !== playlist.id)
      });
    } catch (error) {
      console.log("err ", error);
    }
  };

  const handleDeleteConfirm = async () => {
    await removeFromLibrary(selectedItem);
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <List>
      <AreYouSurePrompt
        open={openDialog}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirm}
      />
      <RightClickMenu menuOptions={menuOptions}>
        {[...userPlaylists, ...userAlbums].map((item) => (
          <Link key={item.id} style={{ textDecoration: 'none', color: 'black' }} to={`/${item.type}/${item.id}`}>
            <ListItem onContextMenu={(event) => handleContextMenu(event, item)} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'initial',
                  backgroundColor: 'lightgrey',
                }}>
                <StyledListItemIcon
                  sx={{
                    mr: 3,
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
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </RightClickMenu>
    </List>
  );
};

export default PlaylistAlbumList;
