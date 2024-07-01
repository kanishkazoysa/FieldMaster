import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import logo from "../../images/logo.png";
import { Icon } from "@iconify/react";
import { BeatLoader } from "react-spinners";
import {message } from "antd";
import { Tag, Space, Table, Button, Modal, Input, Alert } from "antd";
import ProfileModal from "../../components/profileManage/ProfileModal/ProfileModal";
import AxiosInstance from "../../AxiosInstance";
import Avatar from "../../components/profileManage/ProfileManageModal/Avatar";

function AdminDashboard() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUser, setEditUser] = useState({});
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addUser, setAddUser] = useState({});
    const [user, setUser] = useState({});
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        position: ["bottomCenter"],
    });

    const fetchUsers = async () => {
        try {
            const response = await AxiosInstance.get("/api/users/getAllUsers");
            setUserList(response.data.users);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            message.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEditUserChange = (e) => {
        const { name, value } = e.target;
        setEditUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    const handleVerifyToggle = () => {
        setEditUser((prevUser) => ({
            ...prevUser,
            isVerified: !prevUser.isVerified,
        }));
    };

    const handleEditOk = async () => {
        try {
            const response = await AxiosInstance.post(
                `/api/users/editUser/${editUser._id}`,
                {
                    userId: editUser._id,
                    fname: editUser.fname,
                    lname: editUser.lname,
                    email: editUser.email,
                    isVerified: editUser.isVerified,
                }
            );
            console.log(response);
            fetchUsers();
            message.success("User updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to edit user:", error);
            message.error("Failed to edit user");
        }
    };

    const newUserVerified = () => {
        setAddUser((newUser) => ({
            ...newUser,
            isVerified: true,
        }));
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const handleAvatarClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const showModal = (record) => {
        setEditUser(record);
        console.log(record);
        setIsEditModalOpen(true);
    };
    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };

    const showAddModal = () => {
        setIsAddModalOpen(true);
        setAddUser({
            fname: "",
            lname: "",
            email: "",
            isVerified: false,
        });
    };

    const generatePassword = (length) => {
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const handleAddOk = async () => {
        console.log("Adding user:", addUser);
        try {
            const response = await AxiosInstance.post("/api/users/addUser", {
                fname: addUser.fname,
                lname: addUser.lname,
                email: addUser.email,
                password: generatePassword(8),
                isVerified: addUser.isVerified,
            });
            console.log(response.data);
            fetchUsers();
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Failed to add user:", error.response.data);
            message.error("Failed to add user: " + error.response.data.message);
        }
    };

    const handleAddCancel = () => {
        setIsAddModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        fetchUserDetails(); // Refresh user data when modal closes
      };

    const columns = [
        {
            title: "",
            dataIndex: "profileImage",
            key: "imageUrl",
            render: (_, record) => (
                <Avatar size={35} userData={record}  />
            ),
        },
        {
            title: "First Name",
            dataIndex: "fname",
            key: "fname",
        },
        {
            title: "Last Name",
            dataIndex: "lname",
            key: "lname",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Last Updated",
            key: "updatedAt",
            dataIndex: "updatedAt",
            render: (updatedAt) => {
                const date = new Date(updatedAt);
                const formattedDate = date.toISOString().split("T")[0];
                return formattedDate;
            },
        },
        {
            title: "Status",
            key: "isVerified",
            dataIndex: "isVerified",
            render: (isVerified) => {
                let color = "green";
                let status = "Verified";
                if (!isVerified) {
                    color = "red";
                    status = "Unverified";
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "User Type",
            key: "isAdmin",
            dataIndex: "isAdmin",
            render: (isAdmin) => {
                let color = "red";
                let status = "Admin";
                if (!isAdmin) {
                    status = "User";
                    color = "blue";
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <button
                        style={{
                            fontSize: "20px",
                            color: "#9D9D9D",
                            border: "none",
                            background: "transparent",
                        }}
                        onClick={() => showModal(record)}
                    >
                        <Icon icon="uil:setting" />
                    </button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchUserDetails();
      }, []);
      
      const fetchUserDetails = async () => {
        try {
          const response = await AxiosInstance.get("/api/users/details");
          setUser(response.data.user);
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        }
      };

    return (
        <div>
            {isLoading ? (
                <div className="loader-container">
                    <BeatLoader size={20} color="#007BFF" />
                </div>
            ) : (
                <>
                    <div className="admin-dashboard-header">
                        <div className="logo">
                            <img
                                className="image-admin"
                                src={logo}
                                alt="FIELDMASTER"
                            />
                        </div>
                            <h1 className="admin-dashboard-header-center">Admin Dashboard</h1>
                     
                        <div className="avatar-container"   onClick={handleAvatarClick} >
                        <Avatar 
                        userData={user} 
                        size={50}
                        />
                        </div>
                    </div>
                    <hr />
                    {isModalOpen && (
                        <ProfileModal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            user={user}
                            updateUserInHome={setUser}
                        />
                    )}
                    <div className="admin-dashboard-body">
                        <div className="tableHeaderContainer">
                            <h1>Manage Users</h1>
                            <button onClick={showAddModal}>Add New</button>
                        </div>
                        <Modal
                            title="Add User"
                            visible={isAddModalOpen}
                            onOk={handleAddOk}
                            onCancel={handleAddCancel}
                            width={450}
                        >
                            <div className="user_edit_model">
                                <Input
                                    name="fname"
                                    placeholder="First Name"
                                    value={addUser.fname}
                                    onChange={(e) =>
                                        setAddUser((newUser) => ({
                                            ...newUser,
                                            fname: e.target.value,
                                        }))
                                    }
                                />
                                <Input
                                    name="lname"
                                    placeholder="Last Name"
                                    value={addUser.lname}
                                    onChange={(e) =>
                                        setAddUser((newUser) => ({
                                            ...newUser,
                                            lname: e.target.value,
                                        }))
                                    }
                                />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    value={addUser.email}
                                    onChange={(e) =>
                                        setAddUser((newUser) => ({
                                            ...newUser,
                                            email: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            {addUser.isVerified ? (
                                <Alert
                                    message="User is verified"
                                    type="success"
                                    showIcon
                                />
                            ) : (
                                <Alert
                                    message="Mark As Verified?"
                                    type="error"
                                    action={
                                        <Button
                                            size="small"
                                            danger
                                            onClick={newUserVerified}
                                        >
                                            Verify
                                        </Button>
                                    }
                                />
                            )}
                        </Modal>

                        <Table
                            columns={columns}
                            dataSource={userList}
                            pagination={
                                userList.length > 10 ? pagination : false
                            }
                            onChange={handleTableChange}
                        />
                    </div>
                    <Modal
                        title="Edit User"
                        open={isEditModalOpen}
                        onOk={handleEditOk}
                        onCancel={handleEditCancel}
                        width={450}
                    >
                        <div>
                            <div className="user_edit_model">
                                <Input
                                    name="fname"
                                    placeholder="First Name"
                                    value={editUser.fname}
                                    onChange={handleEditUserChange}
                                />
                                <Input
                                    name="lname"
                                    placeholder="Last Name"
                                    value={editUser.lname}
                                    onChange={handleEditUserChange}
                                />
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    value={editUser.email}
                                    onChange={handleEditUserChange}
                                />
                            </div>
                            {editUser.isVerified ? (
                                <Alert
                                    message="This user is verified"
                                    type="success"
                                    showIcon
                                />
                            ) : (
                                <Alert
                                    message="Do you want to verify this user?"
                                    type="error"
                                    action={
                                        <Button
                                            size="small"
                                            danger
                                            onClick={handleVerifyToggle}
                                        >
                                            Verify
                                        </Button>
                                    }
                                />
                            )}
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
}

export default AdminDashboard;
