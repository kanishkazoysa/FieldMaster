import React, { useEffect } from 'react';
import Avatar from './Avatar';

const ProfileModal = ({ isOpen, onRequestClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
    <div style={styles.modal}>
    <Avatar
      style={{
        backgroundColor: '#87d068',
        position: 'absolute',
        right: '12%',
        top: '2.5%',
      }}
    />
        <div style={styles.modalHeader}>
          <h2>Profile Modal</h2>
          <button style={styles.closeButton} onClick={onRequestClose}>
            &times;
          </button>
        </div>
        <div style={styles.modalBody}>
          <p>This is the profile modal content.</p>
        </div>
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
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    opacity: 1,
    transition: 'opacity 3s ease-in-out',
  },
  modal: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
    width: '80%',
    maxWidth: '500px',
    padding: '20px',
    position: 'relative',
    transform: 'scale(1)',
    transition: 'transform 3s ease-in-out',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
  },
  modalBody: {
    padding: '10px 0',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
};

export default ProfileModal;
