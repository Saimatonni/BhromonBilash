import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import tourData from "../assets/data/tours";
import { Container, Row, Col, Card, Button, CardBody } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { useBookingInfo } from "../context/BookingContext";
import { useParams } from "react-router-dom";
import "../styles/BudgetTourDetails.css";

const BudgetTourDetails = () => {
  const [pageCount, setPageCount] = useState(0);
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const { id, budgetType } = useParams();
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

  const hotelDetails = hotelsData?.hotels || [];

  console.log("hotels data", hotelsData);
  console.log("hotels data", hotelDetails);

  const [page, setPage] = useState(0);
  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
    window.scroll(0, 0);
  }, [page]);
  return (
    <>
      <CommonSection title={"All Hotels in Your Budget"} />
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading &&
            !error &&
            (hotelsData && hotelsData?.hotels?.length > 0 ? (
              <Row>
                {hotelsData?.hotels?.map((hotel) => (
                  <Col lg="4" key={hotel._id}>
                    <Card className="mb-4">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="hotel-image"
                      />
                    </Card>
                    <CardBody>
                      <h5 className="hotel-title">{hotel.name}</h5>
                      <p className="hotel-description">{hotel.description}</p>
                      <p className="hotel-details">Address: {hotel.address}</p>
                      <p className="hotel-details">
                        Single Bed Price: ${hotel.singleBedPrice}
                      </p>
                      <p className="hotel-details">
                        Double Bed Price: ${hotel.doubleBedPrice}
                      </p>
                      <p className="hotel-details">
                        Distance: {hotel.distance} km
                      </p>
                      <Button className="book-button" color="primary">
                        Book Now
                      </Button>
                    </CardBody>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center pt-5">
                <h4>No Hotels available</h4>
              </div>
            ))}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default BudgetTourDetails;
