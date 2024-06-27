import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import './EditTemplateStyles.css';
import { FaRegSave } from 'react-icons/fa';
import AxiosInstance from '../../AxiosInstance';

const EditTemplateWeb = ({ onBackToSidebar, template, onSaveSuccess }) => {
  const [templateName, setTemplateName] = useState(template.templateName);
  const [landType, setLandType] = useState(template.landType);
  const [description, setDescription] = useState(template.description);

  const handleSave = () => {
    if (
      templateName !== template.templateName ||
      landType !== template.landType ||
      description !== template.description
    ) {
      AxiosInstance.put(
        `/api/auth/mapTemplate/updateTemplate/${template._id}`,
        {
          templateName,
          landType,
          description,
        }
      )
        .then((response) => {
          onSaveSuccess();
          alert('Template updated successfully');
        })
        .catch((error) => {
          console.error('Error updating template:', error);
          alert('Failed to update template');
        });
    } else {
      alert('No changes made to the template');
      onSaveSuccess();
    }
  };

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
          <label className='mn-label bold-text'>Template Name:</label>
          <input
            className='mn-input'
            type='text'
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>
        <div className='mn-block'>
          <label className='mn-label bold-text'>Land Type:</label>
          <input
            className='mn-input'
            type='text'
            value={landType}
            onChange={(e) => setLandType(e.target.value)}
          />
        </div>
        <div className='desc-block'>
          <label className='mn-label bold-text'>Description:</label>
          <textarea
            className='desc-input'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className='save-button-div'>
          <button className='save-button' onClick={handleSave}>
            <FaRegSave />
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTemplateWeb;
