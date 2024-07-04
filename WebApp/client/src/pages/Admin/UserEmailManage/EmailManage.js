import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Tag, Row, Col, Statistic, Card } from 'antd';

const { TextArea } = Input;

const EmailManage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    // Fetch submissions from the backend
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/submissions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      }
    };
    fetchSubmissions();
  }, []);

  const handleReply = (submission) => {
    setSelectedSubmission(submission);
    setIsModalVisible(true);
  };

  const handleSendReply = async () => {
    try {
      // Send reply and update status
      await fetch('/api/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedSubmission._id,
          toEmail: selectedSubmission.email,
          replyMessage,
        }),
      });
  
      // Update status locally
      setSubmissions(submissions.map(sub =>
        sub._id === selectedSubmission._id ? { ...sub, status: 'replied' } : sub
      ));
  
      // Clear modal and reply message
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

  const totalEmails = submissions.length;
  const repliedEmails = submissions.filter(sub => sub.status === 'replied').length;
  const toReplyEmails = totalEmails - repliedEmails;

  return (
    <div>
      <h3>Email Manage</h3>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Emails" value={totalEmails} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Replied Emails" value={repliedEmails} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="To Reply Emails" value={toReplyEmails} />
          </Card>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={submissions}
        rowKey="_id"
        onRow={(record) => ({
          onClick: () => setSelectedSubmission(record),
        })}
        style={{ marginTop: 20 }}
      />

      <Modal
        title="Reply to Email"
        open={isModalVisible}
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
        <div style={{ marginTop: 20 }}>
          <h2>Conversation with {selectedSubmission.email}</h2>
          <Row gutter={16}>
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
    </div>
  );
};

export default EmailManage;
