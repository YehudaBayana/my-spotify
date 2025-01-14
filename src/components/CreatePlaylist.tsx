import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { addPlaylist, addTracksToPlaylist } from 'src/customHooks/useFetchMusicInfo';
import { Checkbox, FormControlLabel } from "@mui/material";
import { StoreContext } from "../context/ContextProvider";

// import { StoreContext } from 'src/context/ContextProvider';
// import { reducerActionTypes } from 'src/constants';

interface CreatePlaylistProps {
  checkedTracks?: { uri: string }[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ open, setOpen, checkedTracks }) => {
  const { state, dispatch } = React.useContext(StoreContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(false);

  const handleClose = () => {
    setName("");
    setDescription("");
    setIsPublic(false);
    setOpen(false);
  };

  const submit = async () => {
    console.log("name ", name);
    console.log("description ", description);
    console.log("isPublic ", isPublic);
    if (name) {
      const body = {
        name,
        description,
        public: isPublic,
      };
      // const data = await addPlaylist(state.userName.id, body);
      // const { data, post } = usePostRequest(SpotifyApiUrlsPost.ADD_PLAYLIST, { user_id: state.userName.id }, body);
      // await post();
      // const addResJson = await data.json();
      // if (data.status === 200 || data.status === 201) {
      //   console.log("add success ", addResJson);
      //   dispatch({
      //     type: reducerActionTypes.SET_USER_PLAYLISTS,
      //     payload: [addResJson, ...state.userPlaylists],
      //   });
      //   if (checkedTracks) {
      //     // const data = await addTracksToPlaylist(addResJson.id, { uris: checkedTracks.map((checked) => checked.uri) });
      //     const { data, post } = usePostRequest(SpotifyApiUrlsPost.ADD_TRACKS_TO_PLAYLIST, { playlist_id: addResJson.id }, { uris: checkedTracks.map((checked) => checked.uri) });
      //     await post();
      //     if (data.status === 200 || data.status === 201) {
      //       console.log("addToPlaylistRes ", data);
      //       handleClose();
      //     }
      //   } else {
      //     handleClose();
      //   }
      // }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>New Playlist</DialogTitle>
        <DialogContent>
          <TextField value={name} onChange={(e) => setName(e.target.value)} autoFocus required margin="dense" name="name" label="Playlist name" type="text" fullWidth />
          <TextField value={description} onChange={(e) => setDescription(e.target.value)} rows={3} multiline margin="dense" name="description" label="Playlist description" type="text" fullWidth />
          <FormControlLabel control={<Checkbox checked={isPublic} onChange={() => setIsPublic((old) => !old)} />} label="Public" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submit}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreatePlaylist;
