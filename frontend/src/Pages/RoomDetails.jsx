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
} from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { useBookingInfo } from "../context/BookingContext";
import { useParams } from "react-router-dom";
import "../styles/room-details.css";
import { Link } from "react-router-dom";
import Booking from "../components/Booking/Booking";

const RoomDetails = () => {
  const [pageCount, setPageCount] = useState(0);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { id, budgetType } = useParams();
  const [page, setPage] = useState(0);

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

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [singleBedCount, setSingleBedCount] = useState(0);
  const [doubleBedCount, setDoubleBedCount] = useState(0);

  const toggleRoomSelection = (roomId) => {
    let updatedSelectedRooms;
    if (selectedRooms.includes(roomId)) {
      updatedSelectedRooms = selectedRooms.filter((id) => id !== roomId);
    } else {
      updatedSelectedRooms = [...selectedRooms, roomId];
    }

    const countSelectedBeds = (rooms) => {
      let singleCount = 0;
      let doubleCount = 0;

      rooms.forEach((roomId) => {
        const room = RoomsData.flatMap((hotel) => hotel.singleBedRooms).find(
          (room) => room._id === roomId
        );

        const doubleBedRoom = RoomsData.flatMap(
          (hotel) => hotel.doubleBedRooms
        ).find((room) => room._id === roomId);

       

        if (room) {
          singleCount++;
        }

        if (doubleBedRoom) {
          doubleCount++;
        }
      });

      setSingleBedCount(singleCount);
      setDoubleBedCount(doubleCount);
    };

    countSelectedBeds(updatedSelectedRooms);

    const selectedRoomNumbers = updatedSelectedRooms.map((roomId) => {
      const room = RoomsData.flatMap((hotel) => [
        ...hotel.singleBedRooms,
        ...hotel.doubleBedRooms,
      ]).find((room) => room._id === roomId);

      return room.number;
    });

    const room3 = RoomsData.map((hotel) => hotel.seaFacingExtraPrice)[0];
    const room4 = RoomsData.map((hotel) => hotel.hillFacingExtraPrice)[0];

    const hilling = RoomsData.flatMap(
      (hotel) => hotel.singleBedRooms
    ).filter((room) => room._id === roomId && room.hillFacing === true);

    const hilling2 = RoomsData.flatMap(
      (hotel) => hotel.doubleBedRooms
    ).filter((room) => room._id === roomId && room.hillFacing === true);

    const sea = RoomsData.flatMap(
      (hotel) => hotel.singleBedRooms
    ).filter((room) => room._id === roomId && room.seaFacing === true);

    const sea2 = RoomsData.flatMap(
      (hotel) => hotel.doubleBedRooms
    ).filter((room) => room._id === roomId && room.seaFacing === true);

    setBookingInfo({
      ...bookingInfo,
      selectedRooms: selectedRoomNumbers,
      hillingExtraPrice: room4 * hilling.length + room4 * hilling2.length,
      seaExtraPrice: room3 * sea.length + room3 * sea2.length,
    });

    setSelectedRooms(updatedSelectedRooms);
  };

  useEffect(() => {
    const room1 = RoomsData.map((hotel) => hotel.singleBedPrice)[0];
    const room2 = RoomsData.map((hotel) => hotel.doubleBedPrice)[0];
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      hotelId: id,
      budgetType: budgetType,
      singleBedPrice: room1 * singleBedCount,
      doubleBedPrice: room2 * doubleBedCount,
      selectedRoomsInfo: selectedRooms.map((roomId) => {
        const room = RoomsData.flatMap((hotel) => [
          ...hotel.singleBedRooms,
          ...hotel.doubleBedRooms,
        ]).find((room) => room._id === roomId);

        return {
          id: room._id,
          type: room.singleBed ? "Single Bed" : "Double Bed",
        };
      }),
    }));
  }, [id, budgetType, selectedRooms, singleBedCount, doubleBedCount]);

  console.log("selected room", selectedRooms);

  console.log("booking info", bookingInfo);

  return (
    <>
      <section className="pt-0">
        <Container>
          <CommonSection title={"All Rooms in Your Hotels"} />
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && RoomsData && (
            <Row>
              <Col lg="8">
                {RoomsData.map((hotel) => (
                  <Col
                    key={hotel._id}
                    md={6}
                    className="mb-4 RoomDetails-section"
                  >
                    <h1 className="RoomDetails-hotelName">{hotel.name}</h1>

                    {hotel.singleBedRooms.length > 0 && (
                      <>
                        <h4 className="RoomDetails-roomTypeHeading">
                          Single Bed Rooms:
                        </h4>
                        {/* <Row> */}
                        {hotel.singleBedRooms.map((room) => (
                          // <Col lg="5" key={room._id}>
                          <Card
                            className={`room-card ${
                              selectedRooms.includes(room._id) ? "selected" : ""
                            }`}
                            key={room._id}
                            onClick={() => toggleRoomSelection(room._id)}
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
                            </CardBody>
                          </Card>
                          // </Col>
                        ))}
                        {/* </Row> */}
                      </>
                    )}

                    {/* Double Bed Rooms */}
                    {hotel.doubleBedRooms.length > 0 && (
                      <>
                        <h4 className="RoomDetails-roomTypeHeading">
                          Double Bed Rooms:
                        </h4>
                        {/* <Row> */}
                        {hotel.doubleBedRooms.map((room) => (
                          // <Col lg="5" key={room._id}>
                          <Card
                            className={`room-card ${
                              selectedRooms.includes(room._id) ? "selected" : ""
                            }`}
                            key={room._id}
                            onClick={() => toggleRoomSelection(room._id)}
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
                            </CardBody>
                          </Card>
                          // </Col>
                        ))}
                        {/* </Row> */}
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
                  </Col>
                ))}
              </Col>
              <Col lg="4" className="RoomDetails-bookingSection">
                <Booking />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default RoomDetails;
