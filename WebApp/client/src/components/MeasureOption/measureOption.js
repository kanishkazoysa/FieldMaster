import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";




const YourNewComponent = ({ onBackClick }) => { // Accept onBackClick as a prop
  return (
    <Sidebar>
      
    <div style={{ padding: '10px', position: 'relative' }}>
      <FaArrowLeft onClick={onBackClick} style={{ position: 'absolute', top: 0, left: 0, cursor: 'pointer' }} />
    <p>haerfbh hwgbefhwegbf uieghwfuygwuf  iuwehrfuihwf ihewf</p>
    </div>
    </Sidebar>
  );
};

export default YourNewComponent;