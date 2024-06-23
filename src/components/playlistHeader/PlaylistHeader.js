import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { isIncludeHtml } from '../../utils';
import { Button, TextField } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const PlaylistHeader = ({ playlist, edit, setEdit }) => {
  const [name, setName] = useState(playlist?.name);
  console.log('playlist?.name ', playlist?.name);
  useEffect(() => {
    if (playlist?.name) {
      setName(playlist?.name);
    }
  }, [edit]);
  const toggleEdit = () => {
    setEdit((old) => !old);
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        borderRadius: 0,
        // maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <ButtonBase id="playlistImage" sx={{ width: '100%' }}>
            {playlist ? <Img alt="complex" src={playlist?.images[0]?.url} /> : null}
          </ButtonBase>
        </Grid>
        <Grid item xs={8} sm container>
          <Grid item xs container alignSelf={'flex-end'} direction="column" spacing={2}>
            {/* <Grid item xs></Grid> */}
            <Grid item>
              {!edit ? (
                <Typography gutterBottom variant="h4" component="div">
                  {playlist?.name}
                  {/* {name} */}
                </Typography>
              ) : (
                <TextField onChange={(e) => setName(e.target.value)} value={name} id="filled-basic" label="Filled" variant="filled" />
              )}
              {isIncludeHtml(playlist?.description) ? null : (
                <Typography variant="h5" gutterBottom>
                  {playlist?.description}
                </Typography>
              )}
              {playlist?.tracks?.total && (
                <Typography variant="h6" color="text.secondary">
                  {playlist?.tracks?.total} songs
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sm container>
          <Grid item xs container display={'block'} alignSelf={'flex-end'} direction="column" spacing={2}>
            <Button onClick={toggleEdit} sx={{ float: 'right', width: 'auto', maxWidth: '100px' }} variant="contained" color="success">
              edit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlaylistHeader;
