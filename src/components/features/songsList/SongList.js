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

  return (
    <Container sx={{ marginBottom: 8 }}>
      <PlaylistHeader />
      <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
        <Table
          // style={{ tableLayout: "fixed" }}
          sx={{ minWidth: 450 }}
          aria-label="caption table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "lightGrey" }}>
              <TableCell width="10%" align="left">
                #
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
                      src={`https://plus.unsplash.com/premium_photo-1710548651496-59502bba8e80?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8`}
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
    </Container>
  );
}

function msToMinutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
