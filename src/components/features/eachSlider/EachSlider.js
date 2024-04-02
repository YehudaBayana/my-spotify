import React, { useState, useEffect, useContext } from 'react';
import './eachSlider.css';
import { Container } from '../../../App';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AlbumImg from '../AlbumImg';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { StoreContext } from '../../context/ContextProvider';
import Card from '../card/Card';
import { useRef } from 'react';
import { Box, Grid, Paper } from '@mui/material';


const EachSlider = ({ playlists, des }) => {
  let sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();

  };
  const previous = () => {
    sliderRef.slickPrev();

  };

  const [windowWith, setWindowWith] = useState(window.innerWidth);
  const [playlistAmount, setPlaylistAmount] = useState();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  let settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.ceil((windowWith - 222) / 236),
    slidesToScroll: Math.ceil((windowWith - 222) / 236),
  };

  return (
    <>
      <Container style={{ margin: '40px 0' }}>
        <h2 className="genre-title">{des}</h2>
        <div className="flex-between">
          <Box sx={{margin:"0 10px"}}>
            <ArrowCircleLeftIcon color='secondary' sx={{cursor:"pointer"}} fontSize="large" onClick={previous} />
            <ArrowCircleRightIcon sx={{cursor:"pointer"}} fontSize="large" onClick={next} />
          </Box>
          <Link to={playlists ? `/${playlists[0]?.id}` : '/'} className="see-all">
            see all
          </Link>
        </div>
        <Slider
        centerPadding='10px'
          ref={(slider) => {
            console.log("slider ",slider);
            sliderRef = slider;
          }}
          swipe={false}
          {...settings}>
          {playlists?.map((item) => {
            return (
              <>
                {/* <Link
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  to={`/tracks/${item.id}`}
                  key={item.id}
                > */}
                <Card playlistDetails={item} />
                {/* </Link> */}
              </>
            );
          })}
        </Slider>
      </Container>
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
//   const { dispatch, getOne } = useContext(StoreContext);
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
//                     // getOne(item.id);
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
