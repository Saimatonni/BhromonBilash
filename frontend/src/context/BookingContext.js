
import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const useBookingInfo = () => {
  return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
  const [bookingInfo, setBookingInfo] = useState([]);

  return (
    <BookingContext.Provider value={{ bookingInfo, setBookingInfo }}>
      {children}
    </BookingContext.Provider>
  );
};
