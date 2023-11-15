import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
} from "reactstrap";
import "../styles/user-profile.css";
import Bookinginfo from "../components/Bookinginfo/Bookinginfo";
import ChangePassword from "../components/ChangePassword/ChangePassword";
import { useNavigate } from "react-router-dom";
import { useApi } from "../context/ApiContext";

const UserProfile = () => {
  const { accessToken, logout } = useAuth();
  const { userData } = useApi();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("BookingInfo");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  // const {
  //   data: profile,
  //   loading,
  //   error,
  // } = useFetch("http://localhost:3000/api/profile", {
  //   accessToken: accessToken,
  // });

  const [profile, setProfile] = useState(null);
  const {
    data: initialProfile,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/profile", {
    accessToken: accessToken,
  });
  useEffect(() => {
    if (userData) {
      setProfile(userData);
    }
  }, [userData]);
  // console.log("initialProfile:", initialProfile);

  // console.log("pro", profile);

  const [editedProfile, setEditedProfile] = useState({
    name: userData?.name || "",
    address: userData?.address || "",
    imageData: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          imageData: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const imageDataWithoutPrefix = editedProfile.imageData.replace(
        /^data:image\/\w+;base64,/,
        ""
      );

      const editedData = {
        name: editedProfile.name,
        address: editedProfile.address,
        imageData: imageDataWithoutPrefix,
      };

      const response = await axios.put(
        "http://localhost:3000/api/profile/changeProfile",
        editedData,
        {
          headers: {
            "Content-Type": "application/json",
            accessToken: accessToken,
          },
        }
      );

      // setEditedProfile({
      //   name: response.data.name,
      //   address: response.data.address,
      //   imageData: response.data.image,
      // });

      // if (response.ok) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: response.data.data.name,
        address: response.data.data.address,
        imageData: response.data.data.image,
      }));

      // } else {
      //   console.error(response.message);
      // }

      toggleEditProfileModal();
      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      alert("Error editing profile");
      console.error("Error editing profile:", error.message);
    }
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  // if (error) {
  //   return <p>Error fetching profile data</p>;
  // }

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleEditProfileModal = () => {
    setIsEditProfileModalOpen(!isEditProfileModalOpen);
  };

  return (
    <section>
      <Container>
        {/* {loading && <h4>Loading......</h4>}
        {error && <h4>{error}</h4>} */}
        <Row>
          <Col lg="4">
            <Card className="user-profile-card">
              <CardImg
                top
                src={userData?.image}
                alt="User Profile Image"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  margin: "15px auto",
                  objectFit: "cover",
                }}
              />
              <CardBody>
                <CardTitle tag="h5">{userData?.name}</CardTitle>
                <p>Address: {userData?.address}</p>
                <p>Phone: {userData?.phone}</p>
                <Button
                  className="edit-profile-button"
                  color="primary"
                  onClick={toggleEditProfileModal}
                >
                  Edit Profile
                </Button>
              </CardBody>
            </Card>
          </Col>
          {/* <Col lg="6" style={{ border: "1px solid #ccc", padding: "15px", marginLeft: "35px" }}> */}
          <Col lg="6" style={{ padding: "15px", marginLeft: "35px" }}>
            {/* <Button
              className={`custom-button ${activeSection === "BookingInfo" ? "active" : ""}`}
              // color="primary"
              onClick={() => handleSectionChange("BookingInfo")}
              style={{ marginRight: "60px" }}
            >
              Booking List
            </Button>
          <Button
              className={`custom-button ${activeSection === "ChangePassword" ? "active" : ""}`}
              color="primary"
              onClick={() => handleSectionChange("ChangePassword")}
              
            >
              Change Password
            </Button> */}
            <Button
              className={`custom-button ${
                activeSection === "BookingInfo" && "active"
              }`}
              color="primary"
              onClick={() => handleSectionChange("BookingInfo")}
              style={{ marginRight: "60px" , marginLeft: "10px"}}
            >
              Booking List
            </Button>

            <Button
              className={`custom-button ${
                activeSection === "ChangePassword" && "active"
              }`}
              color="primary"
              onClick={() => handleSectionChange("ChangePassword")}
            >
              Change Password
            </Button>

            {activeSection === "ChangePassword" && <ChangePassword />}
            {activeSection === "BookingInfo" && <Bookinginfo />}
          </Col>
        </Row>
        <Modal isOpen={isEditProfileModalOpen} toggle={toggleEditProfileModal}>
          <ModalHeader toggle={toggleEditProfileModal}>
            Edit Profile
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={editedProfile.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={editedProfile.address}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="image">Profile Image</Label>
              <Input
                type="file"
                name="image"
                id="image"
                onChange={handleImageChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button color="secondary" onClick={toggleEditProfileModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </section>
  );
};
export default UserProfile;
