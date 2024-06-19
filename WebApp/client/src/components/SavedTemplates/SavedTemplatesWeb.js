import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import '../SavedTemplates/SavedTemplatesWeb.css';
import Card from './Card';
import { FaSearch } from 'react-icons/fa';
import templatesList from './TemplatesList.js'; // import the templatesList

const SavedTemplatesWeb = ({ onBackToSidebar }) => {
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
            {templatesList.map((template, index) => (
              <Card
                key={index}
                templateName={template.templateName}
                location={template.location}
                date={template.date}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedTemplatesWeb;
