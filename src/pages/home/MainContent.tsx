import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";

const MainContent: React.FC = () => {
  return (
    <Grid item xs={12} md={8}>
      <Card sx={{ borderRadius: "8px", position: "relative" }}>
        <CardMedia
          component="img"
          height="400"
          image="https://via.placeholder.com/600x400"
          alt="Queen II Album Cover"
        />
      </Card>

      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {[1, 1, 1].map((_, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ borderRadius: "8px" }}>
              <CardMedia
                component="img"
                height="120"
                image="https://via.placeholder.com/150"
                alt={`Secondary Image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default MainContent;
