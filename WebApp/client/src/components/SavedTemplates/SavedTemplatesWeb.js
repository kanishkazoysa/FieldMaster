import React, { useState } from 'react';
import { MdArrowBack } from 'react-icons/md';
import '../SavedTemplates/SavedTemplatesWeb.css';
import Card from './Card';
import { FaSearch } from 'react-icons/fa';
import templatesList from './TemplatesList.js';
import TemplateDetails from './TemplateDetails.js';

const SavedTemplatesWeb = ({ onBackToSidebar }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleCardClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleBack = () => {
    setSelectedTemplate(null);
  };

  return (
    <>
      <div className='innerDiv'>
        {!selectedTemplate && (
          <MdArrowBack onClick={onBackToSidebar} className='backBtn' />
        )}
        <div className='headingDiv'>
          {selectedTemplate ? (
            <TemplateDetails template={selectedTemplate} onBack={handleBack} />
          ) : (
            <>
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
                    onClick={() => handleCardClick(template)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default SavedTemplatesWeb;
