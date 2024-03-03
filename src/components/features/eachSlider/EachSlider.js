import React, { useState, useEffect, useContext } from 'react';
import './eachSlider.css';
import { Card, Col } from 'react-bootstrap';
import { Container } from '../../../App';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AlbumImg from '../AlbumImg';
import { StoreContext } from '../../context/ContextProvider';

const EachSlider = ({ playlists, des }) => {
  const { dispatch, getOne } = useContext(StoreContext);
  const [windowWith, setWindowWith] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWith(window.innerWidth);
    });
  }, [windowWith]);

  let settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.ceil((windowWith - 222) / 236),
    slidesToScroll: Math.ceil((windowWith - 222) / 236),
  };
  
  return (
    <>
      <Container style={{ margin: '40px 0' }}>
        <h2 className='genre-title'>{des}</h2>
        <div className='flex-between'>
          {/* <p>---------------</p> */}
          <hr />
          <Link
            to={playlists ? `/${playlists[0]?.id}` : '/'}
            className='see-all'
          >
            see all
          </Link>
        </div>
        <Slider {...settings}>
          {playlists?.map((item) => {
            return (
              <>
                <Link
                  onClick={() => {
                    dispatch({ type: 'setIsClicked' });
                    getOne(item.id);
                  }}
                  to='/'
                  key={item.id}
                >
                  <Col>
                    <Card className='slider-card'>
                      <div style={{ maxWidth: '200px', borderRadius: '10px' }}>
                        <AlbumImg key={item.id} imgUrl={item.images[0].url} />
                      </div>
                      <Card.Body>
                        <h4 className='slider-card-h4'>{item.name}</h4>
                        <p className='slider-card-p'>{item.description}</p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
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
