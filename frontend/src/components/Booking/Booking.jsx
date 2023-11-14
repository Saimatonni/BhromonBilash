import React, { useState } from "react";
import "./booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Input,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useBookingInfo } from "../../context/BookingContext";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Booking = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const { id, budgetType } = useParams();
  const { bookingInfo, setBookingInfo } = useBookingInfo();
  const [tourGuideDay, setTourGuideDay] = useState(1);
  const handleTourGuideDay = (e) => {
    setTourGuideDay(parseInt(e.target.value, 10) || 1);
  };

//   const handleClick = (e) => {
//     e.preventDefault();
//     navigate("/thank-you");
//   };

  const [isTourGuideSelected, setIsTourGuideSelected] = useState(false);

  const handleTourGuideChange = () => {
    setIsTourGuideSelected(!isTourGuideSelected);
  };

  const [selectedSourceup, setSelectedSourceup] = useState("");
  const [selectedTimeup, setSelectedTimeup] = useState("");
  const [selectedSourceChargeup, setSelectedSourceChargeup] = useState(0);
  const [numberOfPersonsup, setNumberOfPersonsup] = useState(1);
  const [travelIdUp, setTravelIdUp] = useState("");

  const handleSourceChangeup = (e) => {
    const source = e.target.value;
    setSelectedSourceup(source);
    const selectedSourceObject = bookingInfo.allTravels.find(
      (travel) => travel.source === source
    );

    if (selectedSourceObject) {
      setSelectedTimeup(selectedSourceObject.time[0]);
      setSelectedSourceChargeup(selectedSourceObject.charge);
      setTravelIdUp(selectedSourceObject._id)
    }
  };

  const handleTimeChangeup = (e) => {
    setSelectedTimeup(e.target.value);
  };

  const handleNumberOfPersonsChangeup = (e) => {
    setNumberOfPersonsup(parseInt(e.target.value, 10) || 1);
  };

  const [selectedSourcedown, setSelectedSourcedown] = useState("");
  const [selectedTimedown, setSelectedTimedown] = useState("");
  const [selectedSourceChargedown, setSelectedSourceChargedown] = useState(0);
  const [numberOfPersonsdown, setNumberOfPersonsdown] = useState(1);
  const [travelIddown, setTravelIddown] = useState("");

  const handleSourceChangedown = (e) => {
    const source = e.target.value;
    setSelectedSourcedown(source);
    const selectedSourceObject = bookingInfo.allTravels.find(
      (travel) => travel.source === source
    );

    if (selectedSourceObject) {
      setSelectedTimedown(selectedSourceObject.time[0]);
      setSelectedSourceChargedown(selectedSourceObject.charge);
      setTravelIddown(selectedSourceObject._id)
    }
  };

  const handleTimeChangedown = (e) => {
    setSelectedTimedown(e.target.value);
  };

  const handleNumberOfPersonsChangedown = (e) => {
    setNumberOfPersonsdown(parseInt(e.target.value, 10) || 1);
  };

  const [uptripDate, setUptripDate] = useState("");
  const [downtripDate, setDowntripDate] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleUptripDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setUptripDate(e.target.value);
  };

  const handleDowntripDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setDowntripDate(e.target.value);
  };

  const [bookingStartDate, setBookingStartDate] = useState("");
  const [bookingEndDate, setBookingEndDate] = useState("");

  //   const handleBookingStartDateChange = (e) => {
  //     const formattedDate = formatDate(e.target.value);
  //     setBookingStartDate(formattedDate);
  //   };

  // const handleBookingStartDateChange = (e) => {
  //     const formattedDate = formatDate(e.target.value);
  //     setBookingStartDate(formattedDate);
  //     const selectedStartDate = new Date(e.target.value);
  //     for (const room of bookingInfo.selectedRoomDetails) {
  //       for (const bookedDateRange of room.bookedDates) {
  //         const bookedStartDate = new Date(bookedDateRange.start);
  //         const bookedEndDate = new Date(bookedDateRange.end);
  //         console.log("booked date start, ",bookedDateRange.start, bookedStartDate, bookedDateRange.end,  bookedEndDate, selectedStartDate, room.number)
  //         if (
  //           selectedStartDate >= bookedStartDate &&
  //           selectedStartDate <= bookedEndDate
  //         ) {
  //             alert(`Selected start date overlaps with an existing booking in room ${room.number}. Please choose a different start date.`);
  //           return;
  //         }
  //       }
  //     }
  //   };

  const handleBookingStartDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setBookingStartDate(e.target.value);
    const selectedStartDate = new Date(e.target.value);
    const overlappingRooms = [];
    for (const room of bookingInfo.selectedRoomDetails) {
      for (const bookedDateRange of room.bookedDates) {
        const bookedStartDate = new Date(bookedDateRange.start);
        const bookedEndDate = new Date(bookedDateRange.end);
        if (
          selectedStartDate >= bookedStartDate &&
          selectedStartDate <= bookedEndDate
        ) {
          overlappingRooms.push(room.number);
        }
      }
    }
    if (overlappingRooms.length > 0) {
      alert(
        `Room Number ${overlappingRooms.join(
          ", "
        )} is already Booked in this Date. Please choose a different room or try later.......`
      );
      return;
    }
  };

  const handleBookingEndDateChange = (e) => {
    const formattedDate = formatDate(e.target.value);
    setBookingEndDate(e.target.value);
  };

  const calculateTotalDays = () => {
    if (bookingStartDate && bookingEndDate) {
      const startDate = new Date(bookingStartDate);
      const endDate = new Date(bookingEndDate);
      const timeDifference = endDate.getTime() - startDate.getTime();
      const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return totalDays + 1;
    }
    return 0 ;
  };

  const calculateUptripPrice = () => {
    if (selectedSourceup  ) {
      const selectedSourceObject = bookingInfo.allTravels.find(
        (travel) => travel.source === selectedSourceup
      );
      if (selectedSourceObject) {
        const uptripPrice = selectedSourceObject.charge * numberOfPersonsup;
        return uptripPrice;
      }
    }
    return 0;
  };

  const calculateDowntripPrice = () => {
    if (selectedSourcedown  ) {
      const selectedSourceObject = bookingInfo.allTravels.find(
        (travel) => travel.source === selectedSourcedown
      );
      if (selectedSourceObject) {
        const downtripPrice = selectedSourceObject.charge * numberOfPersonsdown;
        return downtripPrice;
      }
    }
    return 0;
  };

  const calculateTourGuidePrice = () => {
    if (isTourGuideSelected && bookingInfo.tourGuidePrice) {
      return tourGuideDay * bookingInfo.tourGuidePrice;
    }
    return 0;
  };

  const calculateOverallTotalPrice = () => {
    const uptripPrice = calculateUptripPrice();
    const downtripPrice = calculateDowntripPrice();
    const tourGuidePrice = calculateTourGuidePrice();
    const totalBedPrice =
      bookingInfo.singleBedPrice *
        bookingInfo.singleBedCount *
        calculateTotalDays() +
      bookingInfo.seahillingSingleExtraPrice -
      bookingInfo.singleBedDiscountAmount * calculateTotalDays() +
      bookingInfo.doubleBedPrice *
        bookingInfo.doubleBedCount *
        calculateTotalDays() +
      bookingInfo.seahillingDoubleExtraPrice -
      bookingInfo.doubleBedDiscountAmount * calculateTotalDays();

    const overallTotalPrice =
      uptripPrice + downtripPrice + tourGuidePrice + totalBedPrice;

    return overallTotalPrice;
  };

  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    setLoading(true);
    e.preventDefault();
    const apiUrl = `http://localhost:3000/api/booking?budgetType=${budgetType}`;
    // const accessToken = accessToken;
    const requestBody = {
        tourId: bookingInfo.id,
        hotelId: bookingInfo.hotelId,
        budgetType: budgetType,
        tourGuide: isTourGuideSelected,
        uptrip: {
          source: selectedSourceup,
          time: selectedTimeup,
          totalPersons: numberOfPersonsup,
          date: formatDate(uptripDate),
          travelId: travelIdUp,
        },
        downtrip: {
          source: selectedSourcedown,
          time: selectedTimedown,
          totalPersons: numberOfPersonsdown,
          date: formatDate(downtripDate),
          travelId: travelIddown,
        },
        singleBedRoomIds: bookingInfo.selectedSingleBedIds,
        doubleBedRoomIds: bookingInfo.selectedDoubleBedIds,
        bookingDates: {
          start: formatDate(bookingStartDate),
          end: formatDate(bookingEndDate),
        },
      };

      // console.log("request body",requestBody)
      
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accessToken : accessToken,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Booking successful:", responseData);
        // navigate("/thank-you"); 
        navigate("/thank-you", { state: { bookingData: responseData.data } });
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message}`);
        console.error("Booking failed:", errorData);
      }
    } catch (error) {
        alert("Failed Booking")
      console.error("Error during booking:", error);
    }finally {
        setLoading(false); 
      }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h5>Tour Guide: </h5>
        {bookingInfo.tourGuidePrice && (
          <h3>
            {bookingInfo.tourGuidePrice} <span>/per Day</span>
          </h3>
        )}
      </div>
      <div className="tour-guide-checkbox">
        <label>
          Include Tour Guide
          <input
            type="checkbox"
            checked={isTourGuideSelected}
            onChange={handleTourGuideChange}
          />
          {/* {isTourGuideSelected && (
            <input
              type="Number"
              placeholder="day"
              id="day"
              value={tourGuideDay}
              onChange={(e) => handleTourGuideDay(e)}
              required
            />
          )} */}
        </label>
      </div>
      {isTourGuideSelected && bookingInfo.tourGuidePrice && (
        <div className="price-section">
          <h6 className="d-flex align-items-center gap-1 border-1">
            {bookingInfo.tourGuidePrice} <i className="ri-close-line"></i>{" "}
            {calculateTotalDays()} day = {bookingInfo.tourGuidePrice *  calculateTotalDays()}
          </h6>
        </div>
      )}
      <div className="booking__form">
        <Form className="booking__info-form" onSubmit={handleClick}>
          <h5>Uptrip</h5>
          <FormGroup>
            <Input
              type="select"
              value={selectedSourceup}
              onChange={(e) => handleSourceChangeup(e)}
            >
              <option value="" disabled>
                Select soure
              </option>
              {bookingInfo.allTravels &&
                bookingInfo.allTravels.map((travel) => (
                  <option key={travel._id} value={travel.source}>
                    {travel.source}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              value={selectedTimeup}
              onChange={(e) => handleTimeChangeup(e)}
            >
              <option value="" disabled>
                Select time
              </option>
              {selectedSourceup &&
                bookingInfo.allTravels &&
                bookingInfo.allTravels
                  .find((travel) => travel.source === selectedSourceup)
                  .time.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
            </Input>
          </FormGroup>

          <div className="price-section">
            {/* {selectedSourceup && ( */}
            <h6 className="d-flex align-items-center gap-1 border-1">
              {selectedSourceChargeup} <i className="ri-close-line"></i>{" "}
              {numberOfPersonsup} person ={" "}
              {selectedSourceChargeup * numberOfPersonsup}
            </h6>
            {/* )} */}
          </div>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="uptripDate"
              value={uptripDate}
              onChange={handleUptripDateChange}
              required
            />
            <input
              type="Number"
              placeholder="person"
              id="guestSize"
              value={numberOfPersonsup}
              onChange={(e) => handleNumberOfPersonsChangeup(e)}
              required
            />
          </FormGroup>
        </Form>

        <Form className="booking__info-form" onSubmit={handleClick}>
          <h5 className="mt-20">Downtrip</h5>
          <FormGroup>
            <Input
              type="select"
              value={selectedSourcedown}
              onChange={(e) => handleSourceChangedown(e)}
            >
              <option value="" disabled>
                Select soure
              </option>
              {bookingInfo.allTravels &&
                bookingInfo.allTravels.map((travel) => (
                  <option key={travel._id} value={travel.source}>
                    {travel.source}
                  </option>
                ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input
              type="select"
              value={selectedTimedown}
              onChange={(e) => handleTimeChangedown(e)}
            >
              <option value="" disabled>
                Select time
              </option>
              {selectedSourcedown &&
                bookingInfo.allTravels &&
                bookingInfo.allTravels
                  .find((travel) => travel.source === selectedSourcedown)
                  .time.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
            </Input>
          </FormGroup>
          <div className="price-section">
            {/* {selectedSourcedown && ( */}
            <h6 className="d-flex align-items-center gap-1 border-1">
              {selectedSourceChargedown} <i className="ri-close-line"></i>{" "}
              {numberOfPersonsdown} person ={" "}
              {selectedSourceChargedown * numberOfPersonsdown}
            </h6>
            {/* )} */}
          </div>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="downtripDate"
              value={downtripDate}
              onChange={handleDowntripDateChange}
              required
            />
            <input
              type="Number"
              placeholder="person"
              id="guestSize"
              value={numberOfPersonsdown}
              onChange={(e) => handleNumberOfPersonsChangedown(e)}
              required
            />
          </FormGroup>
        </Form>
      </div>
      <div className="booking__bottom">
        <h5>Total Bed Price :</h5>
        <div className="date-container">
          <h6>Booking Start </h6>
          <input
            type="date"
            placeholder=""
            id="bookStartDate"
            value={bookingStartDate}
            onChange={handleBookingStartDateChange}
            required
          />
        </div>
        <div className="date-container">
          <h6>Booking End </h6>
          <input
            type="date"
            placeholder=""
            id="bookEndDate"
            value={bookingEndDate}
            onChange={handleBookingEndDateChange}
            required
          />
        </div>
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5>Single bed:</h5>
            {bookingInfo.singleBedPrice && (
              <>
                <h5 className="d-flex align-items-center gap-1">
                  {bookingInfo.singleBedPrice} <i class="ri-close-line"></i>{" "}
                  {bookingInfo.singleBedCount} bed <i class="ri-close-line"></i>{" "}
                  {calculateTotalDays()} day <i class="ri-add-line"></i> Extra
                  Price {bookingInfo.seahillingSingleExtraPrice}{" "}
                  <i class="ri-subtract-line"></i>{" "}
                  {bookingInfo.singleBedDiscountAmount * calculateTotalDays()} discount
                </h5>
                <span>
                  {bookingInfo.singleBedPrice *
                    bookingInfo.singleBedCount *
                    calculateTotalDays() +
                    bookingInfo.seahillingSingleExtraPrice -
                    bookingInfo.singleBedDiscountAmount * calculateTotalDays()}
                </span>
              </>
            )}
          </ListGroupItem>
          {/* <ListGroupItem className="border-0 px-0">
            <h5>Discount </h5>
            {bookingInfo.singleBedDiscountAmount !== undefined && (
              <span>{bookingInfo.singleBedDiscountAmount}</span>
            )}
            {bookingInfo.singleBedDiscountAmount === undefined && (
              <span>0</span>
            )}
          </ListGroupItem> */}
          <ListGroupItem className="border-0 px-0">
            <h5>Double bed:</h5>
            {bookingInfo.doubleBedPrice && (
              <>
                <h5 className="d-flex align-items-center gap-1">
                  {bookingInfo.doubleBedPrice} <i class="ri-close-line"></i>{" "}
                  {bookingInfo.doubleBedCount} bed <i class="ri-close-line"></i>{" "}
                  {calculateTotalDays()} day <i class="ri-add-line"></i> Extra
                  Price {bookingInfo.seahillingDoubleExtraPrice}{" "}
                  <i class="ri-subtract-line"></i>{" "}
                  {bookingInfo.doubleBedDiscountAmount *  calculateTotalDays()} discount
                </h5>
                <span>
                  {bookingInfo.doubleBedPrice *
                    bookingInfo.doubleBedCount *
                    calculateTotalDays()  +
                    bookingInfo.seahillingDoubleExtraPrice -
                    bookingInfo.doubleBedDiscountAmount * calculateTotalDays()}
                </span>
              </>
            )}
          </ListGroupItem>
          {/* <ListGroupItem className="border-0 px-0">
            <h5>Discount </h5>
            {bookingInfo.doubleBedDiscountAmount !== undefined && (
              <span>{bookingInfo.doubleBedDiscountAmount}</span>
            )}
            {bookingInfo.doubleBedDiscountAmount === undefined && (
              <span>0</span>
            )}
          </ListGroupItem> */}
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total Bed Price</h5>
            {bookingInfo.singleBedPrice && bookingInfo.doubleBedPrice && (
              <span>
                {bookingInfo.singleBedPrice *
                  bookingInfo.singleBedCount *
                  calculateTotalDays() +
                  bookingInfo.seahillingSingleExtraPrice -
                  bookingInfo.singleBedDiscountAmount +
                  bookingInfo.doubleBedPrice *
                    bookingInfo.doubleBedCount *
                    calculateTotalDays() +
                  bookingInfo.seahillingDoubleExtraPrice -
                  bookingInfo.doubleBedDiscountAmount}
              </span>
            )}
          </ListGroupItem>
          <hr className="my-3" />
          <ListGroupItem className="border-0 px-0 total2">
            <h5>Overall Total Price</h5>
            <span>{calculateOverallTotalPrice()}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
        {loading ? "Booking..." : "Book Now"}
        </Button>
      </div>
    </div>
  );
};

export default Booking;
