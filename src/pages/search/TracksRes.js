import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { msToMinutesAndSeconds } from "../../utils";

const SearchResTracks = ({ handlePlay, selectedRes }) => {
  return (
    <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
      <Table
        // style={{ tableLayout: "fixed" }}
        sx={{ minWidth: 450 }}
        aria-label="caption table"
      >
        <TableBody>
          {typeof selectedRes === "object" &&
            selectedRes.map((track) => (
              <>
                <TableRow onClick={() => handlePlay(track)} key={track?.id}>
                  <TableCell width="10%" align="left" component="th" scope="row">
                    <img
                      src={track?.album?.images[2].url}
                      loading="lazy"
                      alt="mashu"
                      width={60}
                      height={50}
                    />
                  </TableCell>
                  <TableCell
                  width="30%"
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
                    {track?.name}
                  </TableCell>
                  <TableCell
                  width="30%"
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
                  <TableCell width="15%" align="left">
                    {track?.album.release_date}
                  </TableCell>
                  <TableCell width="15%" align="left">
                    {msToMinutesAndSeconds(track && track?.duration_ms)}
                  </TableCell>
                </TableRow>
              </>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResTracks;
