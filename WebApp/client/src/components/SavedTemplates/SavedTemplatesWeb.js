import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import '../SavedTemplates/SavedTemplatesWeb.css';
import Card from './Card';
import { FaSearch } from 'react-icons/fa';
import AxiosInstance from '../../AxiosInstance';

const SavedTemplatesWeb = ({ onBackToSidebar, onCardClick }) => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`/api/auth/mapTemplate/getAllTemplates`)
      .then((response) => {
        setTemplates(response.data);
        console.log('Templates fetched successfully');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch templates:', error);
      });
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
            {templates.map((template, index) => (
              <Card
                key={index}
                templateName={template.templateName}
                location={template.location}
                date={template.date}
                onClick={() => onCardClick(template)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedTemplatesWeb;
