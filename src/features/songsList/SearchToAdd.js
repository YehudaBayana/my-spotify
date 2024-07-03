import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SearchPage from '../../pages/search/SearchPage';
import { StoreContext } from '../../context/ContextProvider';

const style = {
  position: 'absolute',
//   top: '45%',
  left: '45%',
  transform: 'translate(-45%, 0%)',
  width: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function SearchToAdd({handleAddTrack, playlistTracks, setTracks}) {
  const [open, setOpen] = React.useState(false);
  const { state } = React.useContext(StoreContext);
  const { accessToken } = state;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Add tracks to playlist</Button>
      <Modal sx={{ overflow: 'auto' }} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{width:"100%"}}>
            <SearchPage setTracks={setTracks} playlistTracks={playlistTracks} handleAddTrack={handleAddTrack} addToPlaylist={true} accessToken={accessToken} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
