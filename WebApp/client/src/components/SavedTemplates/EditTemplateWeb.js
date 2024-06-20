import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import './EditTemplateStyles.css';
import { FaVectorSquare, FaRegSave } from 'react-icons/fa';
import { RiPieChart2Fill } from 'react-icons/ri';

const EditTemplateWeb = ({ onBackToSidebar }) => {
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

export default EditTemplateWeb;
