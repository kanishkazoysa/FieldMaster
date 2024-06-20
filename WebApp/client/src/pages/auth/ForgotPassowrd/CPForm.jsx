import React from "react";
import { Form, Input, Button } from "antd";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../Register/RegisterStyle.css";

const CPForm = () => {
  let params = useParams();
  const { email: email } = params;

  const onFinish = (values) => {
    const { password } = values;

    axios
      .post("/api/users/change-password", {
        email,
        newPassword: password,
      })
      .then(() => {
        window.location.href = "/login";
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
        <label>New Password</label>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <label>Confirm Password</label>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button1">
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CPForm;
