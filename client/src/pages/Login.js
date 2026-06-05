import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Spinner from "../compenents/layouts/Spinner";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successful"); 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ ...data.user}));
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page">
        {Loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler} style={{backgroundColor: 'white',padding: '24px',borderRadius: '8px'}}>
          <h1>Login Form</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="already-registered justify-content-between">
            <button className="btn btn-primary" type="submit">Login</button>
            <Link to="/register">Do not have an account?</Link>
          </div>
        </Form>
      </div>    
    </>
  );
};

export default Login;
