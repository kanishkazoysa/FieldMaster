import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Register/RegisterStyle.css";




const LoginForm = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const onFinish = (values) => {
    const { email, password } = values;
    
    axios
      .post("/api/users/login", {
        email,
        password,
      })
      .then((response) => {
        //get token and store it on local storage
        const token= response.data.token; 
        localStorage.setItem("UserToken", token);

        // Use navigate for redirection after successful login
        navigate('/Home', { replace: true, state: { loginSuccess: true } });
        // No need to show message here, it will be handled in Home component
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          // Displaying the error message using antd message component
          message.error(error.response.data.error);
        } else {
          // Fallback error message if the expected structure is not found
          message.error("An unexpected error occurred. Please try again.");
        }
        console.error("There was an error during login!", error);
      });
  };

  return (
    <div className="register-form-container">
      <div className="form-header">
        <h3>Sign In</h3>
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

        <div className="container-sign-in">
          <div className="csi-div">
            <input type="checkbox" name="remember" /> <label>Remember Me</label>
          </div>
          <div className="csi-div">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
        <br />

        <Form.Item>
          <Button type="primary" htmlType="submit" className="register-button">
            Sign In
          </Button>
        </Form.Item>

        <div className="already-have-account">
          Don't have an account yet? <Link to="/register">signup</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
