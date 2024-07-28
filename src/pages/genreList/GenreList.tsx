import { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import {Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles, Box } from '@mui/material';
import { styled } from '@mui/system';
import { StoreContext } from '../../context/ContextProvider';
import { Playlist } from '../../types';
// import { StoreContext } from 'src/context/ContextProvider';
// import { Playlist } from 'src/types';

const StyledCardMedia = styled(CardMedia)({
  // width: 200,
  height: 204,
  position: 'relative',
  '&:hover .overlay': {
    opacity: 1,
  },
  // objectFit: 'cover',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%',
  width: '100%',
  opacity: 0,
  transition: '.5s ease',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const OverlayText = styled(Typography)({
  color: 'white',
  fontSize: '20px',
});

const GenreList = () => {
    let location = useLocation();
    const { state } = useContext(StoreContext);
    const [type, id] = location.pathname.split("/").filter((item) => item);
    const items: Playlist[] = state.genres.find((genre)=> genre.id === id)?.items || [];
    return (
      <Grid padding={5} container spacing={2}>
        {items.map((playlist, index) => (//xs={12} sm={6} md={3}
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link to={"/playlist/"+playlist.id} style={{ textDecoration: 'none' }}>
              <Card>
                <CardActionArea>
                  <StyledCardMedia image={playlist.images[0].url} title={playlist.name}>
                    <Overlay className="overlay">
                      <OverlayText>{playlist.name}</OverlayText>
                    </Overlay>
                  </StyledCardMedia>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    );
}

export default GenreList