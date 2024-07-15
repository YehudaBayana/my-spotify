import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, CardActions, Button, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { myColors, reducerActionTypes } from 'src/constants';
import { fetchPlayableItems } from 'src/customHooks/useFetchMusicInfo';
import { StoreContext } from 'src/context/ContextProvider';
import { Track } from 'src/types';
import { handlePlayTrack } from 'src/utils';

interface CardSliderProps {
  playlists: any[]; // Update with actual type
  containerRef: React.RefObject<HTMLDivElement>;
  currentIndex: number;
  cardWidth: number;
}

const CardSlider: React.FC<CardSliderProps> = ({ playlists, containerRef, currentIndex, cardWidth }) => {
  const {state, dispatch} = useContext(StoreContext);
  const {accessToken} = state;
  const handlePlay = async (playlistId:string, type: string)=>{
    const {tracks} = await fetchPlayableItems(accessToken, playlistId, type);
    handlePlayTrack(tracks, dispatch);
    // const targetCondition = (obj: Track) => obj.id === tracks[0].id;
    //   const targetIndex = tracks.findIndex(targetCondition);
    //   const previousTracks = targetIndex !== -1 ? tracks.slice(0, targetIndex) : tracks;
    //   const nextTracks = targetIndex !== -1 ? tracks.slice(targetIndex + 1) : [];
    //   dispatch({
    //     type: reducerActionTypes.SET_PLAYING_TRACK,
    //     payload: { playing: tracks[0], nextTracks, previousTracks },
    //   });
  }
  return (
    <Box sx={{ margin: '0 auto', position: 'relative' }} ref={containerRef}>
      <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.5s ease-in-out',
            transform: `translateX(-${currentIndex * cardWidth}px)`,
            width: `${playlists.length * cardWidth}px`,
          }}>
          {playlists.map((playlist) => (
            <Card variant="elevation" key={playlist.id} sx={{ height: 'max-content', width: cardWidth, margin: '10px 10px', boxShadow: 'unset', background: myColors.secondary }}>
              <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/playlist/${playlist.id}`} key={playlist.id}>
                <CardMedia component="img" height="194" image={playlist?.images[0]?.url} alt="Paella dish" />
                <CardContent>
                  <Typography
                  fontSize="20px"
                    sx={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      // height: '3em', // Assuming line-height is 1.5em
                    }}
                    variant="h5"
                    color="text.secondary">
                    {playlist.name}
                  </Typography>
                </CardContent>
              </Link>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }} disableSpacing>
                <Button onClick={()=> handlePlay(playlist.id, playlist.type)} size="small">Play</Button>
                <IconButton aria-label="add to favorites">
                  <MoreVertIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CardSlider;

//-------------------------------
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { Link } from 'react-router-dom/cjs/react-router-dom';

// const CardsSlider = ({visibleCards, playlists}) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
// //   const visibleCards = 5;

// //   const playlists = [
// //     { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/300', description: 'This is asdf asdf asdf asdf jfds gkds fghkjds fgnsa card 1' },
// //     { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/300', description: 'This is card 2' },
// //     { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/300', description: 'This is card 3' },
// //     { id: 4, title: 'Card 4', image: 'https://via.placeholder.com/300', description: 'This is card 4' },
// //     { id: 5, title: 'Card 5', image: 'https://via.placeholder.com/300', description: 'This is card 5' },
// //     { id: 6, title: 'Card 6', image: 'https://via.placeholder.com/300', description: 'This is card 6' },
// //     { id: 7, title: 'Card 7', image: 'https://via.placeholder.com/300', description: 'This is card 7' },
// //     { id: 8, title: 'Card 8', image: 'https://via.placeholder.com/300', description: 'This is card 8' },
// //   ];

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, playlists.length - visibleCards));
//   };

//   useEffect(() => {
//     if (currentIndex >= playlists.length - visibleCards) {
//       return;
//     }
//     // const interval = setInterval(() => {
//     //   setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - visibleCards));
//     // }, 3000);
//     // return () => clearInterval(interval);
//   }, [currentIndex, playlists.length, visibleCards]);

//   return (
//     <Box sx={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
//       <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
//         <Box
//           sx={{
//             display: 'flex',
//             transition: 'transform 0.5s ease-in-out',
//             transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
//             width: `${(playlists.length * 100) / visibleCards}%`,
//           }}
//         >
//           {playlists.map((playlist) => (
//              <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/playlist/${playlist.id}`} key={playlist.id}>
//             <Card  sx={{ flex: `0 0 ${100 / visibleCards}%`, boxSizing: 'border-box', padding: '10px' }}>
//               <CardMedia component="img" height="140" image={playlist?.images[0]?.url} alt={playlist.name} />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {playlist.name}
//                 </Typography>
//                 <Typography noWrap variant="body2" color="text.secondary">
//                   {playlist.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//              </Link>
//           ))}
//         </Box>
//       </Box>
//       <IconButton
//         onClick={handlePrev}
//         sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
//         disabled={currentIndex === 0}
//       >
//         <ArrowBackIosIcon />
//       </IconButton>
//       <IconButton
//         onClick={handleNext}
//         sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
//         disabled={currentIndex >= playlists.length - visibleCards}
//       >
//         <ArrowForwardIosIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default CardsSlider;

//-----------------------------------------
// import React, { useState, useEffect, useRef } from 'react';
// import { Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// const CardSlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleCards, setVisibleCards] = useState(3);
//   const containerRef = useRef();

//   const cards = [
//     { id: 1, title: 'Card 1', image: 'https://via.placeholder.com/300', description: 'This is card 1' },
//     { id: 2, title: 'Card 2', image: 'https://via.placeholder.com/300', description: 'This is card 2' },
//     { id: 3, title: 'Card 3', image: 'https://via.placeholder.com/300', description: 'This is card 3' },
//     { id: 4, title: 'Card 4', image: 'https://via.placeholder.com/300', description: 'This is card 4' },
//     { id: 5, title: 'Card 5', image: 'https://via.placeholder.com/300', description: 'This is card 5' },
//     { id: 6, title: 'Card 6', image: 'https://via.placeholder.com/300', description: 'This is card 6' },
//     { id: 7, title: 'Card 7', image: 'https://via.placeholder.com/300', description: 'This is card 7' },
//     { id: 8, title: 'Card 8', image: 'https://via.placeholder.com/300', description: 'This is card 8' },
//   ];

//   const cardWidth = 200; // Adjust this width to change the number of visible cards

//   useEffect(() => {
//     const updateVisibleCards = () => {
//       if (containerRef.current) {
//         const containerWidth = containerRef.current.offsetWidth;
//         setVisibleCards(Math.floor(containerWidth / cardWidth));
//       }
//     };

//     window.addEventListener('resize', updateVisibleCards);
//     updateVisibleCards();

//     return () => {
//       window.removeEventListener('resize', updateVisibleCards);
//     };
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - visibleCards));
//   };

