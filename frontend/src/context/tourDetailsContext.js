import React, { createContext, useContext, useState, useEffect } from 'react';

const TourDetailsContext = createContext();

export function useTour() {
  return useContext(TourDetailsContext);
}

export function TourDetailsProvider({ children }) {
  const [tourDetails, setTourDetails] = useState(null);

  async function fetchTourDetails(tourId) {
    // const tourId = "653804edb4879bd41bbbbc13"; 
    const apiUrl = `http://localhost:3000/api/tour?tourId=${tourId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTourDetails(data);
      } else {
        console.error("Failed to fetch tour details");
      }
    } catch (error) {
      console.error("An error occurred while fetching tour details", error);
    }
  }

//   useEffect(() => {
//     fetchTourDetails();
//   }, []);

  return (
    <TourDetailsContext.Provider value={{ tourDetails, fetchTourDetails }}>
      {children}
    </TourDetailsContext.Provider>
  );
}

