import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Header.css";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav
        style={{
          background: "linear-gradient(45deg, #e2d4ff, #500ae4)",
          color: "white",
        }}
        className="navbar navbar-expand-lg bg-light app-navbar"
      >
        <div
          style={{
            background: "linear-gradient(45deg, #e2d4ff, #500ae4)",
            color: "white",
          }}
          className="container-fluid"
        >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link  className="navbar-brand" to="/">
              Expense Management
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-actions">
              <li className="nav-item">
                <p style={{color: "white"}} className="nav-link username-label">{loginUser && loginUser.name}</p>
              </li>
              <li className="nav-item">
                <UserOutlined onClick={() => navigate("/profile")} />
              </li> 
              <li className="nav-item">
                <button className="btn btn-primary" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
