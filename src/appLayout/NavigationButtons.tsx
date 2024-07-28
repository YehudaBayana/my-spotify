import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import useHistoryNavigation from '../customHooks/useHistoryNavigation';
// import useHistoryNavigation from 'src/customHooks/useHistoryNavigation';


const NavigationButtons = () => {
    const { canGoBack, canGoForward, goBack, goForward } = useHistoryNavigation();
  
    return (
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={goBack}
          disabled={!canGoBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={goForward}
          disabled={!canGoForward}
        >
          Forward
        </Button>
      </Box>
    );
  };
  

export default NavigationButtons;

{/* <IconButton onClick={handlePrev} color="primary" sx={{ padding: "1px" }} disabled={currentIndex === 0}>
        <ArrowCircleLeftIcon sx={{ cursor: "pointer" }} fontSize="large" />
      </IconButton>
      <IconButton onClick={handleNext} color="primary" sx={{ padding: "1px" }} disabled={currentIndex >= playlists.length - visibleCards}>
        <ArrowCircleRightIcon sx={{ cursor: "pointer" }} fontSize="large" />
      </IconButton> */}