import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import tourData from "../assets/data/tours";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const { data: tourData, loading, error } = useFetch(`${BASE_URL}/tour/all`);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchName, setSearchName] = useState("");
  useEffect(() => {
    const pages = Math.ceil(5 / 4);
    setPageCount(pages);
    window.scroll(0,0)
  }, [page, tourData]);
  

  const filteredTours = searchName
  ? (tourData || []).filter((tour) =>
      tour.name.toLowerCase().includes(searchName.toLowerCase())
    )
  : tourData|| [];

  // console.log("filter tours searchlocation",filteredTours,searchName)

const handleSearch = (name) => {
  setSearchName(name);
  setPage(0);
};
  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            {/* <SearchBar /> */}
            <SearchBar onSearch={handleSearch} />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {/* {
              tourData?.map(tour => <Col lg='3' className="mb-4" key={tour.id}>
              <TourCard tour={tour}/>
              </Col>)
            } */}
            {loading && <h4>Loading......</h4>}
            {error && <h4>{error}</h4>}
            {filteredTours.length === 0 && searchName && (
                  <Col lg="12" className="text-center mb-4">
                    <p>No tours available in this location.</p>
                  </Col>
                )}
                {filteredTours.map((tour) => (
                  <Col lg="3" className="mb-4" key={tour._id}>
                    <TourCard tour={tour} />
                  </Col>
                ))}
            <Col lg="12">
              <div
                className="pagination d-flex align-items-center
              justify-content-center mt-4 gap-3"
              >
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
