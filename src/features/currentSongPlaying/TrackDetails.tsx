import { Card, CardMedia, CardContent, Chip, Box } from '@mui/material';
import { ListItemAvatar, ListItemText, ListItemSecondaryAction, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/ContextProvider';
import { getTrack } from '../../customHooks/useFetchMusicInfo';
// import { myColors } from 'src/constants';
// import { StoreContext } from 'src/context/ContextProvider';
// import { getTrack } from 'src/customHooks/useFetchMusicInfo';

const TrackDetails: React.FC = () => {
  const { state, dispatch } = useContext(StoreContext);
  const { accessToken, playingTrack, queue } = state;
  const [track, setTrack ] = useState(
    {
      "album": {
          "album_type": "album",
          "artists": [
              {
                  "external_urls": {
                      "spotify": "https://open.spotify.com/artist/1hzfo8twXdOegF3xireCYs"
                  },
                  "href": "https://api.spotify.com/v1/artists/1hzfo8twXdOegF3xireCYs",
                  "id": "1hzfo8twXdOegF3xireCYs",
                  "name": "Milky Chance",
                  "type": "artist",
                  "uri": "spotify:artist:1hzfo8twXdOegF3xireCYs"
              }
          ],
          "available_markets": [],
          "external_urls": {
              "spotify": "https://open.spotify.com/album/5D20ZzsNB377xbshIFP9Nb"
          },
          "href": "https://api.spotify.com/v1/albums/5D20ZzsNB377xbshIFP9Nb",
          "id": "5D20ZzsNB377xbshIFP9Nb",
          "images": [
              {
                  "url": "https://i.scdn.co/image/ab67616d0000b273b5d4730e54f84c66c70fe60a",
                  "width": 640,
                  "height": 640
              },
              {
                  "url": "https://i.scdn.co/image/ab67616d00001e02b5d4730e54f84c66c70fe60a",
                  "width": 300,
                  "height": 300
              },
              {
                  "url": "https://i.scdn.co/image/ab67616d00004851b5d4730e54f84c66c70fe60a",
                  "width": 64,
                  "height": 64
              }
          ],
          "name": "Sadnecessary",
          "release_date": "2014-06-20",
          "release_date_precision": "day",
          "total_tracks": 14,
          "type": "album",
          "uri": "spotify:album:5D20ZzsNB377xbshIFP9Nb"
      },
      "artists": [
          {
              "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1hzfo8twXdOegF3xireCYs"
              },
              "href": "https://api.spotify.com/v1/artists/1hzfo8twXdOegF3xireCYs",
              "id": "1hzfo8twXdOegF3xireCYs",
              "name": "Milky Chance",
              "type": "artist",
              "uri": "spotify:artist:1hzfo8twXdOegF3xireCYs"
          }
      ],
      "available_markets": [],
      "disc_number": 1,
      "duration_ms": 313684,
      "explicit": false,
      "external_ids": {
          "isrc": "DEL211300741"
      },
      "external_urls": {
          "spotify": "https://open.spotify.com/track/6vECYJHxYmm3Ydt3fF01pE"
      },
      "href": "https://api.spotify.com/v1/tracks/6vECYJHxYmm3Ydt3fF01pE",
      "id": "6vECYJHxYmm3Ydt3fF01pE",
      "is_local": false,
      "name": "Stolen Dance",
      "popularity": 5,
      "preview_url": "https://p.scdn.co/mp3-preview/a5a49157caae8d8fbb5c82b70a6244a9ec828562?cid=057cdd5b992444f2858403e816dcae20",
      "track_number": 11,
      "type": "track",
      "uri": "spotify:track:6vECYJHxYmm3Ydt3fF01pE"
  }
  )
  useEffect(() => {
    const execute = async () => {
      if (queue.length > 0) {
        const current = queue.find(item => item.currentlyPlaying)
        if (current) {
          const trackRes = await getTrack(accessToken, current.id);
          setTrack(trackRes);
          console.log(trackRes);
        }
      }
    };
    execute();
    return () => {};
  }, [queue]);

  return (//sx={{objectFit:"fill", marginTop:"70px"}} 
    <Card sx={{ background: "transparent", boxShadow:"none", border: 'none', padding: '50px', maxWidth: 600, margin: 'auto', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <CardMedia component="img" height="100%" image={track.album.images[0].url} alt={`${track.name} album cover`} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="center">
          {track.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" textAlign="center">
          by {track.artists[0]?.name}
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Album:
          </Typography>
          <Typography variant="body2" color="text.primary" ml={1}>
            {track.album.name}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Typography variant="body2" color="text.secondary">
            Released:
          </Typography>
          <Typography variant="body2" color="text.primary" ml={1}>
            {track.album.release_date}
          </Typography>
        </Box>
        {/* <Box display="flex" justifyContent="center" flexWrap="wrap" mt={2}>
          {genres.map((genre, index) => (
            <Chip key={index} label={genre} variant="outlined" sx={{ margin: 0.5 }} />
          ))}
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default TrackDetails;
