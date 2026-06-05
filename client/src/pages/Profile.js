import React, { useEffect, useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import Layout from "../compenents/layouts/Layout";
import Spinner from "../compenents/layouts/Spinner";
import "./Profile.css";

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return;
    }

    const user = JSON.parse(storedUser);
    form.setFieldsValue({
      name: user.name || "",
      email: user.email || "",
      password: "",
    });
  }, [form]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const payload = {
        name: values.name,
        email: values.email,
      };

      if (values.password) {
        payload.password = values.password;
      }

      const { data } = await axios.put("/users/update-profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      form.setFieldValue("password", "");
      message.success(data?.message || "Profile updated successfully");
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-hero">
            <p className="profile-eyebrow">Account Settings</p>
            <h1>Manage your profile</h1>
            <p className="profile-copy">
              Update your account details here. Leave the password field empty
              if you do not want to change it.
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            className="profile-form"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Enter a valid email address" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  min: 6,
                  message: "Password must be at least 6 characters",
                },
              ]}
            >
              <Input.Password placeholder="Leave blank to keep current password" />
            </Form.Item>

            <div className="profile-actions">
              <button className="btn btn-primary profile-save-btn" type="submit">
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
