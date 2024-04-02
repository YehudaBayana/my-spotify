import React, { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { StoreContext } from "../../context/ContextProvider";
import PlaylistHeader from "../playlistHeader/PlaylistHeader";

export default function SongList({ chooseTrack }) {
  function handlePlay(track) {
    chooseTrack(track);
  }
  const { getOne, state } = useContext(StoreContext);
  const playListId = window.location.pathname
    .split("/")
    .filter((item) => item)[1];
  useEffect(() => {
    getOne(playListId);
  }, []);
  // console.log("state ",state);

  return (
    <Paper sx={{ marginBottom: 8 , width:"100%"}}>
      <PlaylistHeader details={state.detail} />
      <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
        <Table
          // style={{ tableLayout: "fixed" }}
          sx={{ minWidth: 450 }}
          aria-label="caption table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightGrey" }}>
              <TableCell width="10%" align="left">
               image
              </TableCell>
              <TableCell width="30%" align="left">
                Title
              </TableCell>
              <TableCell width="30%" align="left">
                Album
              </TableCell>
              <TableCell width="15%" align="left">
                Date added
              </TableCell>
              <TableCell width="15%" align="left">
                time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.playList.items?.map((track) => (
              <>
                <TableRow onClick={() => handlePlay(track)} key={track.id}>
                  <TableCell align="left" component="th" scope="row">
                    <img
                      src={track?.album?.images[2].url}
                      loading="lazy"
                      alt="mashu"
                      width={60}
                      height={50}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 0,
                      //padding: "8px", // Adjust padding as per your requirement
                    }}
                    align="left"
                    scope="row"
                  >
                    {track.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 0,
                      //padding: "8px", // Adjust padding as per your requirement
                    }}
                    align="left"
                  >
                    {track?.album.name}
                  </TableCell>
                  <TableCell align="left">
                    {track?.album.release_date}
                  </TableCell>
                  <TableCell align="left">
                    {msToMinutesAndSeconds(track && track?.duration_ms)}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

function msToMinutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
