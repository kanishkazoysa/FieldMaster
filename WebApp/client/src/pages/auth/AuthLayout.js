import React from 'react';
import { Carousel } from 'antd';
import './AuthLayout.css';
import sideImg from '../../images/img1.png'

const contentStyle = {
  height: '97vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#fff',
};

const AuthLayout = ({ children }) => {
  const isAuthenticated = false;

  return (
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
        {children}
      </div>
    
  );
};

export default AuthLayout;