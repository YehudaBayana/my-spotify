import React, { useState, useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Container } from '../../App';
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
    slidesToShow: Math.floor(windowWith / 236),
    slidesToScroll: Math.floor(windowWith / 236),
  };
  return (
    <>
      <Container style={{ margin: '40px 0' }}>
        <h2>{des}</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px auto',
            // padding: '0 20px',
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            quasi!
          </p>
          <Link
            // to='/'
            to={allUs ? `/${allUs[0].id}` : '/'}
            style={{
              backgroundColor: '#6fc1ff',
              height: 'fit-content',
              padding: ' 6px 24px',
              borderRadius: '5px',
              boxShadow: '1px 1px 15px lightgrey',
            }}
          >
            see all
          </Link>
        </div>
        <Slider {...settings}>
          {allUs?.map(function (item) {
            return (
              <>
                <Link to='/' key={item.id}>
                  <Col>
                    <Card
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <div style={{ width: '200px' }}>
                        <AlbumImg
                          key={item.id}
                          setIsClicked={setIsClicked}
                          imgUrl={item.images[0].url}
                          getOne={() => getOne(item.id)}
                        />
                      </div>
                      <Card.Body>
                        <span>{item.name}</span>
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
              </>
            );
          })}
        </Slider>
      </Container>
      <hr />
    </>
  );
};

export default EachSlider;
