import React, { useState, useEffect, useContext } from "react";
import "./eachSlider.css";
import { Container } from "../../App";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Card from "../../components/card/Card";
import { useRef } from "react";
import { Box, Button, Grid, IconButton, Paper } from "@mui/material";
import CardsSlider from '../CardsSlider';

const EachSlider = ({ playlists, des, drawerWidthState }) => {
  let visibleCards = 4;
  let sliderRef = useRef(null);
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  const [click, setClick] = useState(1);
  const [greyOutLeft, setGreyOutLeft] = useState(true);
  const [greyOutRight, setGreyOutRight] = useState(false);
  const [isClickedDisabled, setIsClickedDisabled] = useState(false);
  const cardsAmountDisplayed = Math.ceil((windowWith - 222) / 236);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef();
  const [cardWidth, setCardWidth] = useState(0);

  const handleNavigation = (direction) => {
    setClick((oldClick) => {
      const newClick = direction === "next" ? oldClick + 1 : oldClick - 1;

      // Slide to next or previous
      if (direction === "next") {
        sliderRef.slickNext();
      } else {
        sliderRef.slickPrev();
      }

      // Disable click temporarily
      setIsClickedDisabled(true);
      setTimeout(() => {
        setIsClickedDisabled(false);
      }, 550);

      // Update grey out states
      setGreyOutLeft(newClick <= 1);
      setGreyOutRight(newClick >= playlists.length / cardsAmountDisplayed);

      return newClick;
    });
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, playlists.length - visibleCards));
  };


  const next = () => {
    if (click < playlists.length / cardsAmountDisplayed) {
      handleNavigation("next");
    }
  };

  const previous = () => {
    if (click > 1) {
      handleNavigation("previous");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  let settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: cardsAmountDisplayed,
    slidesToScroll: cardsAmountDisplayed,
  };

  return (
    <>
    <Box sx={{flexGrow:1}}>
      <Container style={{ margin: "40px 0" }}>
        <h2 className="genre-title">{des}</h2>
        <div className="flex-between">
          <Box sx={{ margin: "0 10px" }}>
          <IconButton color='info' sx={{padding:"1px"}} disabled={currentIndex === 0}>
            <ArrowCircleLeftIcon
              // color={greyOutLeft ? "secondary" : "info"}
              sx={{ cursor: "pointer" }}
              fontSize="large"
              onClick={handlePrev}
              
            />
            </IconButton>
            <IconButton color='info' sx={{padding:"1px"}} disabled={currentIndex >= playlists.length - visibleCards}>
            <ArrowCircleRightIcon
              // color={greyOutRight ? "secondary" : "info"}
              sx={{ cursor: "pointer" }}
              fontSize="large"
              onClick={handleNext}
              // disabled={currentIndex >= playlists.length - visibleCards}
            />
            </IconButton>
          </Box>

          <Link to={playlists ? `/${playlists[0]?.id}` : "/"}>
            {/* className="see-all" */}
            <Button variant="contained">see all</Button>
          </Link>
        </div>
        <CardsSlider drawerWidthState={drawerWidthState} playlists={playlists} containerRef={containerRef} setCardWidth={setCardWidth} currentIndex={currentIndex} cardWidth={cardWidth} visibleCards={visibleCards}/>
        {/* <Slider
          centerPadding="10px"
          ref={(slider) => {
            sliderRef = slider;
          }}
          swipe={false}
          {...settings}
        >
          {playlists?.map((item) => {
            return (
              <>
                <Card playlistDetails={item} />
              </>
            );
          })}
        </Slider> */}
      </Container>
      </Box>
      {/* <hr /> */}
    </>
  );
};

export default EachSlider;
// import React, { useState, useEffect, useContext } from "react";
// import "./eachSlider.css";
// import { Card, Col } from "react-bootstrap";
// import { Container } from "../../../App";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import AlbumImg from "../AlbumImg";
// import { StoreContext } from "../../context/ContextProvider";

// const EachSlider = ({ playlists, des }) => {
//   const { dispatch, updatePlaylist } = useContext(StoreContext);
//   const [windowWith, setWindowWith] = useState(window.innerWidth);
//   useEffect(() => {
//     window.addEventListener("resize", () => {
//       setWindowWith(window.innerWidth);
//     });
//   }, [windowWith]);

//   let settings = {
//     dots: false,
//     arrows: true,
//     infinite: false,
//     speed: 500,
//     slidesToShow: Math.ceil((windowWith - 222) / 236),
//     slidesToScroll: Math.ceil((windowWith - 222) / 236),
//   };

//   return (
//     <>
//       <Container style={{ margin: "40px 0" }}>
//         <h2 className="genre-title">{des}</h2>
//         <div className="flex-between">
//           {/* <p>---------------</p> */}
//           <hr />
//           <Link
//             to={playlists ? `/${playlists[0]?.id}` : "/"}
//             className="see-all"
//           >
//             see all
//           </Link>
//         </div>
//         <Slider {...settings}>
//           {playlists?.map((item) => {
//             return (
//               <>
//                 <Link
//                   onClick={() => {
//                     // dispatch({ type: "setIsClicked" });
//                     // updatePlaylist(item.id);
//                   }}
//                   to={`/tracks/${item.id}`}
//                   key={item.id}
//                 >
//                   <Col>
//                     <div className="slider-card">
//                       <div style={{ maxWidth: "200px", borderRadius: "10px" }}>
//                         <img src={item.images[0].url} alt="" width="100%" />
//                         {/* <AlbumImg key={item.id} imgUrl={item.images[0].url} /> */}
//                       </div>
//                       <div>
//                         <h4 className="slider-card-h4">{item.name}</h4>
//                         <p className="slider-card-p">{item.description}</p>
//                       </div>
//                     </div>
//                   </Col>
//                 </Link>
//               </>
//             );
//           })}
//         </Slider>
//       </Container>
//       {/* <hr /> */}
//     </>
//   );
// };

// export default EachSlider;
