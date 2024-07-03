import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import { useEffect } from "react";
import { formatNumberShortcut } from "../../utils";

function FeaturedPost(props) {
  const { artist } = props;
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWith(window.innerWidth);
    });
    return () => {}
  }, [windowWith]);
  // windowWith < 700 ? 6 : 12
  return (
    <Grid item xs={12} md={windowWith < 1350 ? 12 : 6}>
      <CardActionArea component="a" href="#">
        <Card
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <CardContent sx={{ order: { xs: 1, sm: 2 }, flex: 2 }}>
            <Typography component="h2" variant="h5">
              {artist.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {formatNumberShortcut(artist.followers.total)} followers
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {artist.genres.join(", ")}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Go to artist's page
            </Typography>
          </CardContent>
          <CardContent sx={{ order: { xs: 2, sm: 1 }, flex: 1 }}>
            <CardMedia
              component="img"
              width={"100%"}
              sx={{ minWidth: "100px", display: { xs: "none", sm: "block" } }}
              image={artist.images[0].url}
              alt={artist.imageLabel}
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
