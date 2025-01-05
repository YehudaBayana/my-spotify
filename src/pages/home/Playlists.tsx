import React from "react";
import { Grid, Card, CardMedia } from "@mui/material";
// import { useSearch } from '../../api/spotifyApi';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Playlist } from '../../types/spotifyResponses';
import { Link } from 'react-router-dom';
import { useSearch } from '../../api/spotifyApi';

const MAIN_CARD_MAX_WIDTH = 1000;
const SECONDARY_CARD_MAX_WIDTH = 552;

type AspectRatioKeys = 'main' | 'secondary';
type AspectRatios = Record<AspectRatioKeys, number>;

const Playlists: React.FC = () => {
  const [aspectRatios, setAspectRatios] = React.useState<AspectRatios>({ main: 1, secondary: 1 });
  const { data: playlistData, isLoading, error } = useSearch("Queen - top", "playlist", { limit: 1 });
  const { data: michaelRes } = useSearch("Michael Jackson", "playlist", { limit: 10 });
  const { data: stromaeRes } = useSearch("Stromae", "playlist", { limit: 10 });
  const { data: eltonRes } = useSearch("Elton John: Best Of", "playlist", { limit: 10 });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const playlists = [
    playlistData?.playlists.items.filter((item) => item)[0],
    michaelRes?.playlists.items.filter((item) => item)[0],
    stromaeRes?.playlists.items.filter((item) => item)[0],
    eltonRes?.playlists.items.filter((item) => item)[0]
  ].filter(Boolean); // This removes any undefined items

  const handleImageLoad = (type: AspectRatioKeys) => (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = event.currentTarget;
    setAspectRatios(prev => ({ ...prev, [type]: width / height }));
  };

  const renderCard = (playlist: Playlist | undefined, maxWidth: number, aspectRatioKey: AspectRatioKeys) => (
    playlist ? (
      <Link to={`/playlist/${playlist.id}`}>
        <Card sx={{
          borderRadius: "8px",
          maxWidth,
          width: '100%',
          height: "100%",//`calc(${maxWidth}px * ${aspectRatios[aspectRatioKey]})`,
          position: "relative"
        }}>
          <CardMedia
            component="img"
            image={playlist.images[0]?.url}
            alt={`${playlist.name} Cover`}
            onLoad={handleImageLoad(aspectRatioKey)}
            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Card>
      </Link>
    ) : null
  );

  return (
    <Grid item xs={12} md={9} container spacing={2}>
      <Grid item xs={9}>
        {renderCard(playlists[0], MAIN_CARD_MAX_WIDTH, 'main')}
      </Grid>
      <Grid item xs={3} container spacing={2}>
        {/* <Grid container spacing={2}> */}
        {playlists.slice(1).map((playlist, index) => (
          playlist ? <Grid item xs={12} key={playlist.id}>
            {renderCard(playlist, SECONDARY_CARD_MAX_WIDTH, 'secondary')}
          </Grid> : null
        ))}
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Playlists;
