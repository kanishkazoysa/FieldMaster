import React, { useState, useEffect } from 'react';
import AxiosInstance from "../../AxiosInstance";

const UserMapsTable = () => {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);
  const [expandedMap, setExpandedMap] = useState(null);

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

  const handleUserClick = async (userId) => {
    if (expandedUser === userId) {
      setExpandedUser(null);
      setExpandedMap(null);
    } else {
      const userMaps = await fetchUserMaps(userId);
      setExpandedUser(userId);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, maps: userMaps } : user
      ));
    }
  };

  const handleMapClick = async (mapId) => {
    if (expandedMap === mapId) {
      setExpandedMap(null);
    } else {
      try {
        const response = await AxiosInstance.get(`/api/auth/mapTemplate/getAllmapData/${mapId}`);
        setExpandedMap(mapId);
        setUsers(users.map(user => {
          if (user._id === expandedUser) {
            return {
              ...user,
              maps: user.maps.map(map => 
                map._id === mapId ? { ...map, details: response.data } : map
              )
            };
          }
          return user;
        }));
      } catch (error) {
        console.error("Error fetching map details:", error);
      }
    }
  };

  return (
    <div className="user-maps-table">
      <h3>User Maps</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Number of Maps</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <React.Fragment key={user._id}>
              <tr onClick={() => handleUserClick(user._id)}>
                <td>{`${user.fname} ${user.lname}`}</td>
                <td>{user.email}</td>
                <td>{user.maps ? user.maps.length : 0}</td>
              </tr>
              {expandedUser === user._id && user.maps && (
                <tr>
                  <td colSpan="3">
                    <table>
                      <thead>
                        <tr>
                          <th>Template Name</th>
                          <th>Land Type</th>
                          <th>Area</th>
                          <th>Location</th>
                          <th>Perimeter</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.maps.map(map => (
                          <React.Fragment key={map._id}>
                            <tr onClick={() => handleMapClick(map._id)}>
                              <td>{map.templateName}</td>
                              <td>{map.landType}</td>
                              <td>{map.area}</td>
                              <td>{map.location}</td>
                              <td>{map.perimeter}</td>
                              <td>{map.description}</td>
                            </tr>
                            {expandedMap === map._id && map.details && (
                              <tr>
                                <td colSpan="6">
                                  <div>
                                    <h5>Fence Details</h5>
                                    <pre>{JSON.stringify(map.details.fenceDetails, null, 2)}</pre>
                                    <h5>Plantation Details</h5>
                                    <pre>{JSON.stringify(map.details.plantationDetails, null, 2)}</pre>
                                    <h5>Clear Land Details</h5>
                                    <pre>{JSON.stringify(map.details.clearLandDetails, null, 2)}</pre>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserMapsTable;