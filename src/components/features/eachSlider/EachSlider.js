import React, { useState, useEffect } from 'react';
import './eachSlider.css';
import { Card, Col } from 'react-bootstrap';
import { Container } from '../../../App';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EachSlider = ({ allUs, AlbumImg, getOne, setIsClicked, des }) => {
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
        <h2>{des}</h2>
        <div className='flex-between'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            quasi!
          </p>
          <Link to={allUs ? `/${allUs[0].id}` : '/'} className='see-all'>
            see all
          </Link>
        </div>
        <Slider {...settings}>
          {allUs?.map((item) => {
            return (
              <>
                <Link
                  onClick={() => {
                    setIsClicked((old) => !old);
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
