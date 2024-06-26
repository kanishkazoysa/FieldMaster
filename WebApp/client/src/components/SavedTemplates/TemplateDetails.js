import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import { PiPlantFill } from 'react-icons/pi';
import { GiAxeInStump, GiWoodenFence } from 'react-icons/gi';
import './TemplateDetails.css';
import { TbContainer } from 'react-icons/tb';
import { HiChartPie } from 'react-icons/hi2';
import { TbVector } from 'react-icons/tb';
import { ImLocation2 } from 'react-icons/im';
import Fence from '../Fence/Fence/fence';
import FenceDetails from '../Fence/FenceDetails/fenceDetails';
import Plantation from '../Plantation/PlantationPage/plantation';
import PlantationDetails from '../Plantation/PlantationDetails/plantationDetails';
import AxiosInstance from '../../AxiosInstance';

const TemplateDetails = ({
  onBackToSidebar,
  template,
  onEditTemplateClick,
}) => {
  const id = template._id
  const [currentPage, setCurrentPage] = useState(null);
  const [animatePage, setAnimatePage] = useState(false);

  const handleBackClick = () => {
    setAnimatePage(false);
    setTimeout(() => {
      setCurrentPage(null);
    }, 300);
  };

  const checkIdFence = async (id) => {
    try {
      const response = await AxiosInstance.get(`/api/fence/check-id/${id}`);
      if (response.data.exists) {
        console.log('ID exists');
        setCurrentPage("FenceDetails"); // Updated to FenceDetails for existing ID
        setAnimatePage(true);
      } else {
        console.log('ID does not exist');
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log('ID not found');
        setCurrentPage("Fence"); // Updated to Fence for 404 error
        setAnimatePage(true);
      } else {
        console.error('Error checking ID:', error);
      }
    }
  };

  const checkIdPlantation = async (id) => {
    try {
      const response = await AxiosInstance.get(`/api/plantation/check-id/${id}`);
      if (response.data.exists) {
        console.log('ID exists');
        setCurrentPage("PlantationDetails"); // Updated to PlantationDetails for existing ID
        setAnimatePage(true);
      } else {
        console.log('ID does not exist');
      }
    } catch (error) {
      // Handle error, maybe show a message to the user
      if (error.response.status === 404) {
        console.log('ID not found');
        setCurrentPage("Plantation"); // Updated to Plantation for 404 error
        setAnimatePage(true);
      } else {
        console.error('Error checking ID:', error);
      }
    }
  };

  return (
    <div>
      {!currentPage && (
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
                <BiEdit className='edit-icon' onClick={onEditTemplateClick} />
              </div>
            </div>
            <div className='div-02'>
              <img
                src='https://i.ibb.co/9TQd2Bb/map-image.jpg'
                alt='mapImage'
                className='map-img'
              />
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
                <button className='circle-div circle-div-2'onClick={() => checkIdPlantation(template._id)}>
                  <PiPlantFill className='icon' />
                </button>
                <p>Plantation</p>
              </div>
              <div className='icon-container'>
                <button className='circle-div circle-div-3' onClick={() => checkIdFence(template._id)}>
                    <GiWoodenFence className='icon' />
                </button>
                <p>Fence setup</p>
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
              <div className='description-div'>
                <p className='bold-text'>Description</p>
                <p className='description-text'>{template.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          transform: animatePage ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          backgroundColor: 'whitesmoke',
          overflow: 'auto', 
        }}
      >
        {currentPage === 'Fence' && (
          <Fence
            onBackToSidebar={onBackToSidebar}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick = {onEditTemplateClick}
            template = {template}
          />
        )}
        {currentPage === 'Plantation' && (
          <Plantation
            onBackToSidebar={onBackToSidebar}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick = {onEditTemplateClick}
            template = {template}
          />
        )}
        {currentPage === 'FenceDetails' && (
          <FenceDetails
            onBackToSidebar={onBackToSidebar}
            onback = {handleBackClick}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick = {onEditTemplateClick}
            template = {template}
          />
        )}
        {currentPage === 'PlantationDetails' && (
          <PlantationDetails
            onBackToSidebar={onBackToSidebar}
            onback = {handleBackClick}
            id={template._id}
            area={template.area}
            Perimeter={template.perimeter}
            onEditTemplateClick = {onEditTemplateClick}
            template = {template}
          />
        )}
      </div>
    </div>
  );
};

export default TemplateDetails;
