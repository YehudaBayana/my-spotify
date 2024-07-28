import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
// import { isIncludeHtml } from "../../utils";
// import { Album } from 'src/types';
import { AppBar, Avatar, Box } from '@mui/material';
import { Album } from '../../../types';

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Header = styled(AppBar)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '200px',
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  color: '#fff',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  height:"100%",
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: theme.shape.borderRadius,
}));


const AlbumHeader = ({ album }: { album: Album }) => {
  return (
    <Header
      sx={{
        color: 'white',
        backgroundImage: `url("${album?.images?.length > 0 ? album?.images[0]?.url : 'https://via.placeholder.com/150'}")`,
      }}
      position="static">
      <ContentBox>
        <Avatar variant="square" src={album?.images?.length > 0 ? album?.images[0]?.url : ''} sx={{ width: 150, height: 150, marginRight: 2 }} />
        <Box>
            <>
              <Typography variant="h3" component="h1" gutterBottom>
                {album.name}
              </Typography>
            </>
          {album.total_tracks > 0 ? <Typography variant="h6">{album.total_tracks} songs</Typography>: null}
        </Box>
      </ContentBox>
    </Header>
    // <Paper
    //   elevation={0}
    //   square
    //   sx={{
    //     p: 2,
    //     margin: "auto",
    //     borderRadius: 0,
    //     // maxWidth: 500,
    //     // backgroundColor:"lightblue",
    //     flexGrow: 1,
    //     backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : theme.palette.primary.main),
    //   }}
    // >
    //   <Grid container spacing={2}>
    //     <Grid item xs={3}>
    //       <ButtonBase id="playlistImage" sx={{ width: "100%" }}>
    //         {album ? <Img alt="complex" src={album?.images[0]?.url} /> : null}
    //       </ButtonBase>
    //     </Grid>
    //     <Grid item xs={8} sm container>
    //       <Grid item xs container alignSelf={"flex-end"} direction="column" spacing={2}>
    //         {/* <Grid item xs></Grid> */}
    //         <Grid item>
    //           <Typography gutterBottom variant="h4" component="div">
    //             {album?.name}
    //           </Typography>
    //           {isIncludeHtml(album.description) ? null : (
    //             <Typography variant="h5" gutterBottom>
    //               {album?.release_date}
    //             </Typography>
    //           )}
    //           {album?.tracks?.total && (
    //             <Typography variant="h6" color="text.secondary">
    //               {album?.total_tracks} songs
    //             </Typography>
    //           )}
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Paper>
  );
};

export default AlbumHeader;
