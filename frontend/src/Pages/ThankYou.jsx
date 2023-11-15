import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/thank-you.css";

const ThankYou = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  console.log("booking data in thank you", bookingData);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i class="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">your tour is booked.</h3>
              {/* <Button className='btn primary__btn w-12'><Link to ='/home'>Back to Home</Link></Button> */}
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col lg="12" className="d-flex justify-content-center">
            <Card className="tour-card">
              <CardBody>
                <CardTitle tag="h5" className="card-title text-center">
                  {bookingData.tourName}
                </CardTitle>
              </CardBody>
              <CardImg
                top
                width="100%"
                src={bookingData.tourImages[0]}
                alt="Tour Image"
                className="card-image"
              />
              <CardBody>
                <p className="card-text">Hotel: {bookingData.hotelName}</p>
                <p className="card-text">
                  Uptrip Date:{" "}
                  {/* {new Date(bookingData.uptrip.date).toLocaleDateString()} */}
                  {new Date(
                    new Date(bookingData.uptrip.date).setDate(
                      new Date(bookingData.uptrip.date).getDate() - 1
                    )
                  ).toDateString()}
                </p>
                <p className="card-text">
                  Downtrip Date:{" "}
                  {/* {new Date(bookingData.downtrip.date).toLocaleDateString()} */}
                  {new Date(
                    new Date(bookingData.downtrip.date).setDate(
                      new Date(bookingData.downtrip.date).getDate() - 1
                    )
                  ).toDateString()}
                </p>
                <p className="card-text">
                  Total Persons: {bookingData.uptrip.totalPersons}
                </p>
                <p className="card-text">
                  Booking Period:{" "}
                  {/* {`${new Date(
                    bookingData.bookingDates.start
                  ).toLocaleDateString()} to ${new Date(
                    bookingData.bookingDates.end
                  ).toLocaleDateString()}`} */}
                  {`${new Date(
                    new Date(bookingData.bookingDates.start).setDate(
                      new Date(bookingData.bookingDates.start).getDate() - 1
                    )
                  ).toDateString()} to ${new Date(
                    new Date(bookingData.bookingDates.end).setDate(
                      new Date(bookingData.bookingDates.end).getDate() - 1
                    )
                  ).toDateString()} `}
                </p>
                <p className="card-text">
                  Total Price: ${bookingData.totalPrice}
                </p>
                <p className="card-text">
                  Tour Guide: {bookingData.tourGuide ? "Yes" : "No"}
                </p>
                <p className="card-text">
                  Budget Type: {bookingData.budgetType}
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <Button className="btn primary__btn w-12">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
