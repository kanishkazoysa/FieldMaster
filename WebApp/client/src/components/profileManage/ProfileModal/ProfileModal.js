import React, { useState, useEffect } from 'react';
import { Avatar, Button, Divider } from 'antd';
import ManageProfileModal from '../ProfileManageModal/ManageProfile';

const ProfileModal = ({ isOpen, onRequestClose }) => {
  const [showManageProfileModal, setShowManageProfileModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleManageProfileClick = () => {
    setShowManageProfileModal(true);
  };

  const handleCloseManageProfileModal = () => {
    setShowManageProfileModal(false);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div
        style={
          showManageProfileModal
            ? { ...styles.modal, ...styles.modalSlideOut }
            : styles.modal
        }
      >
        {!showManageProfileModal && (
          <>
            <button style={styles.closeButton} onClick={onRequestClose}>
              ×
            </button>
            <div style={styles.content}>
              <p>kanishkazoysa1234@gmail.com</p>
              <Divider />
              <Avatar
                size={150}
                style={styles.avatar}
                src="https://th.bing.com/th/id/OIP.pWAz6MVBo5svuJ09ahjN7gHaEK?rs=1&pid=ImgDetMain"
              />
              <Divider />
              <h4 style={styles.hellotxt}>Hi, Kanishka!</h4>
              <Button
                type="primary"
                style={{
                  marginTop: '40px',
                  padding: '18px',
                  width: '70%',
                  borderRadius: 20,
                }}
                onClick={handleManageProfileClick}
              >
                Manage Your Profile
              </Button>
              <Button
                style={{
                  marginTop: '20px',
                  padding: '18px',
                  width: '70%',
                  borderRadius: 20,
                  marginBottom: '10px',
                }}
              >
                Sign Out From Your Account
              </Button>
              <Divider />
              <p style={styles.bottomtxt}>Privacy Policy . Terms of Services</p>
            </div>
          </>
        )}
      </div>
      <div
        style={
          showManageProfileModal
            ? { ...styles.manageModal, ...styles.modalSlideIn }
            : { ...styles.manageModal, ...styles.modalSlideOut }
        }
      >
        {showManageProfileModal && (
          <ManageProfileModal
            isOpen={showManageProfileModal}
            onRequestClose={handleCloseManageProfileModal}
            onBack={handleCloseManageProfileModal}
          />
        )}
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
    width: '25%', // Adjust the width as needed
    height: '80%',
    padding: '20px',
    position: 'absolute',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(0)',
  },
  modalSlideOut: {
    transform: 'translateX(100vw)',
  },
  manageModal: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
    width: '30%', // Increase the width for the ManageProfileModal
    height: '90%',
    padding: '20px',
    position: 'absolute',
    transition: 'transform 0.3s ease-in-out',
    transform: 'translateX(-100vw)',
  },
  modalSlideIn: {
    transform: 'translateX(0)',
  },
  hellotxt: {
    fontSize: '1.5rem',
  },
  bottomtxt: {
    position: 'absolute',
    bottom: 0,
    fontSize: '0.8rem',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {},
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

export default ProfileModal;