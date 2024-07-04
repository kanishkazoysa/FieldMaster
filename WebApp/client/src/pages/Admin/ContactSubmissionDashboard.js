import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tag, Row, Col } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const AdminInterface = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    // Fetch submissions from the backend
    const fetchSubmissions = async () => {
      const response = await axios.get('/submissions');
      setSubmissions(response.data);
    };
    fetchSubmissions();
  }, []);

  const handleReply = (submission) => {
    setSelectedSubmission(submission);
    setIsModalVisible(true);
  };

  const handleSendReply = async () => {
    try {
      await axios.post('/reply', {
        id: selectedSubmission._id,
        toEmail: selectedSubmission.email,
        replyMessage,
      });
      setSubmissions(submissions.map(sub => 
        sub._id === selectedSubmission._id ? { ...sub, status: 'replied' } : sub
      ));
      setIsModalVisible(false);
      setReplyMessage('');
    } catch (error) {
      console.error('Failed to send reply:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'replied' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleReply(record)}>
          Reply
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={submissions}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => setSelectedSubmission(record),
        })}
      />

      <Modal
        title="Reply to Email"
        visible={isModalVisible}
        onOk={handleSendReply}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form>
          <Form.Item label="To">
            <Input value={selectedSubmission?.email} disabled />
          </Form.Item>
          <Form.Item label="Reply Message">
            <TextArea 
              value={replyMessage} 
              onChange={(e) => setReplyMessage(e.target.value)} 
            />
          </Form.Item>
        </Form>
      </Modal>

      {selectedSubmission && (
        <div>
          <h2>Conversation with {selectedSubmission.email}</h2>
          <Row>
            <Col span={12}>
              <h3>Sent Messages</h3>
              <p>{selectedSubmission.message}</p>
            </Col>
            <Col span={12}>
              <h3>Replied Messages</h3>
              {selectedSubmission.status === 'replied' && (
                <p>{replyMessage}</p>
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default AdminInterface;
