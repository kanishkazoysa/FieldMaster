import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Divider, Form, Input, Button, Upload, message } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import logo from "../../../images/logo.png";
import Avatar from "./Avatar"; // Import the new Avatar component
import AxiosInstance from "../../../AxiosInstance";

const ManageProfileModal = ({
  isOpen,
  onRequestClose,
  onBack,
  user,
  onUpdate,
}) => {
  const [fname, setFname] = useState(user.fname);
  const [lname, setLname] = useState(user.lname);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);

  

  const handleImageChange = (info) => {
    console.log('Upload event:', info);
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImage({ file: file, preview: previewURL });
        console.log('Image selected:', file);
      } else {
        console.log('No file selected');
      }
    }
  };

  const handleRemoveImage = () => {
    if (image && image.preview) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
  };

  useEffect(() => {
    console.log("Image state updated:", image);
  }, [image]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("user", JSON.stringify({ fname, lname, email }));

    console.log("Image state:", image);

    if (image && image.file) {
      formData.append("photo", image.file, image.file.name);
      console.log("Image file appended:", image.file);
    } else {
      console.log("No image file to append");
    }

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      console.log("Sending request to update profile");
      const response = await AxiosInstance.post(
        "/api/users/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server response:", response.data);

      if (response.data.success) {
        message.success("Profile updated successfully");
        onUpdate({
          ...response.data.user,
          imageUrl:
            response.data.user.imageUrl || (image ? image.preview : null),
        });
        onRequestClose();
      } else {
        message.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("An error occurred while updating the profile");
    }
  };

  useEffect(() => {
    console.log('Image state updated:', image);
  }, [image]);

  if (!isOpen) return null;

  return (
    <div style={styles.modalContent}>
      <button style={styles.closeButton} onClick={onRequestClose}>
        ×
      </button>
      <div style={styles.headerContainer}>
        <ArrowLeftOutlined style={styles.backicon} onClick={onBack} />
        <img
          src={logo}
          alt="profile"
          style={{ width: "100px", height: "40px", marginBottom: "-20px" }}
        />
      </div>
      <Divider style={styles.divider} />
      <div style={styles.content}>
        <div style={styles.avatarContainer}>
        <Upload
        accept="image/*"
        showUploadList={false}
        customRequest={({ file, onSuccess }) => {
          setTimeout(() => {
            onSuccess("ok");
          }, 0);
        }}
        onChange={handleImageChange}
      >
        <Avatar 
          userData={user} 
          image={image ? image.preview : null} 
          size={150} 
        />
        <EditOutlined style={styles.editIcon} />
      </Upload>
        </div>
        <div style={styles.userInfo}>
          <h5>
            {user.fname} {user.lname}
          </h5>
          <p style={styles.emailtxt}>{user.email}</p>
        </div>
        <Box component="form" style={styles.form}>
          <Form layout="vertical" style={{ width: "100%" }}>
            <Form.Item label="First Name" style={styles.formfeild}>
              <Input
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                style={styles.input}
              />
            </Form.Item>
            <Form.Item label="Last Name" style={styles.formfeild}>
              <Input
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                style={styles.input}
              />
            </Form.Item>
            <Form.Item label="Email" style={styles.formfeild}>
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={styles.input}
              />
            </Form.Item>
          </Form>
        </Box>

        {image && (
          <Button onClick={handleRemoveImage} style={{ marginTop: "10px" }}>
            Remove Profile Picture
          </Button>
        )}
        <Button style={{ marginTop: "10px" }}>Change Password</Button>
        <Button
          type="primary"
          onClick={handleUpdate}
          style={{ marginTop: "20px", width: "70%" }}
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
    fontSize: "17px",
    top: "30px",
    cursor: "pointer",
  },
  editIcon: {
    position: "absolute",
    top: "37%",
    right: "34%",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
    padding: "5px",
    borderRadius: "50%",
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
    marginTop: "110px",
  },
  input: {
    height: "35px",
    padding: "10px",
    width: "100%",
  },
};

export default ManageProfileModal;
