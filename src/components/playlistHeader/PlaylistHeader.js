import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { isIncludeHtml } from '../../utils';
import { Box, Button, TextField } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const PlaylistHeader = ({ playlist, edit, setEdit, setCheckedTracks, isPlaylistEditable, rgb }) => {
  const [name, setName] = useState(playlist?.name);
  
  // console.log('playlist?.name ', playlist?.name);
  useEffect(() => {
    if (playlist?.name) {
      setName(playlist?.name);
    }
    return () => {}
  }, [edit]);

  // useEffect(() => {
  //   if (playlist?.images[0]?.url) {
  //     fetch('https://www.wix.com/benko0/dominant-color/_functions/imagecolor?url=' + playlist?.images[0]?.url, {
  //       method: 'GET',
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((res) => {
  //         console.log('res ', res);
  //         const [r,g,b] = res.color
  //         setRgb(`rgba(${r},${g},${b}`)
  //       })
  //       .catch((err) => {
  //         console.log('err ', err);
  //       });
  //   }
  // }, [playlist]);

  const toggleEdit = () => {
    setEdit((old) => !old);
    setCheckedTracks([]);
  };
  // console.log("color ",rgb ? `linear-gradient(to top, ${rgb}, 1) 0%, ${rgb}, 0) 100%)` : 'lightgrey');

  return (
    <Paper
    square
      elevation={0}
      sx={{
        p: 2,
        margin: 'auto',
        borderRadius: 0,
        // border:"1px solid red",
        // maxWidth: 500,
        flexGrow: 1,
        background: rgb ? `linear-gradient(to bottom, ${rgb}, 1) 0%, ${rgb}, 0.5) 100%)` : 'lightgrey',
      }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ButtonBase id="playlistImage" sx={{ width: '100%' }}>
            {playlist?.images?.length > 0 ? (
              <Img alt="complex" src={playlist?.images[0]?.url} />
            ) : (
              <Box
                height={200}
                width={200}
                // my={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                // gap={4}
                // p={2}
                sx={{ background: 'grey' }}>
                This Box uses MUI System props for quick customization.
              </Box>
            )}
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

        {isPlaylistEditable && (
          <Grid item xs={2} sm container>
            <Grid item xs container display={'block'} alignSelf={'flex-end'} direction="column" spacing={2}>
              <Button onClick={toggleEdit} sx={{ float: 'right', width: 'auto', maxWidth: '100px' }} variant="contained" color="success">
                edit
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PlaylistHeader;
