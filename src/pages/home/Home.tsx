import React from "react";
import { Box, Grid } from "@mui/material";
import Header from "./Header";
import IntroSection from "./IntroSection";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
// import Header from "./Header";
// import IntroSection from "./IntroSection";
// import MainContent from "./MainContent";
// import Sidebar from "./Sidebar";

const Home: React.FC = () => {
  const songs = [
    {
      alt: "Song 1",
      src: "https://via.placeholder.com/150",
      title: "Song Title 1",
      artistName: "Artist 1",
    },
    {
      alt: "Song 2",
      src: "https://via.placeholder.com/150",
      title: "Song Title 2",
      artistName: "Artist 2",
    },
    {
      alt: "Song 3",
      src: "https://via.placeholder.com/150",
      title: "Song Title 3",
      artistName: "Artist 3",
    },
  ];

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
        <MainContent />
        <Sidebar songs={songs} />
      </Grid>
    </Box>
  );
};

export default Home;
