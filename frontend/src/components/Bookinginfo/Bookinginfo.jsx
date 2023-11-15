import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import "./booking-info.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import RatingModal from "../../shared/RatingModel";

const Bookinginfo = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  //   const {
  //     data: bookingList,
  //     loading,
  //     error,
  //   } = useFetch("http://localhost:3000/api/booking", {
  //     accessToken: accessToken,
  //   });
   console.log("acces",accessToken)
  const [bookingList, setBookingList] = useState(null);
  const {
    data: initialbookingList,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/booking", {
    accessToken: accessToken,
  });
  useEffect(() => {
    if (initialbookingList) {
      setBookingList(initialbookingList);
    }
  }, [initialbookingList]);

  const handleCancelOrder = async (bookingId, uptripDate) => {
    try {
      const currentDate = new Date();
      const allowableCancelDate = new Date(uptripDate);
      allowableCancelDate.setDate(allowableCancelDate.getDate() - 7);
      // console.log("date cuur",allowableCancelDate, currentDate,  allowableCancelDate.getDate() - 7)
      if (currentDate > allowableCancelDate) {
        alert("Booking cancellation deadline has passed.");
        return;
      }


      // console.log("bookingId",bookingId)

      const response = await fetch("http://localhost:3000/api/booking", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          accessToken: accessToken,
        },
        body: JSON.stringify({
          bookingId: bookingId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Booking deleted successfully");
        const updatedBookingList = bookingList.filter(
          (booking) => booking.bookingId !== bookingId
        );
        setBookingList(updatedBookingList);
      } else {
        alert(result.message);
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedBookingBudget, setSelectedBookingBudget] = useState(null);
  const [selectedRatingInfo, setSelectedRatingInfo] = useState(null);
  const [ratingInfo, setRatingInfo] = useState({
    rating: 0,
    review: "",
  });

  const handleGiveRating = (bookingId, itemId, itemType, budgetType) => {
    setSelectedRatingInfo({
      bookingId,
      itemId,
      itemType,
      budgetType,
    });
    setRatingInfo({
      rating: 0,
      review: "",
    });
    setSelectedBookingBudget(budgetType);
    setIsRatingModalOpen(true);
  };

  //   console.log("budget",selectedBookingBudget)

  //   const handleRatingSubmit = (bookingId, rating, review, itemId, itemType) => {
  //     console.log(`Rating submitted for booking ${bookingId}: ${rating}`);
  //     console.log(`Review submitted: ${review}`);
  //     console.log(`Item ID: ${itemId}, Item Type: ${itemType}`);
  //     setIsRatingModalOpen(false);
  //   };

  const handleRatingSubmit = async (
    bookingId,
    rating,
    review,
    itemId,
    itemType
  ) => {
    try {
      const url =
        itemType === "tour"
          ? "/api/rating/tour"
          : `/api/rating/hotel?budgetType=${selectedBookingBudget}`;

      const response = await fetch(`http://localhost:3000${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accessToken: accessToken,
        },
        body: JSON.stringify({
          bookingId: bookingId,
          rating: rating,
          review: review,
          [itemType + "Id"]: itemId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log(`${itemType} Rating posted successfully`);
        // You may want to update the UI or take any other actions after successful rating submission
      } else {
        alert(result.message);
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error posting rating:", error);
    }
  };

  //   console.log("bookinglist", bookingList);
  const isBookingListEmpty =
    !bookingList ||
    !Array.isArray(bookingList) ||
    bookingList.length === 0 ||
    (!bookingList[0].lowBudgetBookings &&
      !bookingList[0].midBudgetBookings &&
      !bookingList[0].highBudgetBookings);

  return (
    <div className="booking-container">
      <section className="pt-0">
        <Container>
          <Row>
            {loading && <h4>Loading......</h4>}
            {/* {error && <h4>{error}</h4>} */}
            {isBookingListEmpty ? (
              <h4></h4>
            ) : (
              bookingList &&
              bookingList.map((booking) => (
                <React.Fragment key={booking._id}>
                  {booking.lowBudgetBookings &&
                    booking.lowBudgetBookings.length > 0 && (
                      <React.Fragment>
                        <h4>Low Budget Bookings</h4>
                        <Row>
                          {booking.lowBudgetBookings.slice().reverse().map((lowBudgetBooking) => (
                            <Col
                              key={lowBudgetBooking._id}
                              sm="12"
                              className="mb-4"
                            >
                              <Card className="card">
                                <Row className="p-2">
                                  <Col>
                                    <CardImg
                                      top
                                      width="100%"
                                      src={lowBudgetBooking.tourImages[0]}
                                      alt={lowBudgetBooking.tourName}
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        // borderRadius: "50%",
                                        margin: "15px auto",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Col>
                                  <Col className="p-4">
                                    <h2> {lowBudgetBooking.tourName}</h2>
                                    <h4>{lowBudgetBooking.hotelName}</h4>
                                  </Col>
                                </Row>
                                <CardBody className="card-body">
                                  <p>
                                    Booking Date:{" "}
                                    {new Date(
                                      lowBudgetBooking.bookingDates.start
                                    ).toDateString()}{" "}
                                    to{" "}
                                    {new Date(
                                      lowBudgetBooking.bookingDates.end
                                    ).toDateString()}
                                  </p>
                                  <p>
                                    Total Price: {lowBudgetBooking.totalPrice},  3-star hotels, Non-AC Bus
                                  </p>
                                  <div className="updown-trip">
                                    <h5 className="mb-10">Uptrip</h5>
                                    <div>
                                      Source: {lowBudgetBooking.uptrip.source},
                                      Time: {lowBudgetBooking.uptrip.time},
                                      Date:{" "}
                                      {new Date(
                                        lowBudgetBooking.uptrip.date
                                      ).toDateString()}
                                      , Total Persons:{" "}
                                      {lowBudgetBooking.uptrip.totalPersons}
                                    </div>
                                  </div>
                                  <div className="updown-trip">
                                    <h5>Downtrip</h5>
                                    <div>
                                      Source: {lowBudgetBooking.downtrip.source}
                                      , Time: {lowBudgetBooking.downtrip.time},
                                      Date:{" "}
                                      {new Date(
                                        lowBudgetBooking.downtrip.date
                                      ).toDateString()}
                                      , Total Persons:{" "}
                                      {lowBudgetBooking.downtrip.totalPersons}
                                    </div>
                                  </div>
                                  <div className="bedroom-details">
                                    <h5>Bedroom Details</h5>
                                    {lowBudgetBooking.singleBedRooms.map(
                                      (singleBedroom) => (
                                        <p key={singleBedroom._id}>
                                          Single Bedroom - Number:{" "}
                                          {singleBedroom.number},
                                        </p>
                                      )
                                    )}
                                    {lowBudgetBooking.doubleBedRooms.map(
                                      (doubleBedroom) => (
                                        <p key={doubleBedroom._id}>
                                          Double Bedroom - Number:{" "}
                                          {doubleBedroom.number},
                                        </p>
                                      )
                                    )}
                                  </div>
                                  <div className="card-buttons">
                                    <Button
                                      color="danger"
                                      onClick={() =>
                                        handleCancelOrder(
                                          lowBudgetBooking._id,
                                          lowBudgetBooking.uptrip.date
                                        )
                                      }
                                    >
                                      Cancel Order
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        handleGiveRating(
                                          lowBudgetBooking._id,
                                          lowBudgetBooking.tourId,
                                          "tour",
                                          lowBudgetBooking.budgetType
                                        )
                                      }
                                      className="ml-2"
                                    >
                                      Rate Tour
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        handleGiveRating(
                                          lowBudgetBooking._id,
                                          lowBudgetBooking.hotelId,
                                          "hotel",
                                          lowBudgetBooking.budgetType
                                        )
                                      }
                                      className="ml-2"
                                    >
                                      Rate Hotel
                                    </Button>
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </React.Fragment>
                    )}

                  {booking.midBudgetBookings &&
                    booking.midBudgetBookings.length > 0 && (
                      <React.Fragment>
                        <h4>Mid Budget Bookings</h4>
                        <Row>
                          {booking.midBudgetBookings.slice().reverse().map((midBudgetBooking) => (
                            <Col
                              key={midBudgetBooking._id}
                              sm="12"
                              className="mb-4"
                            >
                              <Card className="card">
                                <Row className="p-2">
                                  <Col>
                                    <CardImg
                                      top
                                      width="100%"
                                      src={midBudgetBooking.tourImages[0]}
                                      alt={midBudgetBooking.tourName}
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        // borderRadius: "50%",
                                        margin: "15px auto",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </Col>
                                  <Col className="p-4">
                                    <h2> {midBudgetBooking.tourName}</h2>
                                    <h4>{midBudgetBooking.hotelName}</h4>
                                  </Col>
                                </Row>
                                <CardBody className="card-body">
                                  <p>
                                    Booking Date:{" "}
                                    {new Date(
                                      midBudgetBooking.bookingDates.start
                                    ).toDateString()}{" "}
                                    to{" "}
                                    {new Date(
                                      midBudgetBooking.bookingDates.end
                                    ).toDateString()}
                                  </p>
                                  <p>
                                    Total Price: {midBudgetBooking.totalPrice}, 4-star hotels, AC Bus
                                  </p>
                                  <div className="updown-trip">
                                    <h5 className="mb-10">Uptrip</h5>
                                    <div>
                                      Source: {midBudgetBooking.uptrip.source},
                                      Time: {midBudgetBooking.uptrip.time},
                                      Date:{" "}
                                      {new Date(
                                        midBudgetBooking.uptrip.date
                                      ).toDateString()}
                                      , Total Persons:{" "}
                                      {midBudgetBooking.uptrip.totalPersons}
                                    </div>
                                  </div>
                                  <div className="updown-trip">
                                    <h5>Downtrip</h5>
                                    <div>
                                      Source: {midBudgetBooking.downtrip.source}
                                      , Time: {midBudgetBooking.downtrip.time},
                                      Date:{" "}
                                      {new Date(
                                        midBudgetBooking.downtrip.date
                                      ).toDateString()}
                                      , Total Persons: Total Persons:{" "}
                                      {midBudgetBooking.downtrip.totalPersons}
                                    </div>
                                  </div>
                                  <div className="bedroom-details">
                                    <h5>Bedroom Details</h5>
                                    {midBudgetBooking.singleBedRooms.map(
                                      (singleBedroom) => (
                                        <p key={singleBedroom._id}>
                                          Single Bedroom - Number:{" "}
                                          {singleBedroom.number},
                                        </p>
                                      )
                                    )}
                                    {midBudgetBooking.doubleBedRooms.map(
                                      (doubleBedroom) => (
                                        <p key={doubleBedroom._id}>
                                          Double Bedroom - Number:{" "}
                                          {doubleBedroom.number},
                                        </p>
                                      )
                                    )}
                                  </div>
                                  <div className="card-buttons">
                                    <Button
                                      color="danger"
                                      onClick={() =>
                                        handleCancelOrder(
                                          midBudgetBooking._id,
                                          midBudgetBooking.uptrip.date
                                        )
                                      }
                                    >
                                      Cancel Order
                                    </Button>

                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        handleGiveRating(
                                          midBudgetBooking._id,
                                          midBudgetBooking.tourId,
                                          "tour",
                                          midBudgetBooking.budgetType
                                        )
                                      }
                                      className="ml-2"
                                    >
                                      Rate Tour
                                    </Button>
                                    <Button
                                      color="primary"
                                      onClick={() =>
                                        handleGiveRating(
                                          midBudgetBooking._id,
                                          midBudgetBooking.hotelId,
                                          "hotel",
                                          midBudgetBooking.budgetType
                                        )
                                      }
                                      className="ml-2"
                                    >
                                      Rate Hotel
                                    </Button>
                                  </div>
                                </CardBody>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </React.Fragment>
                    )}

                  {booking.highBudgetBookings &&
                    booking.highBudgetBookings.length > 0 && (
                      <React.Fragment>
                        <h4>High Budget Bookings</h4>
                        <Row>
                          {booking.highBudgetBookings.slice().reverse().map(
                            (highBudgetBooking) => (
                              <Col
                                key={highBudgetBooking._id}
                                sm="12"
                                className="mb-4"
                              >
                                <Card className="card">
                                  <Row className="p-2">
                                    <Col>
                                      <CardImg
                                        top
                                        width="100%"
                                        src={highBudgetBooking.tourImages[0]}
                                        alt={highBudgetBooking.tourName}
                                        style={{
                                          width: "150px",
                                          height: "150px",
                                          // borderRadius: "50%",
                                          margin: "15px auto",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </Col>
                                    <Col className="p-4">
                                      <h2> {highBudgetBooking.tourName}</h2>
                                      <h4>{highBudgetBooking.hotelName}</h4>
                                    </Col>
                                  </Row>
                                  <CardBody className="card-body">
                                    <p>
                                      Booking Date:{" "}
                                      {new Date(
                                        highBudgetBooking.bookingDates.start
                                      ).toDateString()}{" "}
                                      to{" "}
                                      {new Date(
                                        highBudgetBooking.bookingDates.end
                                      ).toDateString()}
                                    </p>
                                    <p>
                                      Total Price:{" "}
                                      {highBudgetBooking.totalPrice}, 4-star hotels, AC Bus
                                    </p>
                                    <div className="updown-trip">
                                      <h5 className="mb-10">Uptrip</h5>
                                      <div>
                                        Source:{" "}
                                        {highBudgetBooking.uptrip.source}, Time:{" "}
                                        {highBudgetBooking.uptrip.time}, Date:{" "}
                                        {new Date(
                                          highBudgetBooking.uptrip.date
                                        ).toDateString()}
                                        , Total Persons: , Total Persons:{" "}
                                        {highBudgetBooking.uptrip.totalPersons}
                                      </div>
                                    </div>
                                    <div className="updown-trip">
                                      <h5>Downtrip</h5>
                                      <div>
                                        Source:{" "}
                                        {highBudgetBooking.downtrip.source},
                                        Time: {highBudgetBooking.downtrip.time},
                                        Date:{" "}
                                        {new Date(
                                          highBudgetBooking.downtrip.date
                                        ).toDateString()}, 
                                        Total Persons:{" "}
                                        {
                                          highBudgetBooking.downtrip
                                            .totalPersons
                                        }
                                      </div>
                                    </div>
                                    <div className="bedroom-details">
                                      <h5>Bedroom Details</h5>
                                      {highBudgetBooking.singleBedRooms.map(
                                        (singleBedroom) => (
                                          <p key={singleBedroom._id}>
                                            Single Bedroom - Number:{" "}
                                            {singleBedroom.number},
                                          </p>
                                        )
                                      )}
                                      {highBudgetBooking.doubleBedRooms.map(
                                        (doubleBedroom) => (
                                          <p key={doubleBedroom._id}>
                                            Double Bedroom - Number:{" "}
                                            {doubleBedroom.number},
                                          </p>
                                        )
                                      )}
                                    </div>
                                    <div className="card-buttons">
                                      <Button
                                        color="danger"
                                        onClick={() =>
                                          handleCancelOrder(
                                            highBudgetBooking._id,
                                            highBudgetBooking.uptrip.date
                                          )
                                        }
                                      >
                                        Cancel Order
                                      </Button>

                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          handleGiveRating(
                                            highBudgetBooking._id,
                                            highBudgetBooking.tourId,
                                            "tour",
                                            highBudgetBooking.budgetType
                                          )
                                        }
                                        className="ml-2"
                                      >
                                        Rate Tour
                                      </Button>
                                      <Button
                                        color="primary"
                                        onClick={() =>
                                          handleGiveRating(
                                            highBudgetBooking._id,
                                            highBudgetBooking.hotelId,
                                            "hotel",
                                            highBudgetBooking.budgetType
                                          )
                                        }
                                        className="ml-2"
                                      >
                                        Rate Hotel
                                      </Button>
                                    </div>
                                  </CardBody>
                                </Card>
                              </Col>
                            )
                          )}
                        </Row>
                      </React.Fragment>
                    )}
                </React.Fragment>
              ))
            )}
          </Row>
        </Container>
      </section>
      <RatingModal
        isOpen={isRatingModalOpen}
        toggle={() => setIsRatingModalOpen(!isRatingModalOpen)}
        onSubmit={(rating, review) =>
          handleRatingSubmit(
            selectedRatingInfo.bookingId,
            rating,
            review,
            selectedRatingInfo.itemId,
            selectedRatingInfo.itemType,
            selectedRatingInfo.budgetType
          )
        }
        // onSubmit={() =>
        //     handleRatingSubmit(
        //       selectedRatingInfo.bookingId,
        //       ratingInfo.rating,
        //       ratingInfo.review,
        //       selectedRatingInfo.itemId,
        //       selectedRatingInfo.itemType,
        //       selectedRatingInfo.budgetType
        //     )
        //   }
      />
    </div>
  );
};

export default Bookinginfo;
