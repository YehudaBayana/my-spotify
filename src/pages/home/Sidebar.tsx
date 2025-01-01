import React from "react";
import { Grid } from "@mui/material";
import SuggestedSongs from "../../components/suggestedSongs/SuggestedSongs";

interface SidebarProps {
  songs: {
    alt: string;
    src: string;
    title: string;
    artistName: string;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ songs }) => {
  return (
    <Grid item xs={12} md={4}>
      <SuggestedSongs title="The Most Played Songs" songs={songs} />
      <SuggestedSongs title="Top Picks for You" songs={songs} />
      <SuggestedSongs title="Recently Added" songs={songs} />
    </Grid>
  );
};

export default Sidebar;
