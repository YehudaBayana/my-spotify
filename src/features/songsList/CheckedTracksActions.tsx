import * as React from 'react';
import { Button, Grid, IconButton, Snackbar, Stack, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { useContext } from 'react';
import { StoreContext } from '../../context/ContextProvider';
import CreatePlaylist from '../../components/CreatePlaylist';
import { Playlist } from 'src/types';
import { myColors, reducerActionTypes } from 'src/constants';
// import CreatePlaylist from '@components/CreatePlaylist';

const emails: string[] = ['username@gmail.com', 'user02@gmail.com'];

// interface Playlist {
//   id: string;
//   name: string;
//   description: string;
//   owner: { id: string };
//   images: { url: string }[];
//   tracks: { total: number };
//   snapshot_id: string;
//   public:boolean
// }

interface SimpleDialogProps {
  onClose: (value: string | undefined) => void;
  selectedValue: string | undefined;
  open: boolean;
  handleAddToPlaylist: (playlist: Playlist) => void;
  checkedTracks: { uri: string }[];
}

function SimpleDialog({ onClose, selectedValue, open, handleAddToPlaylist, checkedTracks }: SimpleDialogProps) {
  const { state } = useContext(StoreContext);
  const [openNewPlaylist, setOpenNewPlaylist] = React.useState(false);
  const userOwnedPlaylists = state.userPlaylists.filter((playlist: Playlist) => playlist.owner.id === state.userName.id);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (playlist: Playlist) => {
    handleAddToPlaylist(playlist);
  };
  const handleCreatePlaylist = () => {
    setOpenNewPlaylist(true);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <CreatePlaylist checkedTracks={checkedTracks} open={openNewPlaylist} setOpen={setOpenNewPlaylist} />
        <DialogTitle>Choose playlist</DialogTitle>
        <List sx={{ pt: 0 }}>
          {userOwnedPlaylists.map((playlist: Playlist) => (
            <ListItem disableGutters key={playlist.id}>
              <ListItemButton onClick={() => handleListItemClick(playlist)}>
                {playlist?.images?.length > 0 ? (
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      <img width="100%" src={playlist.images[0].url} alt="" />
                    </Avatar>
                  </ListItemAvatar>
                ) : (
                  <ListItemAvatar>
                    <Avatar>{playlist?.name[0]}</Avatar>
                  </ListItemAvatar>
                )}
                <ListItemText primary={playlist.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton autoFocus onClick={() => handleCreatePlaylist()}>
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
    </>
  );
}

interface CheckedTracksActionsProps {
  handleDelete?: () => void;
  handleAddToPlaylist: (playlist: Playlist) => void;
  isPlaylistEditable?: boolean;
}

export default function CheckedTracksActions({ handleDelete, handleAddToPlaylist, isPlaylistEditable }: CheckedTracksActionsProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const {dispatch, state} = useContext(StoreContext);
  const {checkedTracks} = state;

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const content = (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '10px',
        background: myColors.background,
        height: 80,
        width: '100%',
      }}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={4} md={4}>
          <Tooltip title="cancel" placement="top">
            <IconButton onClick={() => dispatch({
        type:reducerActionTypes.SET_CHECKED_TRACKS,
        payload: []
      })}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item justifyContent="center" alignContent="center" xs={6} md={6}>
          <Typography variant="h6">{checkedTracks.length} selected</Typography>
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
      <SimpleDialog checkedTracks={checkedTracks} selectedValue="" handleAddToPlaylist={handleAddToPlaylist} open={openDialog} onClose={handleClose} />
    </Stack>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      key={'bottom'}
      sx={{
        width: '350px',
        marginBottom: '56px',
        marginLeft: '120px',
        backgroundColor: 'lightgrey',
        display: openDialog ? 'none' : 'flex',
      }}>
      {content}
    </Snackbar>
  );
}
