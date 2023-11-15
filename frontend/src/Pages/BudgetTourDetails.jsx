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
  Card,
  Button,
  CardBody,
  Input,
  Form,
  FormGroup,
} from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { useBookingInfo } from "../context/BookingContext";
import { useParams } from "react-router-dom";
import "../styles/BudgetTourDetails.css";
import { useNavigate } from "react-router-dom";

const BudgetTourDetails = () => {
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
  const [selectedHotel, setSelectedHotel] = useState(null);
  const navigate = useNavigate();
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

  console.log("hotel", hotelsData);

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
        const selectedHotel = hotelsData.hotels.find(
          (hotel) => hotel._id === hotelId
        );
        setSelectedHotelExtraPrices({
          seaFacingExtraPrice: selectedHotel.seaFacingExtraPrice || 0,
          hillFacingExtraPrice: selectedHotel.hillFacingExtraPrice || 0,
        });
        setBookingInfo((prevBookingInfo) => ({
          ...prevBookingInfo,
          // seaFacingExtraPrice: selectedHotel.seaFacingExtraPrice || 0,
          // hillFacingExtraPrice: selectedHotel.hillFacingExtraPrice || 0,
          singleBedPrice: selectedHotel.singleBedPrice || 0,
          doubleBedPrice: selectedHotel.doubleBedPrice || 0,
          allTravels: hotelsData.travels,
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
    const selectedSource = hotelsData?.travels.find(
      (travel) => travel._id === travelId
    )?.source;
    const selectedtime = hotelsData?.travels.find(
      (travel) => travel._id === travelId
    )?.time;
    setBookingInfo((prevBookingInfo) => ({
      ...prevBookingInfo,
      travelid: travelId,
      TravelTime: selectedTime,
      TravelCharge: selectedCharge,
      travelSource: selectedSource,
      travelAlltime: selectedtime,
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

  const handleCardClick = (hotelId) => {
    setSelectedHotel(hotelId);
    setSelectedHotels((prevSelectedHotels) => {
      if (prevSelectedHotels.includes(hotelId)) {
        return prevSelectedHotels.filter((id) => id !== hotelId);
      } else {
        const selectedHotel = hotelsData.hotels.find(
          (hotel) => hotel._id === hotelId
        );
        setSelectedHotelExtraPrices({
          seaFacingExtraPrice: selectedHotel.seaFacingExtraPrice || 0,
          hillFacingExtraPrice: selectedHotel.hillFacingExtraPrice || 0,
        });
        setBookingInfo((prevBookingInfo) => ({
          ...prevBookingInfo,
          // seaFacingExtraPrice: selectedHotel.seaFacingExtraPrice || 0,
          // hillFacingExtraPrice: selectedHotel.hillFacingExtraPrice || 0,
          singleBedPrice: selectedHotel.singleBedPrice || 0,
          doubleBedPrice: selectedHotel.doubleBedPrice || 0,
          allTravels: hotelsData.travels,
        }));
        return [...prevSelectedHotels, hotelId];
      }
    });
    setTimeout(() => {
      navigate(`/room/${hotelId}/${budgetType}`);
    }, 1000);
    // navigate(`/room/${hotelId}/${budgetType}`);
  };

  const [searchName, setSearchName] = useState("");
  const [searchDistance, setSearchDistance] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchFacing, setSearchFacing] = useState("all");
  const [searchDiscount, setSearchDiscount] = useState("all");
  // const filteredHotels = searchName
  //   ? hotelsData?.hotels?.filter((hotel) =>
  //       hotel.name.toLowerCase().includes(searchName.toLowerCase())
  //     )
  //   : hotelsData?.hotels;

  // const filteredHotels =
  //   hotelsData?.hotels?.filter((hotel) => {
  //     const nameMatch = hotel.name
  //       .toLowerCase()
  //       .includes(searchName.toLowerCase());
  //     const distanceMatch =
  //       !searchDistance || hotel.distance <= Number(searchDistance);
  //     const locationMatch = hotel.address
  //       .toLowerCase()
  //       .includes(searchLocation.toLowerCase());

  //     return nameMatch && distanceMatch && locationMatch;
  //   }) || hotelsData?.hotels;

  // console.log("faching",searchFacing)

  const filteredHotels =
    hotelsData?.hotels?.filter((hotel) => {
      const nameMatch = hotel.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const distanceMatch =
        !searchDistance || hotel.distance <= Number(searchDistance);
      const locationMatch = hotel.address
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
      const facingMatch =
        searchFacing === "sea"
          ? hotel.isSeaFacing
          : searchFacing === "hill"
          ? hotel.isHillFacing
          : true;
      const discountMatch =
        searchDiscount === "all" ||
        (searchDiscount === "discount" && hotel.discount.length > 0);

      return (
        nameMatch &&
        distanceMatch &&
        locationMatch &&
        facingMatch &&
        discountMatch
      );
    }) || hotelsData?.hotels;

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
                <div className="search__bar">
                  <Form className="d-flex align-items-center gap-4">
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                      <i class="ri-hotel-fill"></i>
                      <div>
                        <h6>Name</h6>
                        <input
                          type="text"
                          placeholder="Search Hotel Name"
                          value={searchName}
                          onChange={(e) => setSearchName(e.target.value)}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                      <i class="ri-map-pin-add-line"></i>
                      <div>
                        <h6>Distance</h6>
                        <input
                          type="number"
                          placeholder="Distance k/m"
                          value={searchDistance}
                          onChange={(e) => setSearchDistance(e.target.value)}
                        />
                      </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-last">
                      <i class="ri-search-eye-line"></i>
                      <div>
                        <h6>Facing</h6>
                        <Input
                          type="select"
                          value={searchFacing}
                          onChange={(e) => setSearchFacing(e.target.value)}
                          style={{
                            outline: "none !important",
                            marginTop: "10px",
                          }}
                        >
                          <option value="all">All</option>
                          <option value="sea">Sea Facing</option>
                          <option value="hill">Hill Facing</option>
                        </Input>
                      </div>
                    </FormGroup>
                    <FormGroup className="d-flex gap-3 form__group form__group-last">
                      <i class="ri-gift-line"></i>
                      <div>
                        <h6>Discount</h6>
                        <Input
                          type="select"
                          value={searchDiscount}
                          onChange={(e) => setSearchDiscount(e.target.value)}
                          style={{ outline: "none", marginTop: "10px" }}
                        >
                          {/* <option value="" disabled>
                            Discount
                          </option> */}
                          <option value="all">All</option>
                          <option value="discount">Discount</option>
                        </Input>
                      </div>
                    </FormGroup>
                    {/* <FormGroup className="d-flex gap-3 form__group form__group-last">
                      <i class="ri-map-pin-line"></i>
                      <div>
                        <h6>Address</h6>
                        <input
                        type="text"
                        placeholder="Search location"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                      />
                      </div>
                    </FormGroup> */}
                  </Form>
                </div>
                {/* <h2 className="text-center" style={{ marginTop: "40px" }}>
                  {budgetType === "LOW"
                    ? "Non-AC Bus Service"
                    : "AC Bus Service"}
                </h2> */}
                {budgetType === "LOW" && (
                  <h2 className="text-center" style={{ marginTop: "40px" }}>
                    3 Star Hotel
                  </h2>
                )}

                {budgetType === "MID" && (
                  <h2 className="text-center" style={{ marginTop: "40px" }}>
                    4 Star Hotel
                  </h2>
                )}

                {budgetType === "HIGH" && (
                  <h2 className="text-center" style={{ marginTop: "40px" }}>
                    5 Star Hotel
                  </h2>
                )}
                {filteredHotels.length > 0 ? (
                  <Row>
                    {/* {hotelsData?.hotels?.map((hotel) => ( */}
                    {filteredHotels?.map((hotel) => (
                      <Col lg="4" key={hotel._id}>
                        {/* <Link to={`/room/${hotel._id}/${budgetType}`}/> */}
                        <Card
                          className={`hotel-card ${
                            isHotelSelected(hotel._id) ? "selected" : ""
                          }`}
                          onClick={() => handleCardClick(hotel._id)}
                        >
                          <div className="card-image-container">
                            <Card>
                              <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="hotel-image"
                              />
                              {/* <CardBody>
                                <p>
                                  <h5 className="hotel-title">
                                    {hotel.name}
                                    {hotel.discount &&
                                      hotel.discount.length > 0 && (
                                        <span className="discount-badge">
                                          {hotel.discount[0].amount}% off{" "}
                                          {hotel.discount[0].to}
                                        </span>
                                      )}
                                  </h5>
                                </p>
                                <p className="hotel-address">{hotel.address}</p>
                              </CardBody> */}
                              <CardBody>
                                <p>
                                  <h5 className="hotel-title">{hotel.name}</h5>
                                  {hotel.discount &&
                                    hotel.discount.length > 0 && (
                                      <span className="discount-badge">
                                        Discounts {" "}
                                        {hotel.discount.map(
                                          (discount, index) => (
                                            <span key={index}>
                                              {discount.amount}% off{" "}
                                              {discount.to}
                                              {index !==
                                                hotel.discount.length - 1 &&
                                                ", "}
                                            </span>
                                          )
                                        )}
                                      </span>
                                    )}
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
                              {/* <Button
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
                            </Button> */}
                            </CardBody>
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div className="text-center pt-5">
                    <h4>No Hotels found</h4>
                  </div>
                )}
              </Container>
            </section>
            {/* <section className="travels-section pt-4">
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
            </section> */}
            {/* <section className="pt-0">
              <Container>
            
            <Button
              className="mt-2 ml-auto"
              color="white"

            >
              <Link to={`/room/${selectedHotel}/${budgetType}`}>Book Hotel Room</Link>
            </Button>
            </Container>
            </section> */}
          </>
        ) : (
          <div className="text-center pt-5">
            <h4>No Hotels available</h4>
          </div>
        ))}

      {/* <Newsletter /> */}
    </>
  );
};

export default BudgetTourDetails;
