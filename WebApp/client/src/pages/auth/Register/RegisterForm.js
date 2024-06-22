import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterStyle.css";


const RegisterForm = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const onFinish = (values) => {
    const { firstName, lastName, email, password } = values;

    axios
      .post("/api/users/register", {
        fName: firstName,
        lName: lastName,
        email,
        password,
      })
      .then(() => {
        navigate('/login');
        message.success("User registered successfully! please verify your email to login.");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          // Displaying the error message using antd message component
          message.error(error.response.data.error);
        } else {
          // Fallback error message if the expected structure is not found
          message.error("An unexpected error occurred. Please try again.");
        }
        console.error("There was an error registering the user!", error);
      });
  };

  return (
    <div className="register-form-container">
      <div className="form-header">
        <h3>Sign Up</h3>
        <p>Welcome back! Please enter your details</p>
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
        <label>First Name</label>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <label>Last Name</label>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

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
          <Input placeholder="Email" />
        </Form.Item>
        <label>Password</label>
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
          <Button type="primary" htmlType="submit" className="register-button">
            Sign Up
          </Button>
        </Form.Item>

        <div className="already-have-account">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
