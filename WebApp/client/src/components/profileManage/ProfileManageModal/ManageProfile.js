import React from 'react';

const ManageProfileModal = ({ isOpen, onRequestClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onRequestClose}>
          &times;
        </button>
        {/* Render the new modal content here */}
        <div>Manage Profile Modal Content</div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    width: "25%",
    height: "80%",
    padding: "20px",
    position: "relative",
    transform: "scale(1)",
    transition: "transform 3s ease-in-out",
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
};

export default ManageProfileModal;