import React, { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { AppBar, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Playlist } from '../../../types';
import { StoreContext } from '../../../context/ContextProvider';
import { updatePlaylistDetails } from '../../../customHooks/useFetchMusicInfo';
import { reducerActionTypes } from '../../../constants';
// import { updatePlaylistDetails } from 'src/customHooks/useFetchMusicInfo';
// import { StoreContext } from 'src/context/ContextProvider';
// import { reducerActionTypes } from 'src/constants';
// import { Playlist } from 'src/types';

const Header = styled(AppBar)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '200px',
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  color: '#fff',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  height:"100%",
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: theme.shape.borderRadius,
}));

// interface Playlist {
//   id: string;
//   name: string;
//   description: string;
//   owner: { id: string };
//   images: { url: string }[];
//   tracks: { total: number };
//   snapshot_id: string;
//   public: boolean;
// }

interface PlaylistHeaderProps {
  playlist: Playlist;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaylistEditable: boolean;
  rgb: string;
  setPlaylist: React.Dispatch<React.SetStateAction<Playlist>>; // New function prop to update playlist
  total: number
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({total, playlist, edit, setEdit, isPlaylistEditable, rgb, setPlaylist }) => {
  const [name, setName] = useState<string>(playlist?.name || '');
  const [description, setDescription] = useState<string>(playlist?.description || '');
  const [isPublic, setIsPublic] = useState<boolean>(playlist?.public);
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    setName(playlist?.name || '');
    setDescription(playlist?.description || '');
  }, [playlist]);

  const toggleEdit = async (operation: string) => {
    if (operation === 'Save') {
      if (name) {
        const body = {
          name,
          description,
          public: isPublic,
        };
        const updated = await updatePlaylistDetails(state.accessToken, playlist.id, body);
        console.log("updated ",updated);
        
        if (updated) {
          setPlaylist((old) => {
            dispatch({
              type: reducerActionTypes.SET_USER_PLAYLISTS,
              payload: state.userPlaylists.map(usersPlaylist=>{
                if (usersPlaylist.id === playlist.id) {
                  return {...usersPlaylist, name, description, public: isPublic}
                }
              })
            })
            return ({
            ...old,
            name,
            description: description || '', // Ensure description is a string
          })});
          setEdit(false);
          dispatch({
            type:reducerActionTypes.SET_CHECKED_TRACKS,
            payload: []
          })
        }
      }
    } else {
      setEdit(true);
    }
  };

  return (
    <Header
      sx={{
        color: 'white',
        backgroundImage: `url("${playlist?.images?.length > 0 ? playlist?.images[0]?.url : 'https://via.placeholder.com/150'}")`,
      }}
      position="static">
      <ContentBox>
        <Avatar variant="square" src={playlist?.images?.length > 0 ? playlist?.images[0]?.url : ''} sx={{ width: 150, height: 150, marginRight: 2 }} />
        <Box>
          {edit ? (
            <>
              <TextField
                fullWidth
                focused
                color="secondary"
                InputProps={{
                  style: {
                    color: 'white',
                  },
                }}
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name-input"
                placeholder="name"
              />
              <TextField
                fullWidth
                focused
                color="secondary"
                InputProps={{
                  style: {
                    color: 'white',
                  },
                }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                id="description-input"
                placeholder="description"
              />
              {/* <Checkbox checked={isPublic} onChange={()=>setIsPublic(old=>!old)} /> */}
              <FormControlLabel sx={{padding:"0 10px",background:"white", color:"black", marginLeft:"0px"}} control={<Checkbox checked={isPublic} onChange={() => setIsPublic((old) => !old)} />} label="Public" />
            </>
          ) : (
            <>
              <Typography variant="h3" component="h1" gutterBottom>
                {name}
              </Typography>
              <Typography variant="subtitle1">{description}</Typography>
            </>
          )}
          {total > 0 && !edit ? <Typography variant="h6">{total} songs</Typography>: null}
        </Box>
        {isPlaylistEditable && (
          <Grid alignSelf={'end'} item xs={2} sm container>
            <Grid item xs container display={'block'} alignSelf={'flex-end'} direction="column" spacing={2}>
              <Button
                onClick={() => toggleEdit(edit ? 'Save' : 'Edit playlist details')}
                sx={{ float: 'right', width: 'auto', maxWidth: '300px', textTransform: 'none' }}
                variant="contained"
                color="primary">
                {edit ? 'Save' : 'Edit playlist details'}
              </Button>
              {edit && <Button
                onClick={() => setEdit(false)} 
                sx={{ float: 'right', width: 'auto', maxWidth: '300px', textTransform: 'none' }}
                variant="contained"
                color="warning">
                Cancel
              </Button>}
            </Grid>
          </Grid>
        )}
      </ContentBox>
    </Header>
  );
};

export default PlaylistHeader;
