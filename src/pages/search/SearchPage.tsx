import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Container, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // Update this line
import Blog from "./Blog";
import { StoreContext } from "../../context/ContextProvider";
import { searchMenu } from "../../constants";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/card/Card";
// import { getSearch } from "../../customHooks/useFetchMusicInfo";
import SearchResTracks from "./SearchResTracks";
import { handlePlayTrack } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../customHooks/useDebounce";
import { useGetRequest } from "../../api/CRUD/useGetRequest";
import { Track } from '../../types/spotifyResponses';
import { SpotifyApiUrls } from '../../api/utils';
// import { useDebounce } from "./useDebounce"; // Import the debounce hook

interface SearchPageProps {
  addToPlaylist?: boolean;
  handleAddTrack: any; // Replace 'any' with the correct type if known
  playlistTracks: any; // Replace 'any' with the correct type if known
  setTracks: any; // Replace 'any' with the correct type if known
}

export default function SearchPage({ addToPlaylist = false, handleAddTrack, playlistTracks, setTracks }: SearchPageProps) {
  const queryParams = new URLSearchParams(useLocation().search);
  const searchValueFromParam = queryParams.get("q") || "";
  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchValue, setSearchValue] = useState(searchValueFromParam);
  const [searchRes, setSearchRes] = useState<Record<string, any>>({});
  const [selectedRes, setSelectedRes] = useState<any[]>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500); // Debounce the search value
  const { get: getSearch } = useGetRequest(SpotifyApiUrls.GET_SEARCH);
  const filteredSearchMenu = addToPlaylist ? searchMenu.filter((item) => item === "tracks" || item === "playlists") : searchMenu;

  function handlePlay(track: Track) {
    handlePlayTrack(selectedRes, track, dispatch);
  }

  const searchQuery = useQuery({
    queryKey: ["search", debouncedSearchValue],
    queryFn: () => { },//getSearch(SpotifyApiUrlsGet.GET_SEARCH + "?q=" + debouncedSearchValue + "&type=playlist"),
    enabled: !!debouncedSearchValue, // Only run the query if the debounced search value is not empty
  });
  console.log("searchQuery ", searchQuery);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("q", debouncedSearchValue);
    navigate(`?q=${debouncedSearchValue}`);
    if (!searchQuery.isPending && searchQuery.data) {
      // setSearchRes(searchQuery.data);
      // setSelectedRes(searchQuery.data[filteredSearchMenu[selectedIndex]]?.items?.map((item: any) => item) || []);
    }
  }, [debouncedSearchValue, searchQuery.isPending, searchQuery.data]);

  console.log("searchQuery ", searchQuery);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    if (Object.keys(searchRes).length > 0) {
      const selectedItems = searchRes[filteredSearchMenu[index]].items.map((item: any) => {
        return item;
      });
      setSelectedRes(selectedItems);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, margin: "30px 0" }}>
      <Container>
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <TextField
              size="small"
              id="filled-search"
              placeholder="Search Field"
              type="search"
              variant="outlined"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            />
          </Grid2>
          {searchQuery.isLoading ? (
            <p>loading...</p>
          ) : searchQuery.isError ? (
            <p>error...</p>
          ) : (
            <Grid2 xs={12} container justifyContent="space-between" alignItems="flex-start" flexDirection={{ xs: "column", sm: "row" }} sx={{ fontSize: "12px" }}>
              <Grid2 xs={6} md={3}>
                <List component="nav" aria-label="secondary mailbox folder">
                  <Divider />
                  {filteredSearchMenu.map((itemMenu, i) => (
                    <React.Fragment key={i}>
                      <ListItemButton selected={selectedIndex === i} onClick={(event) => handleListItemClick(i)}>
                        <ListItemText primary={itemMenu !== "playlists" && itemMenu !== "tracks" ? itemMenu + "(undeveloped)" : itemMenu} />
                      </ListItemButton>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Grid2>
              <Grid2 container xs={6} md={9}>
                {selectedIndex === 0 ? (
                  searchRes[filteredSearchMenu[selectedIndex]]?.items ? (
                    <SearchResTracks
                      setTracks={setTracks}
                      playlistTracks={playlistTracks}
                      handleAddTrack={handleAddTrack}
                      addToPlaylist={addToPlaylist}
                      selectedRes={selectedRes}
                      setSelectedRes={setSelectedRes}
                      handlePlay={handlePlay}
                    />
                  ) : (
                    <Box width="100%" height="200px" alignContent="center">
                      <h1 style={{ textAlign: "center" }}>start typing in the search input...</h1>
                    </Box>
                  )
                ) : selectedIndex === 1 ? (
                  <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {searchRes &&
                      searchRes[filteredSearchMenu[selectedIndex]]?.items
                        ?.filter((item: any) => item?.id)
                        .map(
                          (item: any, i: number) =>
                            // @ts-expect-error
                            console.log("item ", item) || (
                              <Grid2 key={i} xs={2} sm={4} md={4}>
                                <Card playlistDetails={item} />
                              </Grid2>
                            )
                        )}
                  </Grid2>
                ) : selectedIndex === 2 ? (
                  <Blog artists={selectedRes} />
                ) : null}
              </Grid2>
            </Grid2>
          )}
        </Grid2>
      </Container>
    </Box>
  );
}
