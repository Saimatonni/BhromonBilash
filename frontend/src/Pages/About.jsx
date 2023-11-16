import React from "react";
import { Container, Row, Col } from "reactstrap";
import userIcon from "../assets/images/user.png";
import "../styles/about.css";
import Slider from "react-slick";
const About = () => {
  const addressData = [
    {
      city: "Dhaka",
      address: "123 Main Street, Dhaka",
      phone: "018++++++++++++",
    },
    {
      city: "Khulna",
      address: "124 Main Street, Khulna",
      phone: "018++++++++++++",
    },
    {
      city: "Gazipur",
      address: "125 Main Street, Gazipur",
      phone: "018++++++++++++",
    },
    {
      city: "Mymensingh",
      address: "125 Main Street, Mymensingh",
      phone: "018++++++++++++",
    },
    {
      city: "Rajshahi",
      address: "127 Main Street, Rajshahi",
      phone: "018++++++++++++",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <section>
      <Container>
        {/* <Row> */}
          {/* <Col> */}
          <Slider {...settings}>
              {addressData.map((address, index) => (
                <div key={index} className="slider-item">
                  <h4>{address.city}</h4>
                  <p>{`Address: ${address.address}`}</p>
                  <p>{`Phone: ${address.phone}`}</p>
                </div>
              ))}
            </Slider>
            <div className="about_con">
              <div className="about">
                <img src={userIcon} alt="shamik" />
                <div>
                  <h4>Shamik Shafkat</h4>
                  <p>
                    3rd Year Computer science student at University of Dhaka ||
                    Software Developer
                  </p>
                  <p>Dhaka , Bangladesh. 018++++++++++++</p>
                </div>
              </div>
              <div className="about" style={{ marginTop: "250px" }}>
                <img src={userIcon} alt="saima" />
                <div>
                  <h4>Saima Akter</h4>
                  <p>
                    3rd Year Computer science student at University of Dhaka ||
                    Software Developer
                  </p>
                  <p>Dhaka , Bangladesh. 018++++++++++++</p>
                </div>
              </div>
            </div>
          {/* </Col> */}
        {/* </Row> */}
      </Container>
    </section>
  );
};

export default About;
