import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { isIncludeHtml } from "../../utils";
import { Box, Button, TextField } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

interface Playlist {
  id: string;
  name: string;
  description: string;
  owner: { id: string };
  images: { url: string }[];
  tracks: { total: number };
  snapshot_id: string;
}

interface PlaylistHeaderProps {
  playlist: Playlist;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckedTracks: React.Dispatch<React.SetStateAction<any[]>>;
  isPlaylistEditable: boolean;
  rgb: string;
}

const PlaylistHeader: React.FC<PlaylistHeaderProps> = ({ playlist, edit, setEdit, setCheckedTracks, isPlaylistEditable, rgb }) => {
  const [name, setName] = useState<string | undefined>(playlist?.name);
  const [description, setDescription] = useState<string | undefined>(playlist?.description);

  useEffect(() => {
    if (playlist?.name) {
      setName(playlist?.name);
    }
    return () => {};
  }, [edit, playlist?.name]);

  const toggleEdit = (operation: string) => {
    if (operation === "Save") {
      // updatePlaylistDetails(accessToken, playlist_id, body);
    }
    setEdit((old) => !old);
    setCheckedTracks([]);
  };

  return (
    <Paper
      square
      elevation={0}
      sx={{
        p: 2,
        margin: "auto",
        borderRadius: 0,
        flexGrow: 1,
        background: rgb ? `linear-gradient(to bottom, ${rgb}, 1) 0%, ${rgb}, 0.5) 100%)` : "lightgrey",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <ButtonBase id="playlistImage" sx={{ width: "100%" }}>
            {playlist?.images?.length > 0 ? (
              <Img alt="complex" src={playlist?.images[0]?.url} />
            ) : (
              <Box height={200} width={200} display="flex" alignItems="center" justifyContent="center" sx={{ background: "grey" }}>
                This Box uses MUI System props for quick customization.
              </Box>
            )}
          </ButtonBase>
        </Grid>
        <Grid item xs={8} sm container>
          <Grid item xs container alignSelf={"flex-end"} direction="column" spacing={2}>
            <Grid item>
              {!edit ? (
                <Typography gutterBottom variant="h4" component="div">
                  {playlist?.name}
                </Typography>
              ) : (
                <TextField onChange={(e) => setName(e.target.value)} value={name} id="name-input" label="Title" variant="filled" />
              )}
              {!isIncludeHtml(playlist.description) ? null : edit ? (
                <Typography variant="h5" gutterBottom>
                  {playlist?.description}
                </Typography>
              ) : (
                playlist?.description && <TextField onChange={(e) => setDescription(e.target.value)} value={description} id="description-input" label="Description" variant="filled" />
              )}
              {playlist?.tracks?.total && (
                <Typography variant="h6" color="text.secondary">
                  {playlist?.tracks?.total} songs
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        {isPlaylistEditable && (
          <Grid item xs={2} sm container>
            <Grid item xs container display={"block"} alignSelf={"flex-end"} direction="column" spacing={2}>
              <Button
                onClick={() => toggleEdit(edit ? "Save" : "Edit playlist details")}
                sx={{ float: "right", width: "auto", maxWidth: "300px", textTransform: "none" }}
                variant="contained"
                color="success"
              >
                {edit ? "Save" : "Edit playlist details"}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default PlaylistHeader;
