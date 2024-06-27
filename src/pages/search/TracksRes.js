import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { msToMinutesAndSeconds } from '../../utils';
import AddIcon from '@mui/icons-material/Add';

const SearchResTracks = ({ handlePlay, selectedRes, addToPlaylist, handleAddTrack, setSelectedRes, playlistTracks }) => {
  return (
    <TableContainer elevation={0} sx={{ borderRadius: 0 }} component={Paper}>
      <Table
        // style={{ tableLayout: "fixed" }}
        sx={{ minWidth: 450 }}
        aria-label="caption table">
        <TableBody>
          {typeof selectedRes === 'object' &&
            selectedRes
              .filter((obj1) => !playlistTracks.some((obj2) => obj2.id === obj1.id))
              .map((track) => (
                <>
                  <TableRow
                    onClick={(e) => {
                      handlePlay(track);
                    }}
                    key={track?.id}>
                    <TableCell width="10%" align="left" component="th" scope="row">
                      <img src={track?.album?.images[2].url} loading="lazy" alt="mashu" width={60} height={50} />
                    </TableCell>
                    <TableCell
                      width="30%"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 0,
                        //padding: "8px", // Adjust padding as per your requirement
                      }}
                      align="left"
                      scope="row">
                      {track?.name}
                    </TableCell>
                    <TableCell
                      width="30%"
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 0,
                        //padding: "8px", // Adjust padding as per your requirement
                      }}
                      align="left">
                      {track?.album.name}
                    </TableCell>
                    {addToPlaylist ? (
                      <TableCell width="15%" align="left">
                        <Button
                          onClick={async (e) => {
                            e.stopPropagation();
                            let mashu = await handleAddTrack(track);
                            if (mashu.status === 200) {
                              setSelectedRes((old) => old.filter((item) => item.uri !== track.uri));
                            }
                          }}
                          variant="contained"
                          endIcon={<AddIcon />}>
                          Add
                        </Button>{' '}
                      </TableCell>
                    ) : (
                      <>
                        <TableCell width="15%" align="left">
                          {track?.album.release_date}
                        </TableCell>
                        <TableCell width="15%" align="left">
                          {msToMinutesAndSeconds(track && track?.duration_ms)}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearchResTracks;
