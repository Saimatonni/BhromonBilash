import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Button, Image } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import NotificationPanel from "../Notification/Notification";
import { useApi } from "../../context/ApiContext";
import { useNavigate } from "react-router-dom";

const nav_Link = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const Header = () => {
  const { accessToken, logout,  isAuthenticated } = useAuth();
  const { userData } = useApi();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  // const { data: profile, loading, error } = useFetch('http://localhost:3000/api/profile');
  // const {
  //   data: profile,
  //   loading,
  //   error,
  // } = useFetch("http://localhost:3000/api/profile", {
  //   accessToken: accessToken,
  // });

  useEffect(() => {

    setProfile(userData);
  }, [userData]);

  // console.log("user data",userData.image)
 
  const headerRef = useRef(null);
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef?.current?.classList.add("sticky__header");
      } else {
        headerRef?.current?.classList.remove("sticky__header");
      }
    });
  };
  useEffect(() => {
    stickyHeaderFunc();

    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const isLoggedIn = !!accessToken;
  const handleLogout = () => {
    logout();
    navigate('/')
  };

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notifications = [
    // { message: "New message received" },
    // { message: "You have a new follower" },
  ];

  const toggleNotificationPanel = () => {
    if (userData.subscribed) {
      setIsNotificationOpen((prev) => !prev);
      document.body.style.overflow = "hidden";
    } else {
      alert("Please subscribe first to get notifications.");
    }
  };

  const closeNotificationPanel = () => {
    setIsNotificationOpen(false);
    document.body.style.overflow = "auto";
  };

  // useEffect(() => {
  //   stickyHeaderFunc();
  
  //   return () => {
  //     window.removeEventListener("scroll", stickyHeaderFunc);
  //     // Reset the body overflow property when the component is unmounted
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);
  

  return (
    <header className="Header" ref={headerRef}>
      <Container>
        
        <Row>
          <div className="nav_wrapper d-flex align-item-center justify-content-between">
            <div className="logo">
              {/* <img src={logo} alt="" /> */}
              <img src={logo} alt="" width="350" height="50" />
              {/* <h1 className="logo-text">bromonbilash</h1> */}
            </div>

            <div className="navigation">
              <ul className="menu d-flex align-item-center gap-5">
                {nav_Link.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {/* <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button> */}
                {isAuthenticated ? (
                  <>
                    {userData? (
                      <Link to="/profile">
                        <img
                          src={userData.image}
                          alt="Profile Image"
                          className="profile-image"
                          width="40"
                          height="40"
                        />
                      </Link>
                    ):(
                      <span className="w-[50px] h-[50px] mt-15 rounded-full">
                      Profile
                    </span>
                    )}
                    {/* <span className="notification_icon">
                      <i className="ri-notification-3-line"></i>
                    </span> */}
                    <span
                      className="notification_icon"
                      onClick={toggleNotificationPanel}
                    >
                      <i className="ri-notification-3-line"></i>
                    </span>
                    <Button
                      className="btn secondary__btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary__btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary__btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
              <span className="mobile_menu">
                <i class="ri-menu-line"></i>
              </span>
            </div>
            {isNotificationOpen && userData.notifications && (
              <NotificationPanel
                // notifications={notifications}
                notifications={userData.notifications}
                onClose={closeNotificationPanel}
              />
            )}
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

// const Header = () => {
//     return <Header classnam="header">
// <Container>
//   <Row>
//       <div className='nav_wrapper d-flex align-item-center justify-content-between'>
//          <div className="logo">
//            <img src={logo} alt=""/>
//          </div>
//       </div>
//   </Row>
// </Container>
//     </Header>
// }
