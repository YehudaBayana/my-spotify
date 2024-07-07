import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FeaturedPost from "./FeaturedPost";

interface Artist {
  name: string;
  followers: {
    total: number;
  };
  genres: string[];
  images: {
    url: string;
  }[];
  imageLabel: string;
}

interface BlogProps {
  artists: Artist[];
}

const Blog: React.FC<BlogProps> = ({ artists }) => {
  return (
    <Container>
      <Grid container spacing={4}>
        {artists.map((artist) => (
          <FeaturedPost key={artist.name} artist={artist} />
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;
