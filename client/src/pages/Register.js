import React from "react";
import { useState,useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import Spinner from "../compenents/layouts/Spinner";

const Register = () => {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registered");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error(error.response?.data?.message || "Registration failed");
    }
  };
  useEffect(()=>{
      if(localStorage.getItem("user")){
        navigate("/");
      }
    },[navigate]);
  return (
    <>
      <div className="register-page">
        {Loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler} style={{backgroundColor: 'white',padding: '24px',borderRadius: '8px'}}>
          <h1>Register Form</h1>
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="already-registered justify-content-between">
            <button className="btn btn-primary">Register</button>
            <Link to="/login">Already Registered?</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
