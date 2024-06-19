import React from 'react';
import { MdArrowBack } from 'react-icons/md';

const TemplateDetails = ({ template, onBack }) => {
  return (
    <div style={{ overflowY: 'auto', height: '100%' }}>
      <MdArrowBack onClick={onBack} className='backBtn' />
      <h1>{template.templateName}</h1>
      <p>{template.location}</p>
      <p>{template.date}</p>
    </div>
  );
};

export default TemplateDetails;
