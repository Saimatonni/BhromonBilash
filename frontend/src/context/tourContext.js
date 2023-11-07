import React, { createContext, useContext, useState, useEffect } from 'react';

const TourContext = createContext();

export function useTourData() {
  return useContext(TourContext);
}

export function TourProvider({ children }) {
  const [tourData, setTourData] = useState(null);
  const fetchTourData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tour/all'); 
      if (response.ok) {
        const data = await response.json();
        setTourData(data);
      }
    } catch (error) {
      console.error('Error fetching tour data:', error);
    }
  };
  useEffect(() => {
    fetchTourData();
  }, []);

  return (
    <TourContext.Provider value={tourData}>
      {children}
    </TourContext.Provider>
  );
}
