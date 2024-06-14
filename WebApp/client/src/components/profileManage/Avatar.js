import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
const App = ({onClick}) => (
  <Space size={16} wrap>
    <Avatar
        onClick={onClick}
      style={{
        backgroundColor: '#87d068',
        position: 'absolute',
        right: '12%',
        top: '2.5%',
      }}
      icon={<UserOutlined />}
    />
  </Space>
);
export default App;