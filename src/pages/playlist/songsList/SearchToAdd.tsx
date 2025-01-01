import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { StoreContext } from "../../../context/ContextProvider";
import SearchPage from "../../search/SearchPage";
// import { StoreContext } from 'src/context/ContextProvider';
// import SearchPage from 'src/pages/search/SearchPage';
// import SearchPage from "../../pages/search/SearchPage";
// import { StoreContext } from "../../context/ContextProvider";

const style = {
  position: "absolute",
  left: "45%",
  transform: "translate(-45%, 0%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface SearchToAddProps {
  handleAddTrack: (track: any) => void;
  playlistTracks: any[];
  setTracks: (tracks: any[]) => void;
}

const SearchToAdd: React.FC<SearchToAddProps> = ({ handleAddTrack, playlistTracks, setTracks }) => {
  const [open, setOpen] = useState(false);
  const { state } = useContext(StoreContext);
  const { accessToken } = state;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add tracks to playlist
      </Button>
      <Modal sx={{ overflow: "auto" }} open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div style={{ width: "100%" }}>
            <SearchPage setTracks={setTracks} playlistTracks={playlistTracks} handleAddTrack={handleAddTrack} addToPlaylist={true} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SearchToAdd;
