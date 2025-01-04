import React from "react";
import { Grid } from "@mui/material";
import SuggestedSongs from "../../components/suggestedSongs/SuggestedSongs";
import { useGetUserTopTracks } from '../../api/spotifyApi';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';


const Sidebar: React.FC = () => {
  const { data, isError, isLoading, error } = useGetUserTopTracks({ limit: 5, time_range: "short_term" })

  if (isLoading) { return <Spinner /> }
  if (isError) { return <ErrorMessage message={error.message} /> }
  console.log("data ", data);

  const tracks: any = data?.items;

  return (
    <Grid item xs={12} md={3}>
      <SuggestedSongs title="The Most Played Songs" tracks={tracks} />
      {/* <SuggestedSongs title="Top Picks for You" tracks={songs} />
      <SuggestedSongs title="Recently Added" tracks={songs} /> */}
    </Grid>
  );
};

export default Sidebar;
