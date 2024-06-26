import React from 'react';
import './Card.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

const Card = ({ templateName, location, date, onClick, onDelete, onEdit }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div className='card-container' onClick={onClick}>
      <BiEdit className='edit-icon' onClick={handleEdit} />
      <RiDeleteBin6Line className='delete-icon' onClick={handleDelete} />
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
          <p className='templateLocation'>Location : {location}</p>
          <p className='dateText'>Date : {date}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
