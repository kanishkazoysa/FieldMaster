import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { PiPlantFill } from 'react-icons/pi';
import { GiAxeInStump, GiWoodenFence } from 'react-icons/gi';
import './TemplateDetails.css';
import { TbContainer } from 'react-icons/tb';
import { HiChartPie } from 'react-icons/hi2';
import { TbVector } from 'react-icons/tb';
import { ImLocation2 } from 'react-icons/im';

const TemplateDetails = ({
  onBackToSidebar,
  template,
  onEditTemplateClick,
}) => {
  return (
    <>
      <div className='main-div'>
        <div className='outer-div'>
          <div className='div-01'>
            <MdArrowBack onClick={onBackToSidebar} className='backBtn' />
            <p className='templateName-text'>{template.templateName}</p>
            <div className='edit-icon-container'>
              <BiEdit className='edit-icon' onClick={onEditTemplateClick} />
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
            <div className='info-grid'>
              <div className='info-container'>
                <TbContainer className='info-icon' />
                <div>
                  <p>Type</p>
                  <p className='bold-text'>{template.landType}</p>
                </div>
              </div>
              <div className='info-container'>
                <HiChartPie className='info-icon' />
                <div>
                  <p>Area</p>
                  <p className='bold-text'>{template.area}</p>
                </div>
              </div>
              <div className='info-container'>
                <TbVector className='info-icon' />
                <div>
                  <p>Perimeter</p>
                  <p className='bold-text'>{template.perimeter}</p>
                </div>
              </div>
              <div className='info-container'>
                <ImLocation2 className='info-icon' />
                <div>
                  <p>Location</p>
                  <p className='bold-text'>{template.location}</p>
                </div>
              </div>
            </div>
            <hr className='breaker' />
            <div className='description-div'>
              <p className='bold-text'>Description</p>
              <p className='description-text'>{template.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateDetails;
