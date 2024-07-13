import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import AxiosInstance from "../../AxiosInstance";

const UserMapsTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await AxiosInstance.get("/api/users/getAllUsers");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserMaps = async (userId) => {
    try {
      const response = await AxiosInstance.get(`/api/auth/mapTemplate/getAllTemplates/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user maps:", error);
      return [];
    }
  };

  const fetchMapDetails = async (mapId) => {
    try {
      const response = await AxiosInstance.get(`/api/auth/mapTemplate/getAllmapData/${mapId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching map details:", error);
      return null;
    }
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Number of Maps', dataIndex: 'numberOfMaps', key: 'numberOfMaps' },
  ];

  const expandedRowRender = (record) => {
    const mapColumns = [
      { title: 'Template Name', dataIndex: 'templateName', key: 'templateName' },
      { title: 'Land Type', dataIndex: 'landType', key: 'landType' },
      { title: 'Area', dataIndex: 'area', key: 'area' },
      { title: 'Location', dataIndex: 'location', key: 'location' },
      { title: 'Perimeter', dataIndex: 'perimeter', key: 'perimeter' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
    ];

    return (
      <Table
        columns={mapColumns}
        dataSource={record.maps}
        pagination={false}
        expandable={{
          expandedRowRender: (mapRecord) => {
            const detailColumns = [
              { title: 'Detail Type', dataIndex: 'detailType', key: 'detailType' },
              { 
                title: 'Details', 
                dataIndex: 'details', 
                key: 'details',
                render: (text) => <pre>{text}</pre>
              },
            ];

            const detailData = [
              { key: 1, detailType: 'Fence Details', details: JSON.stringify(mapRecord.details?.fenceDetails, null, 2) },
              { key: 2, detailType: 'Plantation Details', details: JSON.stringify(mapRecord.details?.plantationDetails, null, 2) },
              { key: 3, detailType: 'Clear Land Details', details: JSON.stringify(mapRecord.details?.clearLandDetails, null, 2) },
            ];

            return <Table columns={detailColumns} dataSource={detailData} pagination={false} />;
          },
          onExpand: async (expanded, mapRecord) => {
            if (expanded && !mapRecord.details) {
              const details = await fetchMapDetails(mapRecord._id);
              setUsers(prevUsers => 
                prevUsers.map(user => ({
                  ...user,
                  maps: user.maps?.map(map => 
                    map._id === mapRecord._id ? { ...map, details } : map
                  )
                }))
              );
            }
          },
          rowExpandable: (record) => true,
        }}
      />
    );
  };

  return (
    <div className="user-maps-table">
      <h3>User Maps</h3>
      <Table
        columns={columns}
        dataSource={users.map(user => ({
          key: user._id,
          name: `${user.fname} ${user.lname}`,
          email: user.email,
          numberOfMaps: user.maps ? user.maps.length : 0,
          maps: user.maps,
        }))}
        expandable={{
          expandedRowRender,
          onExpand: async (expanded, record) => {
            if (expanded && (!record.maps || record.maps.length === 0)) {
              const userMaps = await fetchUserMaps(record.key);
              setUsers(prevUsers => 
                prevUsers.map(user => 
                  user._id === record.key ? { ...user, maps: userMaps.map(map => ({ ...map, key: map._id })) } : user
                )
              );
            }
          },
        }}
      />
    </div>
  );
};

export default UserMapsTable;