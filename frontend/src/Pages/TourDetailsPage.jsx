import React, { useRef, useState, useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup, Input } from "reactstrap";
import { useParams } from "react-router-dom";
// import tourData from '../assets/data/tours'
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import Slider from "react-slick";
import { useBookingInfo } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

const TourDetailsPage = () => {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
    window.scroll(0, 0);
  }, [page]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: tourDetails,
    loading,
    error,
  } = useFetch(`http://localhost:3000/api/tour?tourId=${id}`);
  //   console.log("details details 2 tourid", tourDetails, id);
  const reviewMsgReg = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { bookingInfo, setBookingInfo } = useBookingInfo();

  const [tourObject] = tourDetails?.tour || [];

  // console.log("tour object", tourObject);
  const {
    _id,
    name,
    description,
    featured,
    images,
    location,
    numberOfRatings,
    rating,
    reviews,
    tourGuidePrice,
  } = tourObject || {};

  const budgetDetails = tourDetails?.budgetDetails || [];

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgReg.current.value;
    alert(`${reviewText}, ${tourRating}`);
  };
  const imageHeight = 550;
  const [selectedBudgetType, setSelectedBudgetType] = useState("LOW");

  const handleBudgetTypeChange = (e) => {
    setSelectedBudgetType(e.target.value);
  };

  useEffect(() => {
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      id: id,
      budgetType: selectedBudgetType,
      tourGuidePrice: tourGuidePrice,
    }));
  }, [id, selectedBudgetType, tourGuidePrice]);

  const searchHandler = () => {
    navigate(`/hotels/${id}/${selectedBudgetType}`);
  };

  const handleBudgetCardClick = (budgetType) => {
    setSelectedBudgetType(budgetType);
    navigate(`/hotels/${id}/${budgetType}`);
  };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="12">
                <div className="tour__content">
                  {/* <img src={images} alt="" /> */}
                  <Slider className="image-slider" {...settings}>
                    {images?.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          style={{ height: imageHeight }}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </Slider>

                  <div className="tour__info">
                    <h2>{name}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          class="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                        {/* <i
                        className="ri-star-fill"
                        style={{ color: "darkorange" }}
                      ></i>
                      {rating === 0 ? null : rating}
                      {!rating ? "Not rated" : <span>({numberOfRatings})</span>} */}
                      </span>
                      <span>
                        <i class="ri-map-pin-user-fill"></i>
                        {location}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      {/* <span>
                      <i class="ri-map-pin-line"></i> {city}
                    </span> */}
                      <span>
                        Tour Guide :
                        <i class="ri-money-dollar-box-line"></i> $
                        {tourGuidePrice} per person
                      </span>
                      {/* <span>
                      <i class="ri-pin-distance-line"></i> ${distance} k/m
                    </span>
                    <span>
                      <i class="ri-group-line"></i> {maxGroupSize} People
                    </span> */}
                    </div>
                    <h5>Description</h5>
                    <p>{description}</p>
                  </div>
                  <div className="tour__budget-details">
                    <h5>Budget Details</h5>
                    <Row>
                      <Col md="4">
                        <div
                          className="budget-card"
                          onClick={() => handleBudgetCardClick("LOW")}
                        >
                          <h6>Budget Friendly</h6>
                          <p>{budgetDetails?.BudgetFriendly?.hotelType}</p>
                          <p>{budgetDetails?.BudgetFriendly?.travelType}</p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div
                          className="budget-card"
                          onClick={() => handleBudgetCardClick("MID")}
                        >
                          <h6>Standard</h6>
                          <p>{budgetDetails?.Standard?.hotelType}</p>
                          <p>{budgetDetails?.Standard?.travelType}</p>
                        </div>
                      </Col>
                      <Col md="4">
                        <div
                          className="budget-card"
                          onClick={() => handleBudgetCardClick("HIGH")}
                        >
                          <h6>Luxury</h6>
                          <p>{budgetDetails?.Luxury?.hotelType}</p>
                          <p>{budgetDetails?.Luxury?.travelType}</p>
                        </div>
                      </Col>
                    </Row>
                    {/* <div className="budget-filter">
                      <Form className="d-flex align-items-center gap-4">
                        <label htmlFor="budgetType">
                          Filter by Budget Type:
                        </label>
                        <select
                          id="budgetType"
                          value={selectedBudgetType}
                          onChange={handleBudgetTypeChange}
                        >
                          <option value="LOW">Low Budget</option>
                          <option value="MID">Mid Budget</option>
                          <option value="HIGH">High Budget</option>
                        </select>
                        <span
                          className="search_icon"
                          type="submit"
                          onClick={searchHandler}
                        >
                          <i class="ri-search-line"></i>
                        </span>
                      </Form>
                    </div> */}
                  </div>

                  <div className="tour__reviews">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    {/* <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i class="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i class="ri-star-s-fill"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgReg}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form> */}
                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item">
                          <img src={review.userImage} alt={review.userName} />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                {/* <h5>abcd</h5>
                              <p>
                                {new Date("09-24-2023").toLocaleDateString(
                                  "bd",
                                  options
                                )}
                              </p> */}
                                <h5>{review.userName}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("bd", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            {/* <h6>Amizing tour</h6> */}
                            <h6>{review.review}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              {/* <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col> */}
            </Row>
          )}
        </Container>
      </section>
      {/* <Newsletter /> */}
    </>
  );
};

export default TourDetailsPage;
