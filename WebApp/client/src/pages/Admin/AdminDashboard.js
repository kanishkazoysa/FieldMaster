import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";
import logo from "../../images/logo.png";
import { Icon } from "@iconify/react";
import { Avatar } from "antd";
import { Tag, Space, Table } from "antd";
import ProfileModal from "../../components/profileManage/ProfileModal/ProfileModal";
import AxiosInstance from "../../AxiosInstance";

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [userList, setUserList] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    position: ["bottomCenter"],
  });

  const fetchUsers = async () => {
    try {
      const response = await AxiosInstance.get("/api/users/getAllUsers");
      setUserList(response.data.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleAvatarClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const showModal = (record) => {
    console.log(record);
  };

  const columns = [
    {
      title: "",
      dataIndex: "profileImage",
      key: "imageUrl",
      render: (_, record) => (
        <Avatar size={35} src={record.imageUrl} alt="imageUrl" />
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

  return (
    <div>
      <div className="admin-dashboard-header">
        <div className="logo">
          <img className="image-admin" src={logo} alt="FIELDMASTER" />
        </div>
        <div className="avatar-container">
          <Avatar size={50} onClick={handleAvatarClick} />
        </div>
      </div>
      <hr />
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
      <div className="admin-dashboard-body">
        <div className="tableHeaderContainer">
          <h1>Manage Users</h1>
          <button>Add New</button>
        </div>
        <Table
          columns={columns}
          dataSource={userList}
          pagination={userList.length > 10 ? pagination : false}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
