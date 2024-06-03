import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Container, TextField, selectClasses } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Blog from "./Blog";
import SongList from "../../features/songsList/SongList";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/ContextProvider";
import { searchMenu } from "../../../constants";
import { useHistory } from "react-router-dom";

export default function SearchPage({ accessToken, chooseTrack }) {
  const history = useHistory();
  const { dispatch } = useContext(StoreContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchValue, setSearchValue] = useState(null);
  const [searchRes, setSearchRes] = useState({});
  const [selectedRes, setSelectedRes] = useState();
  const [bool, setBool] = useState(true);

  useEffect(() => {
    if (!searchValue)
      return dispatch({ type: "setSearchResults", payload: [] });
    console.log("accessToken ", accessToken);
    if (!accessToken) return;
    const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow%2Cplaylist`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setSearchRes(data);
        dispatch({
          type: "setPlaylist",
          payload: {
            items: data[searchMenu[selectedIndex]].items.map((item) => {
              return item;
            }),
          },
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [bool]);

  const handleListItemClick = (event, index, itemMenu) => {
    setSelectedIndex(index);
    console.log("searchRes ", searchRes);
    if (Object.keys(searchRes).length > 0) {
      setSelectedRes(
        searchRes[searchMenu[index]].items.map((item) => {
          return item;
        })
      );
      // dispatch({
      //   type: "setPlaylist",
      //   payload: {
      //     items: searchRes[searchMenu[index]].items.map((item) => {
      //       return item;
      //     }),
      //   },
      // });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchValue) {
      const params = new URLSearchParams();
      params.append("q", searchValue);
      history.push({ search: params.toString() });
      // window.history.push({
      //   search: `?q=${searchValue}`,
      // });
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
                {searchMenu.map((itemMenu, i) => (
                  <>
                    <ListItemButton
                      selected={selectedIndex === i}
                      onClick={(event) =>
                        handleListItemClick(event, i, itemMenu)
                      }
                    >
                      <ListItemText primary={itemMenu} />
                    </ListItemButton>
                    <Divider />
                  </>
                ))}
              </List>
            </Grid>
            <Grid container xs={6} md={9}>
              {selectedIndex === 0 ? (
                <SongList chooseTrack={chooseTrack} />
              ) : (
                <Blog artists={selectedRes} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
