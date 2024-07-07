import React from "react";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

interface PlaylistDetails {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
}

interface CardProps {
  playlistDetails: PlaylistDetails;
}

const Card: React.FC<CardProps> = ({ playlistDetails }) => {
  return (
    <MuiCard sx={{ maxWidth: 345, margin: "0px 10px", boxShadow: "none", background: "inherit" }}>
      <CardActionArea>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/playlist/${playlistDetails.id}`} key={playlistDetails.id}>
          <CardMedia component="img" height="100%" image={playlistDetails.images[0]?.url} alt={playlistDetails.name} />
          <CardContent sx={{ padding: "10px 0" }}>
            <Typography noWrap gutterBottom variant="subtitle1" component="div">
              {playlistDetails.name}
            </Typography>
            <Typography noWrap variant="body2" color="text.secondary">
              {playlistDetails.description}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </MuiCard>
  );
};

export default Card;
