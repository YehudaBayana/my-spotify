import React, { useState, useContext, KeyboardEvent, MouseEvent } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Container, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2'; // Update this line
import Blog from './Blog';
import { StoreContext } from '../../context/ContextProvider';
import { reducerActionTypes, searchMenu } from '../../constants';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useFetchSearch } from '../../customHooks/useFetchMusicInfo';
import SearchResTracks from './SearchResTracks';
import { Track } from 'src/types';
import { handlePlayTrack } from 'src/utils';

interface SearchPageProps {
  accessToken: string;
  addToPlaylist?: boolean;
  handleAddTrack: any; // Replace 'any' with the correct type if known
  playlistTracks: any; // Replace 'any' with the correct type if known
  setTracks: any; // Replace 'any' with the correct type if known
}

export default function SearchPage({ accessToken, addToPlaylist = false, handleAddTrack, playlistTracks, setTracks }: SearchPageProps) {
  const queryParams = new URLSearchParams(useLocation().search);
  const searchValueFromParam = queryParams.get('q') || '';
  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchValue, setSearchValue] = useState(searchValueFromParam);
  const [searchRes, setSearchRes] = useState<Record<string, any>>({});
  const [selectedRes, setSelectedRes] = useState<any[]>([]);
  const [bool, setBool] = useState(true);

  const filteredSearchMenu = addToPlaylist ? searchMenu.filter((item) => item === 'tracks' || item === 'playlists') : searchMenu;

  function handlePlay(track: Track) {
    handlePlayTrack(selectedRes, dispatch);  
    // const targetCondition = (obj: Track) => obj.id === track.id;
    // const targetIndex = selectedRes.findIndex(targetCondition);
    // const previousTracks = targetIndex !== -1 ? selectedRes.slice(0, targetIndex) : selectedRes;
    // const nextTracks = targetIndex !== -1 ? selectedRes.slice(targetIndex + 1) : [];
    // dispatch({
    //   type: reducerActionTypes.SET_PLAYING_TRACK,
    //   payload: { playing: track, nextTracks, previousTracks },
    // });
  }

  useFetchSearch(searchValue || searchValueFromParam, setSearchRes, accessToken, filteredSearchMenu[selectedIndex], setSelectedRes, bool);

  const handleListItemClick = (event: MouseEvent<HTMLDivElement>, index: number, itemMenu: string) => {
    setSelectedIndex(index);
    if (Object.keys(searchRes).length > 0) {
      const selectedItems = searchRes[filteredSearchMenu[index]].items.map((item: any) => {
        return item;
      });
      setSelectedRes(selectedItems);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && searchValue) {
      const params = new URLSearchParams();
      params.append('q', searchValue);
      navigate(`?q=${searchValue}`);
      setBool((old) => !old);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '30px 0' }}>
      <Container>
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <TextField
              size="small"
              id="filled-search"
              placeholder="Search field"
              type="search"
              variant="outlined"
              value={searchValue}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchValue(e.target.value)}
              fullWidth
              sx={{
                backgroundColor: 'lightgray',
                borderRadius: '4px',
              }}
            />
          </Grid2>

          <Grid2 xs={12} container justifyContent="space-between" alignItems="flex-start" flexDirection={{ xs: 'column', sm: 'row' }} sx={{ fontSize: '12px' }}>
            <Grid2 xs={6} md={3}>
              <List component="nav" aria-label="secondary mailbox folder">
                <Divider />
                {filteredSearchMenu.map((itemMenu, i) => (
                  <React.Fragment key={i}>
                    <ListItemButton selected={selectedIndex === i} onClick={(event) => handleListItemClick(event, i, itemMenu)}>
                      <ListItemText primary={itemMenu === 'playlists' ? itemMenu + '(undeveloped)' : itemMenu} />
                    </ListItemButton>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Grid2>
            <Grid2 container xs={6} md={9}>
              {selectedIndex === 0 ? (
                <SearchResTracks
                  setTracks={setTracks}
                  playlistTracks={playlistTracks}
                  handleAddTrack={handleAddTrack}
                  addToPlaylist={addToPlaylist}
                  selectedRes={selectedRes}
                  setSelectedRes={setSelectedRes}
                  handlePlay={handlePlay}
                />
              ) : selectedIndex === 1 ? (
                <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {searchRes &&
                    searchRes[filteredSearchMenu[selectedIndex]]?.items?.map((item: any, i: number) => (
                      <Grid2 key={i} xs={2} sm={4} md={4}>
                        <Card playlistDetails={item} />
                      </Grid2>
                    ))}
                </Grid2>
              ) : selectedIndex === 2 ? (
                <Blog artists={selectedRes} />
              ) : null}
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
