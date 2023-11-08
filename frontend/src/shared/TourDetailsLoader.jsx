import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const TourDetailsLoader = ({ id, children }) => {
  const [tourDetails, setTourDetails] = useState(null);
  const { data, loading, error } = useFetch(`http://localhost:3000/api/tour?tourId=${id}`);

  console.log("details 2 tourid", data,tourDetails);

  useEffect(() => {
    if (!loading && !error) {
      setTourDetails(data);
    }
  }, [data, loading, error]);

  return children({ tourDetails, loading, error });
};

export default TourDetailsLoader;
