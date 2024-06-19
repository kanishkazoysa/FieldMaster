import React from 'react';
import { MdArrowBack } from 'react-icons/md';

const TemplateDetails = ({ onBackToSidebar, template }) => {
  return (
    <>
      <div>
        <MdArrowBack onClick={onBackToSidebar} className='backBtn' />
        <p>{template.templateName}</p>
        <p>{template.location}</p>
        <p>{template.date}</p>
      </div>
    </>
  );
};

export default TemplateDetails;
