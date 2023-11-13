import React, { useState } from "react";
import {
  Conatiner,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Container,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        const accessToken = data.data.jwtAccessToken;
        localStorage.setItem("accessToken", accessToken);
        console.log("acesstoken:", accessToken);
        setToken(accessToken);
        navigate("/");
      } else {
        alert("Login failed");
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    email: "",
    token: "",
    password: "",
  });

  const handleForgotPasswordClick = async () => {
    if (!credentials.email) {
      alert("Please provide an email for password recovery.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/sendOtp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Password recovery initiated:", data);
        alert("Please Check Your email")
        setResetPasswordData({
          email: credentials.email,
          token: "",
          password: "",
        });
        setShowResetPasswordPopup(true);
      } else {
        console.error("Failed to initiate password recovery");
        alert("Failed to initiate password recovery");
      }
    } catch (error) {
      console.error("Error during password recovery:", error);
      alert("Error during password recovery");
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetPasswordData.token) {
      alert("Please provide a token for password reset.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/forgetPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resetPasswordData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Password reset successful...Login Now")
        console.log("Password reset successful:", data);
        setShowResetPasswordPopup(false);
        navigate("/login");
      } else {
        console.error("Failed to reset password");
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("Error during password reset");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an accout? <Link to="/register">Create</Link>
                </p>
                <p
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={handleForgotPasswordClick}
                >
                  Forgot Password?
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {showResetPasswordPopup && (
        <div className="reset-password-popup">
          <h2>Reset Password</h2>
          <form onSubmit={handleResetPasswordSubmit}>
            {/* <label>
              Token:
            </label> */}
              <input
                type="text"
                placeholder="token"
                value={resetPasswordData.token}
                onChange={(e) =>
                  setResetPasswordData({
                    ...resetPasswordData,
                    token: e.target.value,
                  })
                }
              />
            {/* <label>
              New Password:
            </label> */}
              <input
                type="password"
                placeholder="New Password"
                value={resetPasswordData.password}
                onChange={(e) =>
                  setResetPasswordData({
                    ...resetPasswordData,
                    password: e.target.value,
                  })
                }
              />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Login;
