import React, {useContext, useEffect} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { StoreContext } from "../../context/ContextProvider";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
];

export default function SongList({chooseTrack}) {
  function handlePlay(track) {
    chooseTrack(track);
  }
  const { getOne, state } = useContext(StoreContext);
  const playListId = window.location.pathname.split('/').filter(item=>item)[1];
  useEffect(() => {
    getOne(playListId);
  }, [])
  console.log("state ,", state);
  return (
    // <Container fixed>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="caption table">
          <TableHead>
            <TableRow sx={{backgroundColor:"lightGrey"}}>
              <TableCell>Title</TableCell>
              <TableCell align="left">Album</TableCell>
              <TableCell align="left">Date added</TableCell>
              <TableCell align="left">time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.playList.items?.map((track) => (
              <>
              <TableRow onClick={()=>handlePlay(track)} key={track.id}>
                <TableCell component="th" scope="row">
                  {track.name}
                </TableCell>
                <TableCell align="left">{track?.album.name}</TableCell>
                <TableCell align="left">{track?.album.release_date}</TableCell>
                <TableCell align="left">{msToMinutesAndSeconds(track && track?.duration_ms)}</TableCell>
              </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    // </Container>
  );
}

function msToMinutesAndSeconds(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
