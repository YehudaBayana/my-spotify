import * as React from 'react';
import Box from '@mui/joy/Box';
import { Button, Checkbox, Grid, IconButton, Paper, Snackbar, Stack, Tooltip, Typography, styled } from '@mui/material';
// import Snackbar from '@mui/joy/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import { useContext } from 'react';
import { StoreContext } from '../../context/ContextProvider';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog({ onClose, selectedValue, open, handleAddToPlaylist }) {
  const { state } = useContext(StoreContext);
  const userOwnedPlaylists = state.userPlaylists.filter((playlist) => playlist.owner.id === state.userName.id);
  // const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (playlist) => {
    handleAddToPlaylist(playlist);
    // onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Choose playlist</DialogTitle>
      <List sx={{ pt: 0 }}>
        {userOwnedPlaylists.map((playlist) => (
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
          <ListItemButton autoFocus onClick={() => handleListItemClick('addAccount')}>
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

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

export default function CheckedTracksActions({ selected, handleDelete, handleAddToPlaylist, setCheckedTracks, isPlaylistEditable }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    setOpenDialog(false);
  };

  const content = (
    <Stack
      sx={{ alignItems: 'center', justifyContent: 'space-around', padding: '10px', background: 'lightblue', height: 80, width: '100%' }}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}>
      <Grid container spacing={2}>
        <Grid xs={4} md={4}>
          <Tooltip title="cancel" placement="top">
            <IconButton onClick={() => setCheckedTracks([])}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid justifyContent="center" alignContent="center" xs={5} md={5}>
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
      <SimpleDialog
        handleAddToPlaylist={handleAddToPlaylist}
        // selectedValue={selectedValue}
        open={openDialog}
        onClose={handleClose}
      />
    </Stack>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={true}
      key={'bottom'}
      // message={content}
      sx={{ width: '350px', marginBottom: '50px', backgroundColor: 'lightgrey', display: openDialog ? 'none' : 'flex' }}>
      {content}
    </Snackbar>
  );
}
