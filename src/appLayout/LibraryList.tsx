import React, { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { reducerActionTypes } from "../constants";
import RightClickMenu from "../features/RightClickMenu";
import { StyledListItemIcon } from "./styledComponents";
import { StoreContext } from "../context/ContextProvider";
import AreYouSurePrompt from "../components/AreYouSurePrompt";
import { removeFromLibrary } from "../customHooks/useFetchMusicInfo";
import { makeArrayUnique } from "../utils";

interface LibraryListProps {
  open: boolean;
}

const LibraryList: React.FC<LibraryListProps> = ({ open }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { userPlaylists, userAlbums } = state;
  const { accessToken } = state;
  const [menuOptions, setMenuOptions] = useState<Array<{ label: string; action: () => void }>>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Adjust type as per your item structure
  const [openDialog, setOpenDialog] = useState(false);

  const handleContextMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: any) => {
    event.preventDefault();
    setSelectedItem(item);
    setMenuOptions([{ label: "remove from library", action: () => setOpenDialog(true) }]);
  };

  const removeFromLibraryHandler = async (playlist: any) => {
    try {
      const removeRes = await removeFromLibrary(accessToken, [playlist.id], playlist.type);
      console.log("removeRes ", removeRes);
      dispatch({
        type: reducerActionTypes.SET_USER_PLAYLISTS,
        payload: state.userPlaylists.filter((item) => item.id !== playlist.id),
      });
    } catch (error) {
      console.log("err ", error);
    }
  };

  const handleDeleteConfirm = async () => {
    await removeFromLibraryHandler(selectedItem);
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <List>
      <AreYouSurePrompt open={openDialog} onClose={handleDialogClose} onConfirm={handleDeleteConfirm} />
      <RightClickMenu menuOptions={menuOptions}>
        {makeArrayUnique([...userPlaylists, ...userAlbums]).map((item, i) => {
          return item ? (
            <Link key={item.id} style={{ textDecoration: "none", color: "black" }} to={`/${item.type}/${item.id}`}>
              <ListItem onContextMenu={(event) => handleContextMenu(event, item)} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <StyledListItemIcon
                    sx={{
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item?.images?.length > 0 && <img src={item?.images[item.type === "playlist" ? 0 : 2].url} alt="Folder Icon" />}
                  </StyledListItemIcon>
                  <ListItemText
                    secondary={item.type}
                    primaryTypographyProps={{
                      fontSize: "14px",
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
