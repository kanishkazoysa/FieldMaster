import React, { useState } from 'react';
import { Avatar, Button, Box, TextField } from '@mui/material';

const ManageProfileModal = ({ isOpen, onRequestClose, onBack }) => {
  const [editProfilePhoto, setEditProfilePhoto] = useState(false);

  const handleEditProfilePhoto = () => {
    setEditProfilePhoto(true);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalContent}>
      <button style={styles.closeButton} onClick={onRequestClose}>
        ×
      </button>
      <div style={styles.content}>
        <div style={styles.avatarContainer}>
          <Avatar
            sx={{ width: 150, height: 150 }}
            src="https://th.bing.com/th/id/OIP.pWAz6MVBo5svuJ09ahjN7gHaEK?rs=1&pid=ImgDetMain"
          />
          <Button variant="text" onClick={handleEditProfilePhoto}>
            Edit Profile Photo
          </Button>
        </div>
        <div style={styles.userInfo}>
          <p>Kanishka Zoysa</p>
          <p>kanishkazoysa1234@gmail.com</p>
        </div>
        <Box component="form" style={styles.form}>
          <TextField
            label="First Name"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              inputProps: {
                style: { height: '20px', padding: '-10px' },
              },
            }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              inputProps: {
                style: { height: '50px', padding: '10px' },
              },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              inputProps: {
                style: { height: '50px', padding: '10px' },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              inputProps: {
                style: { height: '50px', padding: '10px' },
              },
            }}
          />
          <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
            Update
          </Button>
        </Box>
        <Button variant="contained" color="primary" onClick={onBack} style={{ marginTop: '16px' }}>
          Back
        </Button>
      </div>
    </div>
  );
};

const styles = {
  modalContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  userInfo: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    width: '60%',
  },
};

export default ManageProfileModal;