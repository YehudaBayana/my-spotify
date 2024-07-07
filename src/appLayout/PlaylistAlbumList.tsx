// PlaylistAlbumList.tsx

import React, { useContext, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import RightClickMenu from "../features/RightClickMenu";
import { removeFromLibrary } from "../customHooks/useFetchMusicInfo";
import { StoreContext } from "../context/ContextProvider";
import { StyledListItemIcon } from "./styledComponents";
import AreYouSurePrompt from "../components/AreYouSurePrompt";
import { reducerActionTypes } from "../constants";
// import { PlaylistType } from '../types'; // assuming PlaylistType is defined elsewhere
interface PlaylistType {
  id: string;
  name: string;
  description: string;
  owner: { id: string };
  images: { url: string }[];
  tracks: { total: number };
  snapshot_id: string;
  type: string;
}

interface PlaylistAlbumListProps {
  userPlaylists: PlaylistType[];
  userAlbums: PlaylistType[];
}

const PlaylistAlbumList: React.FC<PlaylistAlbumListProps> = ({ userPlaylists, userAlbums }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { accessToken } = state;
  const [menuOptions, setMenuOptions] = useState<{ label: string; action: () => void }[]>([]);
  const [selectedItem, setSelectedItem] = useState<PlaylistType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleContextMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: PlaylistType) => {
    event.preventDefault();
    setSelectedItem(item);
    setMenuOptions([{ label: "remove from library", action: () => setOpenDialog(true) }]);
  };

  const handleRemoveFromPlaylist = async (playlist: PlaylistType) => {
    try {
      const removeRes = await removeFromLibrary(accessToken, [playlist.id]);
      dispatch({
        type: reducerActionTypes.SET_USER_PLAYLISTS,
        payload: state.userPlaylists.filter((item) => item.id !== playlist.id),
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedItem) {
      await handleRemoveFromPlaylist(selectedItem);
      setOpenDialog(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <List>
      <AreYouSurePrompt open={openDialog} onClose={handleDialogClose} onConfirm={handleDeleteConfirm} />
      <RightClickMenu menuOptions={menuOptions}>
        {[...userPlaylists, ...userAlbums].map((item) => (
          <Link key={item.id} style={{ textDecoration: "none", color: "black" }} to={`/${item.type}/${item.id}`}>
            <ListItem onContextMenu={(event: React.MouseEvent<HTMLLIElement, MouseEvent>) => handleContextMenu(event, item)} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  backgroundColor: "lightgrey",
                }}
              >
                <StyledListItemIcon
                  sx={{
                    mr: 3,
                    justifyContent: "center",
                  }}
                >
                  <img src={item.images[item.type === "playlist" ? 0 : 2].url} alt="Folder Icon" />
                </StyledListItemIcon>
                <ListItemText
                  secondary={item.type}
                  primaryTypographyProps={{
                    fontSize: "14px",
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
