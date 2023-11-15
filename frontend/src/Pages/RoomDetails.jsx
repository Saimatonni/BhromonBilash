import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import tourData from "../assets/data/tours";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Input,
  Card,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { useBookingInfo } from "../context/BookingContext";
import { useParams } from "react-router-dom";
import "../styles/room-details.css";
import { Link } from "react-router-dom";
import Booking from "../components/Booking/Booking";
import Subtitle from "../shared/Subtitle";
import { useLocation } from "react-router-dom";

const RoomDetails = () => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      window.location.href = "/tours";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const [pageCount, setPageCount] = useState(0);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { id, budgetType } = useParams();
  const [page, setPage] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const locationState = location.state;
    if (locationState && locationState.bookingInfo) {
      setBookingInfo(locationState.bookingInfo);
      console.log("locaton booking", locationState.bookingInfo);
    }
  }, [location.state, setBookingInfo]);

  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
    window.scroll(0, 0);
  }, [page]);

  const {
    data: RoomsData,
    loading,
    error,
  } = useFetch(
    `http://localhost:3000/api/hotel?budgetType=${budgetType}&hotelId=${id}`
  );

  const options = { day: "numeric", month: "long", year: "numeric" };
  const [startBookingDate, setStartBookingDate] = useState("");
  const [endBookingDate, setEndBookingDate] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [singleBedCount, setSingleBedCount] = useState(0);
  const [doubleBedCount, setDoubleBedCount] = useState(0);
  const [seaFacingSingleBedCount, setSeaFacingSingleBedCount] = useState(0);
  const [seaFacingDoubleBedCount, setSeaFacingDoubleBedCount] = useState(0);
  const [hillFacingSingleBedCount, setHillFacingSingleBedCount] = useState(0);
  const [hillFacingDoubleBedCount, setHillFacingDoubleBedCount] = useState(0);

  const toggleRoomSelection = (roomId) => {
    if (!startBookingDate || !endBookingDate) {
      alert("Please provide booking dates before selecting a room.");
      return;
    }
    let updatedSelectedRooms;
    if (selectedRooms.includes(roomId)) {
      updatedSelectedRooms = selectedRooms.filter((id) => id !== roomId);
    } else {
      updatedSelectedRooms = [...selectedRooms, roomId];
    }

    const countSelectedBeds = (rooms) => {
      let singleCount = 0;
      let doubleCount = 0;
      let seaFacingSingleBedCount = 0;
      let seaFacingDoubleBedCount = 0;
      let hillFacingSingleBedCount = 0;
      let hillFacingDoubleBedCount = 0;
      const bookedDates = {};

      rooms.forEach((roomId) => {
        const room = RoomsData.flatMap((hotel) => hotel.singleBedRooms).find(
          (room) => room._id === roomId
        );

        const doubleBedRoom = RoomsData.flatMap(
          (hotel) => hotel.doubleBedRooms
        ).find((room) => room._id === roomId);

        if (room) {
          singleCount++;
          if (room.seaFacing) {
            seaFacingSingleBedCount++;
          }

          if (room.hillFacing) {
            hillFacingSingleBedCount++;
          }
        }

        if (doubleBedRoom) {
          doubleCount++;
          if (doubleBedRoom.seaFacing) {
            seaFacingDoubleBedCount++;
          }

          if (doubleBedRoom.hillFacing) {
            hillFacingDoubleBedCount++;
          }
        }
      });

      setSingleBedCount(singleCount);
      setDoubleBedCount(doubleCount);
      setSeaFacingSingleBedCount(seaFacingSingleBedCount);
      setSeaFacingDoubleBedCount(seaFacingDoubleBedCount);
      setHillFacingSingleBedCount(hillFacingSingleBedCount);
      setHillFacingDoubleBedCount(hillFacingDoubleBedCount);
    };

    countSelectedBeds(updatedSelectedRooms);

    const selectedRoomNumbers = updatedSelectedRooms.map((roomId) => {
      const room = RoomsData.flatMap((hotel) => [
        ...hotel.singleBedRooms,
        ...hotel.doubleBedRooms,
      ]).find((room) => room._id === roomId);

      return room.number;
    });

    const bookedDates = updatedSelectedRooms.flatMap((roomId) => {
      const room = RoomsData.flatMap((hotel) => [
        ...hotel.singleBedRooms,
        ...hotel.doubleBedRooms,
      ]).find((room) => room._id === roomId);

      // return room;
      return {
        number: room.number,
        bookedDates: room.bookedDates,
      };
    });

    const selectedRoomDetails = updatedSelectedRooms.flatMap((roomId) => {
      const room = RoomsData.flatMap((hotel) => [
        ...hotel.singleBedRooms,
        ...hotel.doubleBedRooms,
      ]).find((room) => room._id === roomId);

      return room;
      // return {
      //   number: room.number,
      //   datesstart: room.bookedDates.start,
      //   dateend: room.bookedDates.end,
      // };
    });

    // const BookedDates = RoomsData.flatMap((hotel) => hotel.singleBedRooms).filter(
    //   (room) => room._id === roomId
    // );

    const room3 = RoomsData.map((hotel) => hotel.seaFacingExtraPrice)[0];
    const room4 = RoomsData.map((hotel) => hotel.hillFacingExtraPrice)[0];

    const hilling = RoomsData.flatMap((hotel) => hotel.singleBedRooms).filter(
      (room) => room._id === roomId && room.hillFacing === true
    );

    const hilling2 = RoomsData.flatMap((hotel) => hotel.doubleBedRooms).filter(
      (room) => room._id === roomId && room.hillFacing === true
    );

    const sea = RoomsData.flatMap((hotel) => hotel.singleBedRooms).filter(
      (room) => room._id === roomId && room.seaFacing === true
    );

    const sea2 = RoomsData.flatMap((hotel) => hotel.doubleBedRooms).filter(
      (room) => room._id === roomId && room.seaFacing === true
    );

    setBookingInfo({
      ...bookingInfo,
      selectedRooms: selectedRoomNumbers,
      // seaFacingPrice : room3,
      // hillFacingPrice : room4,
      // SeafacingSingleBedTrue:  sea.length,
      // SeafacingDoubleBedTrue:  sea2.length,
      // HillfacingSingleBedTrue:  hilling.length,
      // HillfacingDoubleBedTrue:  hilling2.length,
      // seahillingSingleExtraPrice: room4 * hilling.length + room3 * sea.length,
      // seahillingDoubleExtraPrice: room4 * hilling2.length + room3 * sea2.length,
      selectedRoomDetails: selectedRoomDetails,
      bookedDates: bookedDates,
    });

    setSelectedRooms(updatedSelectedRooms);
  };

  useEffect(() => {
    const room1 = RoomsData.map((hotel) => hotel.singleBedPrice)[0];
    const room2 = RoomsData.map((hotel) => hotel.doubleBedPrice)[0];
    const room3 = RoomsData.map((hotel) => hotel.seaFacingExtraPrice)[0];
    const room4 = RoomsData.map((hotel) => hotel.hillFacingExtraPrice)[0];

    const discount = RoomsData.length > 0 ? RoomsData[0].discount : [];

    const singleBedDiscount =
      discount && discount.find((item) => item.to === "SINGLE");
    const doubleBedDiscount =
      discount && discount.find((item) => item.to === "DOUBLE");
    const allBedDiscount = discount.find((item) => item.to === "ALL");

    const singleBedDiscountAmount = singleBedDiscount
      ? (room1 * singleBedCount * singleBedDiscount.amount) / 100
      : 0;

    const doubleBedDiscountAmount = doubleBedDiscount
      ? (room2 * doubleBedCount * doubleBedDiscount.amount) / 100
      : 0;

    const allsinglediscount = allBedDiscount
      ? (room1 * singleBedCount * allBedDiscount.amount) / 100
      : 0;

    const alldoublediscount = allBedDiscount
      ? (room2 * doubleBedCount * allBedDiscount.amount) / 100
      : 0;

    const singleBedExtraPriceDiscount = singleBedDiscount
      ? (room3 * seaFacingSingleBedCount * singleBedDiscount.amount) / 100 +
        (room4 * hillFacingSingleBedCount * singleBedDiscount.amount) / 100
      : 0;

    const singleBedExtraPriceDiscountall = allBedDiscount
      ? (room3 * seaFacingSingleBedCount * allBedDiscount.amount) / 100 +
        (room4 * hillFacingSingleBedCount * allBedDiscount.amount) / 100
      : 0;

    const doubleBedExtraPriceDiscount = doubleBedDiscount
      ? (room3 * seaFacingDoubleBedCount * doubleBedDiscount.amount) / 100 +
        (room4 * hillFacingDoubleBedCount * doubleBedDiscount.amount) / 100
      : 0;

    const doubleBedExtraPriceDiscountall = allBedDiscount
      ? (room3 * seaFacingDoubleBedCount * allBedDiscount.amount) / 100 +
        (room4 * hillFacingDoubleBedCount * allBedDiscount.amount) / 100
      : 0;

    const selectedSingleBedIds = selectedRooms.filter((roomId) => {
      const room = RoomsData.flatMap((hotel) => hotel.singleBedRooms).find(
        (room) => room._id === roomId
      );
      return room !== undefined;
    });

    const selectedDoubleBedIds = selectedRooms.filter((roomId) => {
      const room = RoomsData.flatMap((hotel) => hotel.doubleBedRooms).find(
        (room) => room._id === roomId
      );
      return room !== undefined;
    });

    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      hotelId: id,
      budgetType: budgetType,
      singleBedDiscountAmount: singleBedDiscountAmount + allsinglediscount,
      doubleBedDiscountAmount: doubleBedDiscountAmount + alldoublediscount,
      singleBedPricetotal: room1 * singleBedCount,
      doubleBedPricetotal: room2 * doubleBedCount,
      singleBedExtraPriceDiscount:
        singleBedExtraPriceDiscount + singleBedExtraPriceDiscountall,
      doubleBedExtraPriceDiscount:
        doubleBedExtraPriceDiscount + doubleBedExtraPriceDiscountall,
      singleBedCount: singleBedCount,
      doubleBedCount: doubleBedCount,
      selectedSingleBedIds: selectedSingleBedIds,
      selectedDoubleBedIds: selectedDoubleBedIds,
      seaFacingPrice: room3,
      hillFacingPrice: room4,
      startBookingDate: startBookingDate,
      endBookingDate: endBookingDate,
      // SeafacingSingleBedTrue: seaFacingSingleBedCount,
      // SeafacingDoubleBedTrue: seaFacingDoubleBedCount,
      // HillfacingSingleBedTrue: hillFacingSingleBedCount,
      // HillfacingDoubleBedTrue: hillFacingDoubleBedCount,
      seahillingSingleExtraPrice:
        room4 * hillFacingSingleBedCount + room3 * seaFacingSingleBedCount,
      seahillingDoubleExtraPrice:
        room4 * hillFacingDoubleBedCount + room3 * seaFacingDoubleBedCount,
      // selectedRoomsInfo: selectedRooms.map((roomId) => {
      //   const room = RoomsData.flatMap((hotel) => [
      //     ...hotel.singleBedRooms,
      //     ...hotel.doubleBedRooms,
      //   ]).find((room) => room._id === roomId);

      //   return {
      //     id: room._id,
      //     type: room.singleBed ? "Single Bed" : "Double Bed",
      //   };
      // }),
    }));
  }, [
    id,
    budgetType,
    selectedRooms,
    singleBedCount,
    doubleBedCount,
    endBookingDate,
    startBookingDate,
  ]);

  console.log("selected room", selectedRooms);

  console.log("booking info", bookingInfo);

  const handleStartBookingDateChange = (event) => {
    setStartBookingDate(event.target.value);
  };

  const handleEndBookingDateChange = (event) => {
    setEndBookingDate(event.target.value);
  };

  const isRoomAvailable = (room) => {
    if (room.bookedDates.length === 0) {
      return true;
    }

    for (const bookedDate of room.bookedDates) {
      const startDate = new Date(bookedDate.start);
      const endDate = new Date(bookedDate.end);
      const bookingStartDate = new Date(startBookingDate);
      const bookingEndDate = new Date(endBookingDate);
      bookingStartDate.setDate(bookingStartDate.getDate() + 1);
      bookingEndDate.setDate(bookingEndDate.getDate() + 1);

      // console.log("dates...",startDate,endDate,bookingStartDate,bookingEndDate)

      if (
        (bookingStartDate >= startDate && bookingStartDate <= endDate) ||
        (bookingEndDate >= startDate && bookingEndDate <= endDate) ||
        (startDate >= bookingStartDate && startDate <= bookingEndDate) ||
        (endDate >= bookingStartDate && endDate <= bookingEndDate)
      ) {
        return false;
      }
    }

    return true;
  };

  // ...

  useEffect(() => {
    const updatedSelectedRooms = selectedRooms.filter((roomId) => {
      const room = RoomsData.flatMap((hotel) => [
        ...hotel.singleBedRooms,
        ...hotel.doubleBedRooms,
      ]).find((room) => room._id === roomId);

      return isRoomAvailable(room);
    });
    setSelectedRooms(updatedSelectedRooms);
    const countSelectedBeds = (rooms) => {
      let singleCount = 0;
      let doubleCount = 0;
      let seaFacingSingleBedCount = 0;
      let seaFacingDoubleBedCount = 0;
      let hillFacingSingleBedCount = 0;
      let hillFacingDoubleBedCount = 0;

      rooms.forEach((roomId) => {
        const room = RoomsData.flatMap((hotel) => hotel.singleBedRooms).find(
          (room) => room._id === roomId
        );

        const doubleBedRoom = RoomsData.flatMap(
          (hotel) => hotel.doubleBedRooms
        ).find((room) => room._id === roomId);

        if (room) {
          singleCount++;
          if (room.seaFacing) {
            seaFacingSingleBedCount++;
          }

          if (room.hillFacing) {
            hillFacingSingleBedCount++;
          }
        }

        if (doubleBedRoom) {
          doubleCount++;
          if (doubleBedRoom.seaFacing) {
            seaFacingDoubleBedCount++;
          }

          if (doubleBedRoom.hillFacing) {
            hillFacingDoubleBedCount++;
          }
        }
      });

      setSingleBedCount(singleCount);
      setDoubleBedCount(doubleCount);
      setSeaFacingSingleBedCount(seaFacingSingleBedCount);
      setSeaFacingDoubleBedCount(seaFacingDoubleBedCount);
      setHillFacingSingleBedCount(hillFacingSingleBedCount);
      setHillFacingDoubleBedCount(hillFacingDoubleBedCount);
    };
    countSelectedBeds(updatedSelectedRooms);
  }, [startBookingDate, endBookingDate, RoomsData]);

  return (
    <>
      <section className="pt-0">
        <Container>
          <CommonSection title={"All Rooms in Your Hotels"} />
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && RoomsData && (
            <Row>
              <Col lg="">
                {RoomsData.map((hotel) => (
                  <>
                    <div style={{ marginTop: "30px" }}>
                      <Subtitle Subtitle={hotel.name} />
                    </div>
                    <div
                      style={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        border: "1px solid #ccc",
                        padding: "20px",
                      }}
                    >
                      <Row className="mb-3 ">
                        <Col>
                          <h5 className="text-center">
                            Single Bed Price: ${hotel.singleBedPrice}
                          </h5>
                        </Col>
                        <Col>
                          <h5 className="text-center">
                            Double Bed Price: ${hotel.doubleBedPrice}
                          </h5>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col>
                          <h5 className="text-center">
                            Sea Facing Extra Price: ${hotel.seaFacingExtraPrice}
                          </h5>
                        </Col>
                        <Col>
                          <h5 className="text-center">
                            Hill Facing Extra Price: $
                            {hotel.hillFacingExtraPrice}
                          </h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {hotel.discount && hotel.discount.length > 0 && (
                             <div className="discount-section">
                             <span className="discount-badge">
                               Discounts{" "}
                               {hotel.discount.map((discount, index) => (
                                 <span
                                   key={index}
                                   className="highlighted-discount"
                                 >
                                   {discount.amount}% off {discount.to}
                                   {index !== hotel.discount.length - 1 && ", "}
                                 </span>
                               ))}
                             </span>
                           </div>
                          )}
                        </Col>
                      </Row>
                    </div>
                    <div className="booking__bottom">
                      <Row className="mb-3">
                        <Col>
                          <Form>
                            <FormGroup>
                              <Label for="startBookingDate">
                                Start Booking Date:
                              </Label>
                              <Input
                                type="date"
                                name="startBookingDate"
                                id="startBookingDate"
                                value={startBookingDate}
                                onChange={handleStartBookingDateChange}
                                style={{ width: "350px" }}
                              />
                            </FormGroup>
                          </Form>
                        </Col>
                        <Col>
                          <Form>
                            <FormGroup>
                              <Label for="endBookingDate">
                                End Booking Date:
                              </Label>
                              <Input
                                type="date"
                                name="endBookingDate"
                                id="endBookingDate"
                                value={endBookingDate}
                                onChange={handleEndBookingDateChange}
                                style={{ width: "350px" }}
                              />
                            </FormGroup>
                          </Form>
                        </Col>
                      </Row>
                    </div>
                    {/* <Col
                      key={hotel._id}
                      md={6}
                      className="mb-4 RoomDetails-section"
                    > */}
                    {hotel.singleBedRooms.length > 0 && (
                      <>
                        <h4 className="RoomDetails-roomTypeHeading">
                          Single Bed Rooms:
                        </h4>
                        <Row>
                          {hotel.singleBedRooms.map((room) => (
                            <Col lg="3" key={room._id}>
                              {/* <Card
                                  className={`room-card ${
                                    selectedRooms.includes(room._id)
                                      ? "selected"
                                      : ""
                                  }`}
                                  key={room._id}
                                  onClick={() => toggleRoomSelection(room._id)}
                                > */}
                              <Card
                                className={`room-card ${
                                  selectedRooms.includes(room._id)
                                    ? "selected"
                                    : ""
                                } ${
                                  !isRoomAvailable(room) ? "unavailable" : ""
                                }`}
                                key={room._id}
                                onClick={() =>
                                  isRoomAvailable(room) &&
                                  toggleRoomSelection(room._id)
                                }
                                style={{
                                  pointerEvents: isRoomAvailable(room)
                                    ? "auto"
                                    : "none",
                                }}
                              >
                                <CardBody>
                                  <h5 className="mb-3">
                                    Room Number: {room.number}
                                  </h5>
                                  <p>
                                    {room.seaFacing
                                      ? "Have SeaFacing"
                                      : "No SeaFacing"}
                                    ,
                                    {room.hillFacing
                                      ? "Have HillFaching"
                                      : "No HillFacing"}
                                  </p>
                                  {!isRoomAvailable(room) && (
                                    <p className="unavailable-text">
                                      Not available
                                    </p>
                                  )}
                                </CardBody>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </>
                    )}

                    {/* Double Bed Rooms */}
                    {hotel.doubleBedRooms.length > 0 && (
                      <>
                        <h4 className="RoomDetails-roomTypeHeading">
                          Double Bed Rooms:
                        </h4>
                        <Row>
                          {hotel.doubleBedRooms.map((room) => (
                            <Col lg="3" key={room._id}>
                              {/* <Card
                                  className={`room-card ${
                                    selectedRooms.includes(room._id)
                                      ? "selected"
                                      : ""
                                  }`}
                                  key={room._id}
                                  onClick={() => toggleRoomSelection(room._id)}
                                > */}
                              <Card
                                className={`room-card ${
                                  selectedRooms.includes(room._id)
                                    ? "selected"
                                    : ""
                                } ${
                                  !isRoomAvailable(room) ? "unavailable" : ""
                                }`}
                                key={room._id}
                                onClick={() =>
                                  isRoomAvailable(room) &&
                                  toggleRoomSelection(room._id)
                                }
                                style={{
                                  pointerEvents: isRoomAvailable(room)
                                    ? "auto"
                                    : "none",
                                }}
                              >
                                <CardBody>
                                  <h5 className="mb-3">
                                    Room Number: {room.number}
                                  </h5>
                                  <p>
                                    {room.seaFacing
                                      ? "Have SeaFacing"
                                      : "No SeaFacing"}{" "}
                                    ,
                                    {room.hillFacing
                                      ? "Have HillFaching"
                                      : "No HillFacing"}
                                  </p>
                                  {!isRoomAvailable(room) && (
                                    <p className="unavailable-text">
                                      Not available
                                    </p>
                                  )}
                                </CardBody>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </>
                    )}
                    {hotel.reviews.length > 0 && (
                      <>
                        <h4>Reviews:</h4>

                        <ListGroup className="user__reviews">
                          {hotel.reviews?.map((review, index) => (
                            <div className="review__item">
                              <img
                                src={review.userImage}
                                alt={review.userName}
                              />
                              <div className="w-100">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div>
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

                                <h6>{review.review}</h6>
                              </div>
                            </div>
                          ))}
                        </ListGroup>
                      </>
                    )}
                    {/* </Col> */}
                  </>
                ))}
              </Col>
            </Row>
          )}
          <Row>
            <h1>Booking From</h1>
            <Col lg="10" className="RoomDetails-bookingSection">
              <Booking />
            </Col>
          </Row>
        </Container>
      </section>
      {/* <Newsletter /> */}
    </>
  );
};

export default RoomDetails;
