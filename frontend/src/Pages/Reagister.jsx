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
import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

const Register = () => {
  const navigate = useNavigate();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [verificationData, setVerificationData] = useState({
    // email: "",
    token: "",
  });

  const [credentials, setCredentials] = useState({
    username: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleVerificationChange = (e) => {
    setVerificationData({ ...verificationData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      name: credentials.username,
      address: credentials.address,
      phone: credentials.phone,
      email: credentials.email,
      password: credentials.password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // navigate("/thank-you");
          console.log(data.message);
          alert(data.message);
          setShowVerificationPopup(true);
        } else {
          alert(data.message);
          console.error(data.message);
        }
      } else {
        alert("Failed to register.");
        console.error("Failed to register.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    const verificationRequestBody = {
      email: credentials.email,
      token: verificationData.token,
    };

    // console.log("verify request body",verificationRequestBody)
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/verifyEmail",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(verificationRequestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Email verification successful");
          // alert("");
          setShowVerificationPopup(false);
          navigate("/login");
        } else {
          alert(data.message);
          console.error(data.message);
        }
      } else {
        alert("Failed to verify email.");
        console.error("Failed to verify email.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                {showVerificationPopup ? (
                  <>
                    <h2>Verify Account</h2>

                    <Form onSubmit={handleVerificationSubmit}>
                      {/* <FormGroup>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={verificationData.email}
                      onChange={handleVerificationChange}
                      required
                    />
                  </FormGroup> */}
                      <FormGroup>
                        {/* <label htmlFor="token">Verification Token</label> */}
                        <input
                          type="text"
                          id="token"
                          placeholder="token"
                          value={verificationData.token}
                          onChange={handleVerificationChange}
                          required
                        />
                      </FormGroup>
                      <Button
                        className="btn secondary__btn auth__btn"
                        type="submit"
                      >
                        Verify Email
                      </Button>
                    </Form>
                  </>
                ) : (
                  <>
                    <h2>Register</h2>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <input
                          type="text"
                          placeholder="Username"
                          required
                          id="username"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <input
                          type="text"
                          placeholder="Address"
                          required
                          id="address"
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <FormGroup>
                        <FormGroup>
                          <input
                            type="text"
                            placeholder="PhoneNumber"
                            required
                            id="phone"
                            onChange={handleChange}
                          />
                        </FormGroup>
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
                        Register
                      </Button>
                    </Form>
                    <p>
                      Already have an accout? <Link to="/login">Login</Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
