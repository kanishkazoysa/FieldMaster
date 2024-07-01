import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import './SaveScreenWebStyles.css';
import { FaVectorSquare } from 'react-icons/fa6';
import { RiPieChart2Fill } from 'react-icons/ri';
import { FaRegSave } from 'react-icons/fa';

const SaveScreenWeb = ({ onBackToSidebar }) => {
  return (
    <div className='outer-div'>
      <div className='save-screen'>
        <div className='save-screen-header'>
          <MdArrowBack
            onClick={() => {
              console.log('clicked back btn');
              onBackToSidebar();
            }}
            size={20}
            className='backBtn'
          />
        </div>
        <div className='land-info-div'>
          <p className='bold-text'>Land info</p>
          <div className='info-blocks'>
            <div className='info-block'>
              <FaVectorSquare className='info-icon' />
              <div>
                <p>Perimeter</p>
                <p className='bold-text'>1.5km</p>
              </div>
            </div>
            <div className='info-block'>
              <RiPieChart2Fill className='info-icon' />
              <div>
                <p>Area</p>
                <p className='bold-text'>100 acres</p>
              </div>
            </div>
          </div>
        </div>
        <div className='mn-block'>
          <label className='mn-label bold-text'>Measure Name:</label>
          <input className='mn-input' type='text' />
        </div>
        <div className='mn-block'>
          <label className='mn-label bold-text'>Land Type:</label>
          <input className='mn-input' type='text' />
        </div>
        <div className='desc-block'>
          <label className='mn-label bold-text'>Description:</label>
          <textarea className='desc-input' />
        </div>
        <div className='save-button-div'>
          <button className='save-button'>
            <FaRegSave />
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveScreenWeb;
