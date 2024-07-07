import * as React from "react";
import { Button, Grid, IconButton, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { useContext } from "react";
import { StoreContext } from "../../context/ContextProvider";

const emails: string[] = ["username@gmail.com", "user02@gmail.com"];

interface PlaylistType {
  id: string;
  name: string;
  description: string;
  owner: { id: string };
  images: { url: string }[];
  tracks: { total: number };
  snapshot_id: string;
}

interface SimpleDialogProps {
  onClose: (value: string | undefined) => void;
  selectedValue: string | undefined;
  open: boolean;
  handleAddToPlaylist: (playlist: PlaylistType) => void;
}

function SimpleDialog({ onClose, selectedValue, open, handleAddToPlaylist }: SimpleDialogProps) {
  const { state } = useContext(StoreContext);
  const userOwnedPlaylists = state.userPlaylists.filter((playlist: PlaylistType) => playlist.owner.id === state.userName.id);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (playlist: PlaylistType) => {
    handleAddToPlaylist(playlist);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose playlist</DialogTitle>
      <List sx={{ pt: 0 }}>
        {userOwnedPlaylists.map((playlist: PlaylistType) => (
          <ListItem disableGutters key={playlist.id}>
            <ListItemButton onClick={() => handleListItemClick(playlist)}>
              {playlist?.images?.length > 0 && (
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <img width="100%" src={playlist.images[0].url} alt="" />
                  </Avatar>
                </ListItemAvatar>
              )}
              <ListItemText primary={playlist.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleListItemClick({} as PlaylistType)}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Create new playlist" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

interface CheckedTracksActionsProps {
  selected: number;
  handleDelete: () => void;
  handleAddToPlaylist: (playlist: PlaylistType) => void;
  setCheckedTracks: React.Dispatch<React.SetStateAction<any[]>>;
  isPlaylistEditable: boolean;
}

export default function CheckedTracksActions({ selected, handleDelete, handleAddToPlaylist, setCheckedTracks, isPlaylistEditable }: CheckedTracksActionsProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const content = (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "space-around",
        padding: "10px",
        background: "lightblue",
        height: 80,
        width: "100%",
      }}
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Tooltip title="cancel" placement="top">
            <IconButton onClick={() => setCheckedTracks([])}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item justifyContent="center" alignContent="center" xs={5} md={5}>
          <Typography variant="h6">{selected} selected</Typography>
        </Grid>
      </Grid>
      <Stack direction="row" alignItems="center">
        {isPlaylistEditable && (
          <Tooltip title="Delete from playlist" placement="top">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="add to playlist" placement="top">
          <IconButton onClick={handleClickOpenDialog}>
            <PlaylistAddIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <SimpleDialog selectedValue="" handleAddToPlaylist={handleAddToPlaylist} open={openDialog} onClose={handleClose} />
    </Stack>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={true}
      key={"bottom"}
      sx={{
        width: "350px",
        marginBottom: "56px",
        marginLeft: "120px",
        backgroundColor: "lightgrey",
        display: openDialog ? "none" : "flex",
      }}
    >
      {content}
    </Snackbar>
  );
}
