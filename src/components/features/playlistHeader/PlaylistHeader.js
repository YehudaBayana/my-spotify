import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const PlaylistHeader = () => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        borderRadius: 0,
        // maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ButtonBase sx={{ width: "100%" }}>
            <Img
              alt="complex"
              src="https://plus.unsplash.com/premium_photo-1710548651496-59502bba8e80?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={6} sm container>
          <Grid
            item
            xs
            container
            alignSelf={"flex-end"}
            direction="column"
            spacing={2}
          >
            {/* <Grid item xs></Grid> */}
            <Grid item>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlaylistHeader;
