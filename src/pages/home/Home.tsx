import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "./Header";
import IntroSection from "./IntroSection";
import Playlists from "./Playlists";
import Sidebar from "./Sidebar";


const Home: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#666",
        color: "#fff",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Header />
      <IntroSection />
      <Grid container spacing={2}>
        <Playlists />
        <Sidebar />
      </Grid>
    </Box>
  );
};

export default Home;
