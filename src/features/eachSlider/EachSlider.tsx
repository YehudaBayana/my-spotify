import React, { useState, useEffect, useRef } from "react";
import "./eachSlider.css";
import { Container } from "../../App";
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Box, Button, IconButton } from "@mui/material";
import CardsSlider from "../CardsSlider";
import { PLAYLIST_CARD_WIDTH } from "../../constants";

interface EachSliderProps {
  playlists: any[]; // Update with actual type
  des: string; // Update with actual type
  drawerWidthState: any; // Update with actual type
}

const EachSlider: React.FC<EachSliderProps> = ({ playlists, des, drawerWidthState }) => {
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
        <Container style={{ margin: "40px 0" }}>
          <h2 className="genre-title">{des}</h2>
          <div className="flex-between">
            <Box sx={{ margin: "0 10px" }}>
              <IconButton onClick={handlePrev} color="info" sx={{ padding: "1px" }} disabled={currentIndex === 0}>
                <ArrowCircleLeftIcon sx={{ cursor: "pointer" }} fontSize="large" />
              </IconButton>
              <IconButton onClick={handleNext} color="info" sx={{ padding: "1px" }} disabled={currentIndex >= playlists.length - visibleCards}>
                <ArrowCircleRightIcon sx={{ cursor: "pointer" }} fontSize="large" />
              </IconButton>
            </Box>

            <Link to={playlists ? `/${playlists[0]?.id}` : "/"}>
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
