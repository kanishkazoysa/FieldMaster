import { Avatar } from "antd";
import React, { useEffect } from "react";
import { Button} from 'antd';
import { Divider } from "antd";

const ProfileModal = ({ isOpen, onRequestClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <button style={styles.closeButton} onClick={onRequestClose}>
          &times;
        </button>
        <div style={styles.content}>
        <p>kanishkazoysa1234@gmail.com</p>
        <Divider />
          <Avatar
          size={150}
            style={styles.avatar}
          />
          <h4 style={styles.hellotxt}>Hi, Kanishka!</h4>
          <Button type="primary" style={{marginTop: "40px",padding:"18px",width:"70%",borderRadius:20}}>Manage Your Profile</Button>
          <Button  style={{marginTop: "20px",padding:"18px",width:"70%",borderRadius:20, marginBottom:"10px"}}>Sign Out From Your Account</Button>
          <Divider />
          <p style={styles.bottomtxt}>Privacy Policy . Terms of Services</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(10px)",
    zIndex: 1000,
    opacity: 1,
    transition: "opacity 3s ease-in-out",
  },
  hellotxt: {
    marginTop: "20px",
    fontSize: "1.5rem",
  },
  bottomtxt: {
    position: "absolute",
    bottom:0,
    fontSize: "0.8rem",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
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
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ddd",
    paddingBottom: "10px",
  },
  modalBody: {
    padding: "10px 0",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px", // Change from left to right
  },
};

export default ProfileModal;
