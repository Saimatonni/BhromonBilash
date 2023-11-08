import React, { useRef, useState, useEffect } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
// import tourData from '../assets/data/tours'
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

 const TourDetails = () => {

  // const {tourDetails, fetchTourDetails, tourId, setTourId} = useTour();
  // const { id } = useParams();
  const id = "653804edb4879bd41bbbbc13"
  const { data: tourData} = useFetch(`${BASE_URL}/tour/all`);
  
  const { data: tourDetails, loading, error } = useFetch(
    `http://localhost:3000/api/tour?tourId=${id}`
  );
  console.log("details 2 tourid", tourDetails, id, tourData);
  // useEffect(() => {
  //   setTourId(id)
  // }, [id]);
  const reviewMsgReg = useRef("");
  const [tourRating, setTourRating] = useState(null);

  // const { data: tourData} = useFetch(`${BASE_URL}/tour/all`);
  
  // const { data: tourDetails, loading, error } = useFetch(
  //   `http://localhost:3000/api/tour?tourId=${id}`
  // );
  // console.log("details 2 tourid", tourDetails, id, tourData);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  // const { data: tourData, loading, error } = useFetch(`${BASE_URL}/tour/all`);
  // const tour = tourData.find(tourDetails => tourDetails._id == id)
  const {
    images,
    name,
    description,
    tourGuidePrice,
    location,
    reviews,
    // distance,
    rating,
    numberOfRatings,
    // maxGroupSize,
  } = tourDetails.tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgReg.current.value;
    alert(`${reviewText}, ${tourRating}`);
  };
  return (
    <>
      <section>
        <Container>
        {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error &&(
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={images} alt="" />

                <div className="tour__info">
                  <h2>{name}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i class="ri-star-fill" style={{color : "var(--secondary-color)"}}></i> {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? 'Not rated' : <span>({reviews?.length})</span>}
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
                      <i class="ri-money-dollar-box-line"></i> ${tourGuidePrice}{" "}
                      per person
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
                <div className="tour__reviews">
                  <h4>Reviews ({reviews?.length} reviews)</h4>
                  <Form onSubmit={submitHandler}>
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
                  </Form>
                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <div className="review__item">
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>abcd</h5>
                              <p>
                                {new Date("09-24-2023").toLocaleDateString(
                                  "bd",
                                  options
                                )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center">
                              5<i class="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>Amizing tour</h6>
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
      <Newsletter />
    </>
  );
};

export default TourDetails;
