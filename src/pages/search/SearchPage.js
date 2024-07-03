import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Container, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Blog from "./Blog";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { reducerActionTypes, searchMenu } from "../../constants";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/card/Card";
import { useFetchSearch } from "../../customHooks/useFetchMusicInfo";
// import { msToMinutesAndSeconds } from "../../../utils";
import SearchResTracks from "./SearchResTracks";
// import { useLocation } from 'react-router-dom/cjs/react-router-dom';

export default function SearchPage({ accessToken, addToPlaylist = false, handleAddTrack, playlistTracks, setTracks }) {
  const queryParams = new URLSearchParams(useLocation().search);
  const searchValueFromParam = queryParams.get('q') ? queryParams.get('q') : ""; 
  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchValue, setSearchValue] = useState(searchValueFromParam);
  const [searchRes, setSearchRes] = useState({});
  const [selectedRes, setSelectedRes] = useState([]);
  const [bool, setBool] = useState(true);
  const filteredSearchMenu = addToPlaylist ? searchMenu.filter(item => item === "tracks" || item==="playlists"): searchMenu
  function handlePlay(track) {
    dispatch({
      type:reducerActionTypes.SET_PLAYING_TRACK,
      payload:track
    });
  }
  useFetchSearch(
    searchValue || searchValueFromParam,
    setSearchRes,
    accessToken,
    filteredSearchMenu[selectedIndex],
    setSelectedRes,
    bool
  );

  const handleListItemClick = (event, index, itemMenu) => {
    setSelectedIndex(index);
    if (Object.keys(searchRes).length > 0) {
      const selectedItems = searchRes[filteredSearchMenu[index]].items.map((item) => {
        return item;
      });
      setSelectedRes(selectedItems);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchValue) {
      const params = new URLSearchParams();
      params.append("q", searchValue);
      navigate(`?q=${searchValue}`);
      setBool((old) => !old);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, margin: "30px 0" }}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12}>
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
                backgroundColor: "lightgray",
                borderRadius: "4px",
              }}
            />
          </Grid>

          <Grid
            xs={12}
            container
            justifyContent="space-between"
            alignItems="flex-start"
            flexDirection={{ xs: "column", sm: "row" }}
            sx={{ fontSize: "12px" }}
          >
            <Grid xs={6} md={3}>
              <List component="nav" aria-label="secondary mailbox folder">
                <Divider />
                {filteredSearchMenu.map((itemMenu, i) => (
                  <>
                    <ListItemButton
                    key={i}
                      selected={selectedIndex === i}
                      onClick={(event) =>
                        handleListItemClick(event, i, itemMenu)
                      }
                    >
                      {/* TODO: develop playlists selection */}
                      <ListItemText primary={itemMenu === "playlists"? itemMenu + "(undeveloped)":itemMenu} /> 
                    </ListItemButton>
                    <Divider />
                  </>
                ))}
              </List>
            </Grid>
            <Grid container xs={6} md={9}>
              {selectedIndex === 0 ? (
                <SearchResTracks setTracks={setTracks} playlistTracks={playlistTracks} handleAddTrack={handleAddTrack} addToPlaylist={addToPlaylist} selectedRes={selectedRes} setSelectedRes={setSelectedRes} handlePlay={handlePlay} />
              ) : selectedIndex === 1 ? (
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {searchRes &&
                    searchRes[filteredSearchMenu[selectedIndex]]?.items?.map((item, i) => {
                      return (
                        <>
                          <Grid key={i} item xs={2} sm={4} md={4}>
                            <Card playlistDetails={item} />
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              ) : selectedIndex === 2 ? (
                <Blog artists={selectedRes} />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
