import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useState } from 'react';
import { useEffect } from 'react';

function FeaturedPost(props) {
  const { post } = props;
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);
  console.log("windowWith ",windowWith);
// windowWith < 700 ? 6 : 12
  return (
    <Grid item xs={12} md={windowWith < 1350 ? 12 : 6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', flexWrap:"wrap", justifyContent:"space-around" }}>
          <CardContent sx={{  order: { xs: 1, sm: 2 }, flex: 2 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardContent sx={{ order: { xs: 2, sm: 1 }, flex:1}}>
          <CardMedia
            component="img"
            width={"100%"}
            sx={{ minWidth:"100px", display: { xs: 'none', sm: 'block' } }}
            image={"https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"}
            alt={post.imageLabel}
            />
            </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;