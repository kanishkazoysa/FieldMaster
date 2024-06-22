import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Register/RegisterStyle.css";

const FPForm = () => {
  const onFinish = (values) => {
    const { email } = values;

    axios
      .post("/api/mail/otp", {
        email,
      })
      .then(() => {
        window.location.href = `/enter-otp/${email}`;
      })
      .catch((error) => {
        console.error("There was an error login !", error);
      });
  };

  return (
    <div className="register-form-container">
      <div className="form-header">
        <h3>Forgot Password</h3>
        <p>No worries. We’ll send you instructions to reset </p>
      </div>
      <br />

      <Form
        name="register"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <label>Email</label>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button1">
            Reset Password
          </Button>
          <Button
            type="primary"
            className="register-button2"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FPForm;
