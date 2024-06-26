import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import '../SavedTemplates/SavedTemplatesWeb.css';
import Card from './Card';
import { FaSearch } from 'react-icons/fa';
import AxiosInstance from '../../AxiosInstance';

const SavedTemplatesWeb = ({
  onBackToSidebar,
  onCardClick,
  handleEditTemplateClick,
}) => {
  const [templates, setTemplates] = useState([]);

  const getAllTemplates = () => {
    AxiosInstance.get(`/api/auth/mapTemplate/getAllTemplates`)
      .then((response) => {
        setTemplates(response.data);
        console.log('Templates fetched successfully');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch templates:', error);
      });
  };

  const handleDelete = (deletingTemplate) => {
    AxiosInstance.delete(
      `/api/auth/mapTemplate/deleteTemplate/${deletingTemplate._id}`
    )
      .then(() => {
        alert('Template deleted');
        setTemplates(
          templates.filter((template) => template._id !== deletingTemplate._id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllTemplates();
  }, []);

  return (
    <>
      <div className='innerDiv'>
        <MdArrowBack onClick={onBackToSidebar} className='backBtn' />
        <div className='headingDiv'>
          <div className='search-container'>
            <input
              type='text'
              className='search-bar'
              placeholder='Search your templates'
            />
            <FaSearch className='search-icon' />
          </div>

          <div className='cardsDiv'>
            {templates.map((template) => (
              <Card
                key={template._id}
                templateName={template.templateName}
                location={template.location}
                date={template.date}
                onClick={() => onCardClick(template)}
                onDelete={() => handleDelete(template)}
                onEdit={() => handleEditTemplateClick(template)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedTemplatesWeb;
