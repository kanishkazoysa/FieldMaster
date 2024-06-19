import React from 'react';
import './Card.css';

const Card = ({ templateName, location, date, onClick }) => {
  return (
    <div className='card-container' onClick={onClick}>
      <div className='card-flex'>
        <div className='card-image-container'>
          <img
            src='https://i.ibb.co/9TQd2Bb/map-image.jpg'
            className='card-image'
            alt='mapImg'
          />
        </div>
        <div className='card-content'>
          <div className='templateName'>{templateName}</div>
          <p className='templateLocation'>{location}</p>
          <p className='dateText'>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
