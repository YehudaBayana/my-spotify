import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addPlaylist, addTracksToPlaylist } from 'src/customHooks/useFetchMusicInfo';
import { Checkbox, FormControlLabel } from '@mui/material';
import { StoreContext } from 'src/context/ContextProvider';
import { reducerActionTypes } from 'src/constants';

interface CreatePlaylistProps {
  checkedTracks: { uri: string }[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreatePlaylist: React.FC<CreatePlaylistProps> = ({ open, setOpen, checkedTracks }) => {
  const { state, dispatch } = React.useContext(StoreContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isPublic, setIsPublic] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    console.log('name ', name);
    console.log('description ', description);
    console.log('isPublic ', isPublic);
    if (name) {
      const body = {
        name,
        description,
        public: isPublic,
      };
      const addRes = await addPlaylist(state.accessToken, state.userName.id, body);
      const addResJson = await addRes.json();
      if (addRes.status === 200 || addRes.status === 201) {
        console.log('add success ', addResJson);
        dispatch({
            type: reducerActionTypes.SET_USER_PLAYLISTS,
            payload: [addResJson, ...state.userPlaylists]
        })
        const addToPlaylistRes = await addTracksToPlaylist(state.accessToken, addResJson.id, { uris: checkedTracks.map((checked) => checked.uri) });
        if (addToPlaylistRes.status === 200 || addToPlaylistRes.status === 201) {
          console.log('addToPlaylistRes ', addToPlaylistRes);
          handleClose();
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}>
        <DialogTitle>New Playlist</DialogTitle>
        <DialogContent>
          <TextField value={name} onChange={(e) => setName(e.target.value)} autoFocus required margin="dense" name="name" label="Playlist name" type="text" fullWidth />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            multiline
            margin="dense"
            name="description"
            label="Playlist description"
            type="text"
            fullWidth
          />
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
