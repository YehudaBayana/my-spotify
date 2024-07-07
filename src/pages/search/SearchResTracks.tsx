import React from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { msToMinutesAndSeconds } from "../../utils";
import AddIcon from "@mui/icons-material/Add";

interface Track {
  id: string;
  name: string;
  album: {
    name: string;
    images: { url: string }[];
    release_date: string;
  };
  duration_ms: number;
  uri: string;
}

interface SearchResTracksProps {
  handlePlay: (track: Track) => void;
  selectedRes: Track[];
  addToPlaylist: boolean;
  handleAddTrack: (track: Track) => Promise<{ status: number }>;
  setSelectedRes: React.Dispatch<React.SetStateAction<Track[]>>;
  playlistTracks: Track[];
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

const SearchResTracks: React.FC<SearchResTracksProps> = ({ handlePlay, selectedRes, addToPlaylist, handleAddTrack, setSelectedRes, playlistTracks, setTracks }) => {
  console.log("playlistTracks ", playlistTracks);

  return (
    <TableContainer square elevation={0} sx={{ borderRadius: 0 }} component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="caption table">
        <TableBody>
          {Array.isArray(selectedRes) &&
            selectedRes
              ?.filter((obj1) => !playlistTracks?.some((obj2) => obj2.id === obj1.id))
              .map((track) => (
                <TableRow
                  onClick={() => {
                    handlePlay(track);
                  }}
                  key={track.id}
                >
                  <TableCell width="10%" align="left" component="th" scope="row">
                    <img src={track.album.images[2].url} loading="lazy" alt="mashu" width={60} height={50} />
                  </TableCell>
                  <TableCell
                    width="30%"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 0,
                    }}
                    align="left"
                    scope="row"
                  >
                    {track.name}
                  </TableCell>
                  <TableCell
                    width="30%"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 0,
                    }}
                    align="left"
                  >
                    {track.album.name}
                  </TableCell>
                  {addToPlaylist ? (
                    <TableCell width="15%" align="left">
                      <Button
                        onClick={async (e) => {
                          e.stopPropagation();
                          let mashu = await handleAddTrack(track);
                          console.log("mashu ", mashu);
                          if (mashu.status === 200 || mashu.status === 201) {
                            setSelectedRes((old) => old.filter((item) => item.uri !== track.uri));
                            setTracks((old) => [track, ...old]);
                          }
                        }}
                        variant="contained"
                        endIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </TableCell>
                  ) : (
                    <>
                      <TableCell width="15%" align="left">
                        {track.album.release_date}
                      </TableCell>
                      <TableCell width="15%" align="left">
                        {msToMinutesAndSeconds(track.duration_ms)}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResTracks;
