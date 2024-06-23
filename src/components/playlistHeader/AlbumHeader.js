import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { isIncludeHtml } from '../../utils';
import { Button } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const AlbumHeader = ({ album }) => {
    return (
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            borderRadius: 0,
            // maxWidth: 500,
            // backgroundColor:"lightblue",
            flexGrow: 1,
            backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : 'lightblue'),
          }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <ButtonBase id="playlistImage" sx={{ width: '100%' }}>
                {album ? <Img alt="complex" src={album?.images[0]?.url} /> : null}
              </ButtonBase>
            </Grid>
            <Grid item xs={8} sm container>
              <Grid item xs container alignSelf={'flex-end'} direction="column" spacing={2}>
                {/* <Grid item xs></Grid> */}
                <Grid item>
                  <Typography gutterBottom variant="h4" component="div">
                    {album?.name}
                  </Typography>
                  {isIncludeHtml(album?.description) ? null : (
                    <Typography variant="h5" gutterBottom>
                      {album?.release_date}
                    </Typography>
                  )}
                  {album?.tracks?.total && (
                    <Typography variant="h6" color="text.secondary">
                      {album?.total_tracks} songs
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} sm container>
              <Grid item xs container display={"block"} alignSelf={'flex-end'} direction="column" spacing={2}>
                <Button sx={{float:"right",width:"auto", maxWidth:"100px"}} variant='contained' color='success'>edit</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      );
}

export default AlbumHeader