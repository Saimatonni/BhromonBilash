import React, { useState } from "react";
import "./change-password.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ChangePassword = () => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const requestData = {
      previousPassword,
      newPassword,
    };
    try {
      const response = await fetch("http://localhost:3000/api/profile/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accessToken: accessToken,
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(responseData.message)
        console.log(responseData.message);
      } else {
        alert(responseData.message)
        console.error(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <Form onSubmit={handlePasswordChange}>
        <FormGroup>
          <Label for="previousPassword">Previous Password</Label>
          <Input
            type="password"
            id="previousPassword"
            value={previousPassword}
            onChange={(e) => setPreviousPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassword;
