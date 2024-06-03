import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FeaturedPost from "./FeaturedPost";

export default function Blog({ artists }) {
  return (
    <Container>
      <Grid container spacing={4}>
        {artists.map((artist) => (
          <FeaturedPost key={artist.title} artist={artist} />
        ))}
      </Grid>
    </Container>
  );
}
