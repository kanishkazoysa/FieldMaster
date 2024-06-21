import React from "react";
import { Form, Input, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../Register/RegisterStyle.css";

const FPForm = () => {
  let params = useParams();
  const { email: email } = params;

  const onFinish = (values) => {
    const { enteredOTP } = values;

    axios
      .post("/api/mail/verify", {
        enteredOTP,
        email,
      })
      .then(() => {
        window.location.href = `/change-password/${email}`;
      })
      .catch((error) => {
        console.error("There was an error in otp process !", error);
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
        <label>OTP</label>
        <Form.Item
          name="enteredOTP"
          rules={[
            {
              required: true,
              message: "Please enter your OTP!",
            },
          ]}
        >
          <Input placeholder="Enter your OTP" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button1">
            Reset Password
          </Button>

          <Button
            type="primary"
            className="register-button2"
            onClick={() => {
              window.location.href = "/forgot-password";
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
