import React from 'react';
import { Carousel } from 'antd';
import './AuthLayout.css';
import sideImg from './img1.png'; // Import your image

const contentStyle = {
  height: '92vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#fff',
};

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <div className="background">
      <div className="carousel-container">
        <Carousel autoplay>
          <div>
            <img src={sideImg} alt="Slide 1" style={contentStyle} />
          </div>
          <div>
            <img src={sideImg} alt="Slide 2" style={contentStyle} />
          </div>
          <div>
            <img src={sideImg} alt="Slide 3" style={contentStyle} />
          </div>
          <div>
            <img src={sideImg} alt="Slide 4" style={contentStyle} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AuthLayout;