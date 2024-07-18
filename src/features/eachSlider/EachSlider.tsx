import React, { useState, useEffect, useRef } from "react";
import "./eachSlider.css";
import { Container } from "../../App";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, IconButton, Typography } from "@mui/material";
import CardsSlider from "../CardsSlider";
import { PLAYLIST_CARD_WIDTH } from "../../constants";

interface EachSliderProps {
  playlists: any[]; // Update with actual type
  description: any; // Update with actual type
  drawerWidthState: any; // Update with actual type
  id: number
}

const EachSlider: React.FC<EachSliderProps> = ({ playlists, description, drawerWidthState, id }) => {
  const [visibleCards, setVisibleCards] = useState<number>(window.innerWidth);
  const [windowWith, setWindowWith] = useState<number>(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(PLAYLIST_CARD_WIDTH);
  const containerRef = useRef<HTMLDivElement>(null);

  let timeout: NodeJS.Timeout;

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined as any;
    }
    const updateCardWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newVisibleCards = Math.floor(containerWidth / PLAYLIST_CARD_WIDTH);
        setVisibleCards(newVisibleCards);
        setCardWidth(containerWidth / newVisibleCards);
      }
    };

    timeout = setTimeout(() => {
      updateCardWidth();
    }, 1000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = undefined as any;
      }
    };
  }, [drawerWidthState, visibleCards]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, playlists.length - visibleCards));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);  

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container style={{ marginTop: "40px" }}>
          {/* <h2 className="genre-title">{description}</h2> */}
          <div className="flex-between">
            <Box sx={{ margin: "0 10px" }}>
              <IconButton onClick={handlePrev} color="primary" sx={{ padding: "1px" }} disabled={currentIndex === 0}>
                <ArrowCircleLeftIcon sx={{ cursor: "pointer" }} fontSize="large" />
              </IconButton>
              <IconButton onClick={handleNext} color="primary" sx={{ padding: "1px" }} disabled={currentIndex >= playlists.length - visibleCards}>
                <ArrowCircleRightIcon sx={{ cursor: "pointer" }} fontSize="large" />
              </IconButton>
            </Box>
            <Typography padding={"0px"} margin={0} variant='h4'>{description}</Typography>
            <Link to={playlists ? `genre/${id}` : "/"}>
              <Button variant="contained">see all</Button>
            </Link>
          </div>
          {playlists?.length > 0 && <CardsSlider cardWidth={cardWidth} playlists={playlists} containerRef={containerRef} currentIndex={currentIndex} />}
        </Container>
      </Box>
    </>
  );
};

export default EachSlider;