//   useEffect(() => {
//     if (currentIndex >= cards.length - visibleCards) {
//       return;
//     }
//     // const interval = setInterval(() => {
//     //   setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, cards.length - visibleCards));
//     // }, 3000);
//     // return () => clearInterval(interval);
//   }, [currentIndex, cards.length, visibleCards]);

//   return (
//     <Box sx={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }} ref={containerRef}>
//       <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
//         <Box
//           sx={{
//             display: 'flex',
//             transition: 'transform 0.5s ease-in-out',
//             transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
//             width: `${(cards.length * 100) / visibleCards}%`,
//           }}
//         >
//           {cards.map((card) => (
//             <Card key={card.id} sx={{ flex: `0 0 ${100 / visibleCards}%`, boxSizing: 'border-box', padding: '10px' }}>
//               <CardMedia component="img" height="140" image={card.image} alt={card.title} />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   {card.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {card.description}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </Box>
//       <IconButton
//         onClick={handlePrev}
//         sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
//         disabled={currentIndex === 0}
//       >
//         <ArrowBackIosIcon />
//       </IconButton>
//       <IconButton
//         onClick={handleNext}
//         sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
//         disabled={currentIndex >= cards.length - visibleCards}
//       >
//         <ArrowForwardIosIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default CardSlider;
