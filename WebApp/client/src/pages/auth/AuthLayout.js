import { Carousel } from 'antd';
import React from 'react';
import sideimg1 from '../../images/sideimg1.png';
import sideimg2 from '../../images/sideimg2.png';
import sideimg3 from '../../images/sideimg3.png';
import './AuthLayout.css';

const contentStyle = {
  height: '97vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#fff',
};

const AuthLayout = ({ children }) => {

  return (
      <div className="carousel-container">
        <Carousel autoplay>
          <div>
            <img src={sideimg1} alt="Slide 1" style={contentStyle} />
          </div>
          <div>
            <img src={sideimg2} alt="Slide 2" style={contentStyle} />
          </div>
          <div>
            <img src={sideimg3} alt="Slide 3" style={contentStyle} />
          </div>
        </Carousel>
        {children}
      </div>
    
  );
};

export default AuthLayout;