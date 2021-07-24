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
    slidesToShow: Math.ceil((windowWith - 222) / 236),
    slidesToScroll: Math.ceil((windowWith - 222) / 236),
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
          }}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            quasi!
          </p>
          <Link
            to={allUs ? `/${allUs[0].id}` : '/'}
            style={{
              backgroundColor: 'rgb(0 179 54)',
              height: 'fit-content',
              padding: ' 6px 24px',
              borderRadius: '5px',
              boxShadow: '1px 1px 15px black',
            }}
          >
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
                    <Card
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '10px',
                        margin: '0 10px ',
                        backgroundColor: '#4e4d4d',
                      }}
                    >
                      <div style={{ maxWidth: '200px', borderRadius: '10px' }}>
                        <AlbumImg key={item.id} imgUrl={item.images[0].url} />
                      </div>
                      <Card.Body>
                        <h4
                          style={{
                            color: 'white',
                            margin: '10px 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            webkitLineClamp: '1',
                            webkitBoxOrient: 'vertical',
                            cursor: 'pointer',
                          }}
                        >
                          {item.name}
                        </h4>
                        <p
                          style={{
                            fontWeight: '200',
                            fontSize: '15px',
                            marginBottom: '10px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            webkitLineClamp: '2',
                            webkitBoxOrient: 'vertical',
                            cursor: 'pointer',
                          }}
                        >
                          {item.description}
                        </p>
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
