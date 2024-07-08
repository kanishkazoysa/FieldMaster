import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExclamationCircle } from 'react-icons/fa'; // Import the alert icon

const handleAlert = () => {
  toast.info(
    <div>
      <p><strong>Select to calculate effort for removing weeds</strong></p>
      <p><strong>Low:</strong>Distributed all over the land in a height below 50cm. Can be removed by laborers. No need for machines.</p>
      <p><strong>Medium</strong>Distributed all over the land in a height below 75cm. Can be removed by laborers. No need for machines.</p>
      <p><strong>Hign</strong>Distributed all over the land. Can't be removed by laborers. Need machines (Backhoe, Excavator).</p>
      
    </div>,
    {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};

const AlertButton = () => {
  return (
    <div>
      <FaExclamationCircle
        onClick={handleAlert}
        style={{ cursor: 'pointer', color: '#007BFF', fontSize: '12px' }} // Adjust icon size and color as needed
      />
      <ToastContainer />
    </div>
  );
};

export default AlertButton;
