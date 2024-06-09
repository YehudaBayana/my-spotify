import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const PlaylistHeader = ({ details }) => {
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
          <ButtonBase id="playlistImage" sx={{ width: '100%' }}>{details ? <Img alt="complex" src={details?.images[0]?.url} /> : null}
          </ButtonBase>
        </Grid>
        <Grid item xs={8} sm container>
          <Grid item xs container alignSelf={'flex-end'} direction="column" spacing={2}>
            {/* <Grid item xs></Grid> */}
            <Grid item>
              <Typography gutterBottom variant="h4" component="div">
                {details?.name}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {details?.description}
              </Typography>
              {details?.tracks?.total && (
                <Typography variant="h6" color="text.secondary">
                  {details?.tracks?.total} songs
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlaylistHeader;
