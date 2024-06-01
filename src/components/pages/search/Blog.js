import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import FeaturedPost from './FeaturedPost';

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'pop, asffkl, dsfsdfog',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
    'pop, asffkl, dsfsdfog',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

export default function Blog() {
  return (
      <Container >
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
      </Container>
  );
}