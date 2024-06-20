import React, { useState } from "react";
import { Avatar, Box } from "@mui/material";
import { Divider, Form, Input, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ManageProfileModal = ({ isOpen, onRequestClose, onBack }) => {
  const [setEditProfilePhoto] = useState(false);

  const handleEditProfilePhoto = () => {
    setEditProfilePhoto(true);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalContent}>
      <button style={styles.closeButton} onClick={onRequestClose}>
        ×
      </button>
      <div style={styles.headerContainer}>
      <ArrowLeftOutlined style={styles.backicon} />
      <p style={styles.headtxt}>Manage Your Profile</p>
      </div>
      <Divider style={styles.divider} />
      <div style={styles.content}>
        <div style={styles.avatarContainer}>
          <Avatar
            sx={{ width: 150, height: 150 }}
            src="https://th.bing.com/th/id/OIP.pWAz6MVBo5svuJ09ahjN7gHaEK?rs=1&pid=ImgDetMain"
          />
        </div>
        <div style={styles.userInfo}>
          <h5>Kanishka Zoysa</h5>
          <p style={styles.emailtxt}>kanishkazoysa1234@gmail.com</p>
        </div>
        <Box component="form" style={styles.form}>
          <Form
            layout="vertical"
            style={{ width: "100%",}}
          >
            <Form.Item label="First Name" style={styles.formfeild}>
              <Input placeholder="First Name" style={styles.input} />
            </Form.Item>
            <Form.Item label="Last Name" style={styles.formfeild}>
              <Input placeholder="Last Name" style={styles.input} />
            </Form.Item>
            <Form.Item label="Email" style={styles.formfeild}>
              <Input placeholder="Email" style={styles.input} />
            </Form.Item>
          </Form>
        </Box>

        <Button style={{ marginTop: "10px" }}>Change Password</Button>
        <Button
          type="primary"
          style={{
            marginTop: "20px",
            width: "70%",
          }}
        >
          Update
        </Button>
      </div>
    </div>
  );
};


const styles = {
  modalContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  closeButton: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  emailtxt: {
    color: "#777",
    fontSize: "12px",
    marginTop: "-10px",
  },
  backicon: {
    position: "absolute",
    left: "10px",
    alignItems: "center",
    fontSize: "17px",
    cursor: "pointer",
  },
  headtxt: {
    fontSize: "1rem",
    marginBottom: "-20px",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  divider: {
    color: "#777",
    fontSize: "14px",
    marginTop: "40px",
    borderColor: "#777",
  },
  formfeild: {
    alignItems: "left",
    marginBottom: "8px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  },
  userInfo: {
    marginBottom: "-120px",
    textAlign: "center",
  },
  form: {
    width: "180%",
    marginTop: "120px",
  },
  input: {
    height: "35px",
    padding: "10px",
    width: "100%",
  },
};

export default ManageProfileModal;
