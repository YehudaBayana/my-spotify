import React, { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { myColors, reducerActionTypes } from "../constants";
import RightClickMenu from "../features/RightClickMenu";
import { StyledListItemIcon } from "./styledComponents";
import { StoreContext } from "../context/ContextProvider";
import AreYouSurePrompt from "../components/AreYouSurePrompt";
// import { getUserAlbums, getUserPlaylists, removeFromLibrary } from "../customHooks/useFetchMusicInfo";
import { makeArrayUnique } from "../utils";
import { Avatar, ListItemAvatar } from "@mui/material";
import { Album, Playlist } from "../types";
import { useQuery } from "@tanstack/react-query";

// import { Album, Playlist } from 'src/types';

interface LibraryListProps {
  open: boolean;
  search: string;
  sortBy: string;
}

const LibraryList: React.FC<LibraryListProps> = ({ open, search, sortBy }) => {
  const { state, dispatch } = useContext(StoreContext);
  const { userName } = state;
  // const userAlbumsQuery = useQuery({ queryKey: ["userAlbums"], queryFn: () => useGetRequest(SpotifyApiUrlsGet.GET_USER_ALBUMS) });
  const userPlaylistsQuery = useQuery({
    queryKey: ["userPlaylists", userName.id],
    // queryFn: () => useGetRequest(SpotifyApiUrlsGet.GET_USER_PLAYLISTS, { user_id: userName.id }),
  });
  const [menuOptions, setMenuOptions] = useState<Array<{ label: string; action: () => void }>>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null); // Adjust type as per your item structure
  const [openDialog, setOpenDialog] = useState(false);
  // if (userAlbumsQuery.isLoading || userPlaylistsQuery.isLoading) {
  //   return <p>loading...</p>;
  // }
  // if (userAlbumsQuery.isError || userPlaylistsQuery.isError) {
  //   return <p>error</p>;
  // }
  let filteredPlaylists: any = [];
  // if (userPlaylistsQuery?.data?.data?.items?.length > 0 && userAlbumsQuery?.data?.data.items?.length > 0) {
  //   filteredPlaylists = [...userPlaylistsQuery.data?.data?.items, ...userAlbumsQuery.data?.data.items.map((item: any) => item.album)].filter(
  //     (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
  //   );
  // }
  const handleContextMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, item: any) => {
    event.preventDefault();
    setSelectedItem(item);
    setMenuOptions([{ label: "remove from library", action: () => setOpenDialog(true) }]);
  };

  const removeFromLibraryHandler = async (playlist: Album | Playlist) => {
    try {
      // const removeRes = await removeFromLibrary([playlist.id], playlist.type);
      // console.log("removeRes ", removeRes);
      if (playlist.type === "playlist") {
        // const { del } = useDeleteRequest(SpotifyApiUrlsDelete.REMOVE_FROM_LIBRARY_PLAYLIST, { playlist_id: [playlist.id] });
        // await del();
        dispatch({
          type: reducerActionTypes.SET_USER_PLAYLISTS,
          payload: state.userPlaylists.filter((item) => item.id !== playlist.id),
        });
      } else if (playlist.type === "album") {
        // const { del } = useDeleteRequest(SpotifyApiUrlsDelete.REMOVE_FROM_LIBRARY_PLAYLIST, { playlist_id: [playlist.id] });
        // await del();
        dispatch({
          type: reducerActionTypes.SET_USER_ALBUMS,
          payload: state.userAlbums.filter((item) => item.id !== playlist.id),
        });
      }
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

  const handleSortBy = (array: any[]) => {
    let resArray = array;

    if (sortBy === "A-Z") {
      resArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Z-A") {
      resArray.sort((a, b) => b.name.localeCompare(a.name));
    }

    return resArray;
  };

  return (
    <List sx={{ background: myColors.background }}>
      <AreYouSurePrompt open={openDialog} onClose={handleDialogClose} onConfirm={handleDeleteConfirm} />
      <RightClickMenu menuOptions={menuOptions}>
        {handleSortBy(filteredPlaylists).map((item, i) => {
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
                    {item?.images?.length > 0 ? <img src={item?.images[item.type === "playlist" ? 0 : 2].url} alt="Folder Icon" /> : <Avatar>{item?.name[0]}</Avatar>}
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
