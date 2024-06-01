import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Container, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Blog from './Blog';
import SongList from '../../features/songsList/SongList';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../context/ContextProvider';

export default function SearchPage({accessToken}) {
  const { dispatch, } = useContext(StoreContext);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [bool, setBool] = useState(true);

  useEffect(() => {
    if (!searchValue) return dispatch({ type: 'setSearchResults', payload: [] });
    console.log('accessToken ', accessToken);
    if (!accessToken) return;
    const url = `https://api.spotify.com/v1/search?q=${searchValue}&type=artist%2Ctrack%2Cepisode%2Cshow`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    // Perform the GET request
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => {
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        // Handle the data from the response
        console.log(data);
        dispatch({
          type: 'setPlayList',
          payload: {
            items: data.tracks.items.map((item) => {
              return item
            }),
          },
        });
      })
      .catch((error) => {
        // Handle any errors
        console.error('There has been a problem with your fetch operation:', error);
      });
  }, [bool]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setBool(old => !old)
    }
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '30px 0' }}>
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
                backgroundColor: 'lightgray',
                borderRadius: '4px',
              }}
            />
          </Grid>

          <Grid xs={12} container justifyContent="space-between" alignItems="flex-start" flexDirection={{ xs: 'column', sm: 'row' }} sx={{ fontSize: '12px' }}>
            <Grid xs={6} md={3}>
              <List component="nav" aria-label="secondary mailbox folder">
                <Divider />
                <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                  <ListItemText primary="Trash" />
                </ListItemButton>
                <Divider />
                <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                  <ListItemText primary="Spam" />
                </ListItemButton>
                <Divider />
              </List>
            </Grid>
            <Grid container xs={6} md={9}>
              {/* <Blog /> */}
              <SongList />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );

  //     <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  //
  //           <TextField
  //             size="small"
  //             id="filled-search"
  //             placeholder="Search field"
  //             type="search"
  //             variant="outlined"
  //             fullWidth
  //             sx={{
  //               backgroundColor: 'lightgray',
  //               borderRadius: '4px',
  //             }}
  //           />
  //           <Divider />
  //           <List component="nav" aria-label="secondary mailbox folder">
  //             <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
  //               <ListItemText primary="Trash" />
  //             </ListItemButton>
  //             <ListItemButton selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
  //               <ListItemText primary="Spam" />
  //             </ListItemButton>
  //           </List>
  //     </Box>
  //   );
}

// const SearchInput = () => {
//   return (
//     <TextField
//       size="small"
//       id="filled-search"
//       placeholder="Search field"
//       type="search"
//       variant="outlined"
//       fullWidth
//       sx={{
//         backgroundColor: 'lightgray',
//         borderRadius: '4px',
//       }}
//     />
//   );
// };

// // export default SearchInput
