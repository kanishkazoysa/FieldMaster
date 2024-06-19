import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { PiPlantFill } from 'react-icons/pi';
import { GiAxeInStump, GiWoodenFence } from 'react-icons/gi';
import './TemplateDetails.css';

const TemplateDetails = ({ onBackToSidebar, template }) => {
  return (
    <>
      <div className='main-div'>
        <MdArrowBack onClick={onBackToSidebar} className='backBtn' />
        <div className='outer-div'>
          <div className='div-01'>
            <div className='column details'>
              <p className='templateName-text'>{template.templateName}</p>
              <p>{template.location}</p>
              <p>{template.date}</p>
            </div>
            <div className='column edit-icon-container'>
              <BiEdit className='edit-icon' />
            </div>
          </div>
          <div className='div-02'>
            <img
              src='https://i.ibb.co/9TQd2Bb/map-image.jpg'
              alt='mapImage'
              className='map-img'
            ></img>
            <button className='manage-land-btn'>
              <p>Manage Land</p>
            </button>
            <hr className='breaker' />
          </div>
          <div className='div-03'>
            <div className='icon-container'>
              <div className='circle-div circle-div-1'>
                <GiAxeInStump className='icon' />
              </div>
              <p>Clear Land</p>
            </div>
            <div className='icon-container'>
              <div className='circle-div circle-div-2'>
                <PiPlantFill className='icon' />
              </div>
              <p>Plantation</p>
            </div>
            <div className='icon-container'>
              <div className='circle-div circle-div-3'>
                <GiWoodenFence className='icon' />
              </div>
              <p>Fence setup </p>
            </div>
          </div>
          <hr className='breaker' />
          <div className='div-04'>
            <p className='bold-text'>Land Info</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateDetails;
