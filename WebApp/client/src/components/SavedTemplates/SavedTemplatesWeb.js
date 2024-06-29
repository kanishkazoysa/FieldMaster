import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import '../SavedTemplates/SavedTemplatesWeb.css';
import Card from './Card.js';
import { FaSearch } from 'react-icons/fa';
import AxiosInstance from '../../AxiosInstance';
import { message } from 'antd';

const SavedTemplatesWeb = ({
  onBackToSidebar,
  onCardClick,
  handleEditTemplateClick,
}) => {
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        message.success('Template deleted successfully');
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTemplates = templates.filter((template) =>
    template.templateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className='innerDiv'>
        <div className='backBtnDiv'>
          <MdArrowBack onClick={onBackToSidebar} className='backBtn' />
        </div>
        <div className='headingDiv'>
          <div className='search-container'>
            <input
              type='text'
              className='search-bar'
              placeholder='Search your templates'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch className='search-icon' />
          </div>

          <div className='cardsDiv'>
            {filteredTemplates.map((template) => (
              <Card
                key={template._id}
                templateName={template.templateName}
                location={template.location}
                date={template.date}
                capturedImageBase64={template.capturedImageBase64}
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
