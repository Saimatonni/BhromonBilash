import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import tourData from "../assets/data/tours";
import { Container, Row, Col, Card, Button, CardBody, Input } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { useBookingInfo } from "../context/BookingContext";
import { useParams } from "react-router-dom";
import "../styles/BudgetTourDetails.css";
import { Link } from "react-router-dom";

const BudgetTourDetails = () => {
  const [pageCount, setPageCount] = useState(0);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { id, budgetType } = useParams();
  const [selectedHotel, setSelectedHotel] = useState(null);
  useEffect(() => {
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      id: id,
      budgetType: budgetType,
    }));
  }, [id, budgetType]);

  const {
    data: hotelsData,
    loading,
    error,
  } = useFetch(
    `http://localhost:3000/api/hotel/all?budgetType=${budgetType}&tourId=${id}`
  );

  const [page, setPage] = useState(0);
  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
    window.scroll(0, 0);
  }, [page]);

  const [selectedHotels, setSelectedHotels] = useState([]);
  const [selectedHotelExtraPrices, setSelectedHotelExtraPrices] = useState({
    seaFacingExtraPrice: 0,
    hillFacingExtraPrice: 0,
  });

  const handleSelect = (hotelId) => {
    setSelectedHotel(hotelId);
    setSelectedHotels((prevSelectedHotels) => {
      if (prevSelectedHotels.includes(hotelId)) {
        return prevSelectedHotels.filter((id) => id !== hotelId);
      } else {
        const selectedHotel = hotelsData.hotels.find((hotel) => hotel._id === hotelId);
      setSelectedHotelExtraPrices({
        seaFacingExtraPrice: selectedHotel.seaFacingExtraPrice || 0,
        hillFacingExtraPrice: selectedHotel.hillFacingExtraPrice || 0,
      });
      setBookingInfo((prevBookingInfo) => ({
        ...prevBookingInfo,
        seaFacingExtraPrice: selectedHotel.seaFacingExtraPrice || 0,
        hillFacingExtraPrice: selectedHotel.hillFacingExtraPrice || 0,
        singleBedPrice: selectedHotel.singleBedPrice || 0,
        doubleBedPrice: selectedHotel.doubleBedPrice || 0,
      }));
        return [...prevSelectedHotels, hotelId];
      }
    });
  };

  const isHotelSelected = (hotelId) => selectedHotels.includes(hotelId);

  const [selectedTravelTimes, setSelectedTravelTimes] = useState({});

  const handleSelectTravelTime = (event, travelId) => {
    setSelectedTravelTimes((prevSelectedTravelTimes) => ({
      ...prevSelectedTravelTimes,
      [travelId]: event.target.value,
    }));
  };

  const [selectedTravels, setSelectedTravels] = useState([]);

  const handleSelectTravels = (travelId) => {
    const selectedTime = selectedTravelTimes[travelId];
    const selectedCharge = hotelsData?.travels.find(
      (travel) => travel._id === travelId
    )?.charge;
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      travelid: travelId,
      TravelTime: selectedTime,
      TravelCharge: selectedCharge,
    }));
    setSelectedTravels((prevSelectedHotels) => {
      if (prevSelectedHotels.includes(travelId)) {
        return prevSelectedHotels.filter((id) => id !== travelId);
      } else {
        return [...prevSelectedHotels, travelId];
      }
    });
  };

  const isTravelSelected = (travelId) => selectedTravels.includes(travelId);

  // console.log("booking info", bookingInfo);

  // useEffect(() => {
  //   console.log("Selected Travel Times:");
  //   Object.entries(selectedTravelTimes).forEach(([travelId, time]) => {
  //     console.log(`Travel ID: ${travelId}, Time: ${time}`);
  //   });
  // }, [selectedTravelTimes]);

  return (
    <>
      <CommonSection title={"All Hotels in Your Budget"} />
      {loading && <h4 className="text-center pt-5">Loading......</h4>}
      {error && <h4 className="text-center pt-5">{error}</h4>}
      {!loading &&
        !error &&
        (hotelsData && hotelsData?.hotels?.length > 0 ? (
          <>
            <section className="pt-0">
              <Container>
                <Row>
                  {hotelsData?.hotels?.map((hotel) => (
                    <Col lg="4" key={hotel._id}>
                      <Card
                        className={`hotel-card ${
                          isHotelSelected(hotel._id) ? "selected" : ""
                        }`}
                      >
                        <div className="card-image-container">
                          <Card>
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="hotel-image"
                            />
                            <CardBody>
                              <p>
                                <h5 className="hotel-title">
                                  {hotel.name}
                                  {hotel.discount &&
                                    hotel.discount.length > 0 && (
                                      <span className="discount-badge">
                                        {hotel.discount[0].amount}% off
                                      </span>
                                    )}
                                </h5>
                              </p>
                              <p className="hotel-address">{hotel.address}</p>
                            </CardBody>
                          </Card>
                          <CardBody className="card-body-info">
                            <h5 className="hotel-title">{hotel.name}</h5>
                            <p className="hotel-description">
                              {hotel.description}
                            </p>
                            <p className="hotel-details">
                              Address: {hotel.address}
                            </p>
                            <p className="hotel-details">
                              Single Bed Price: ${hotel.singleBedPrice}
                            </p>
                            <p className="hotel-details">
                              Double Bed Price: ${hotel.doubleBedPrice}
                            </p>
                            {hotel.isSeaFacing && (
                              <p className="sea-facing-details">
                                Sea Facing Extra Price: $
                                {hotel.seaFacingExtraPrice}
                              </p>
                            )}
                            {hotel.isHillFacing && (
                              <p className="hill-facing-details">
                                Hill Facing Extra Price: $
                                {hotel.hillFacingExtraPrice}
                              </p>
                            )}
                            <p className="hotel-details">
                              Distance: {hotel.distance} km
                            </p>
                            <Button
                              className={`book-button mt-2 ml-auto ${
                                isHotelSelected(hotel._id) ? "selected" : ""
                              }`}
                              style={{
                                backgroundColor: isHotelSelected(hotel._id)
                                  ? "#4CAF50"
                                  : "",
                              }}
                              color="primary"
                              onClick={() => handleSelect(hotel._id)}
                            >
                              {isHotelSelected(hotel._id)
                                ? "Selected Hotel"
                                : "Select"}
                            </Button>
                          </CardBody>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Container>
            </section>
            <section className="travels-section pt-4">
              <div className="text-center pt-10 mb-20">
                <h2 className="">Travels available</h2>
              </div>
              <Container>
                {hotelsData && hotelsData?.travels?.length > 0 ? (
                  <Row>
                    {hotelsData?.travels?.map((travel) => (
                      <Col lg="4" key={travel._id}>
                        <Card className="travel-card">
                          <CardBody>
                            <h5 className="travel-title">{travel.source}</h5>
                            <p className="travel-details">
                              Time:{" "}
                              <Input
                                type="select"
                                value={selectedTravelTimes[travel._id] || ""}
                                onChange={(event) =>
                                  handleSelectTravelTime(event, travel._id)
                                }
                              >
                                <option value="" disabled>
                                  Select a time
                                </option>
                                {travel.time.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </Input>
                            </p>
                            <p className="travel-details">
                              Charge: ${travel.charge}
                            </p>
                            <Button
                              className={`book-button mt-2 ml-auto ${
                                isTravelSelected(travel._id) ? "selected" : ""
                              }`}
                              style={{
                                backgroundColor: isTravelSelected(travel._id)
                                  ? "#4CAF50"
                                  : "",
                              }}
                              color="primary"
                              onClick={() => handleSelectTravels(travel._id)}
                            >
                              {isTravelSelected(travel._id)
                                ? "Selected"
                                : "Select"}
                            </Button>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center pt-5">
                    <h4>No Travels available</h4>
                  </div>
                )}
              </Container>
            </section>
            <section className="pt-0">
              <Container>
            
            <Button
              className="mt-2 ml-auto"
              color="white"

            >
              <Link to={`/room/${selectedHotel}/${budgetType}`}>Book Hotel Room</Link>
            </Button>
            </Container>
            </section>
          </>
        ) : (
          <div className="text-center pt-5">
            <h4>No Hotels available</h4>
          </div>
        ))}

      <Newsletter />
    </>
  );
};

export default BudgetTourDetails;
