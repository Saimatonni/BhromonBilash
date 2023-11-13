import React , {useState, useEffect} from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Newsletter = () => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null);
  const {
    data: initialProfile,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/profile", {
    accessToken: accessToken,
  });

  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const handleSubscriptionToggle = async () => {
    try {
      setIsSubscribing(true);
      if (!accessToken) {
        navigate("/login");
        return;
      }
      const apiEndpoint = profile.subscribed
        ? "http://localhost:3000/api/subscription/remove"
        : "http://localhost:3000/api/subscription/request";

      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accessToken: accessToken,
        },
      });

      const responseData = await response.json();
      if (response.ok) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          subscribed: !prevProfile.subscribed,
        }));
        console.log(responseData.message);
      } else {
        console.error(responseData.message);
      }
    } catch (error) {
      console.error("An error occurred while processing the request", error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>
              {/* <div className="newsletter__input">
                    <input type='email' placeholder='Enter your email'/>
                    <button className='btn newsletter__btn'>Subscribe</button>
                </div> */}
              {profile && (
                <div className="newsletter__input">
                  <button
                    className="btn newsletter__btn"
                    onClick={handleSubscriptionToggle}
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? "Processing..." : profile.subscribed ? "Unsubscribe" : "Subscribe"}
                  </button>
                </div>
              )}
              <p>
                Visit reputable travel websites and blogs regularly. Many of
                them offer newsletters that you can subscribe to for updates on
                travel destinations, tips, and deals.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
