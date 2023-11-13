import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const searchHandler = async () => {
    onSearch(name);
  };

  const handleInputChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    onSearch(newName);
  };

  // console.log("name",name)

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <i class="ri-map-pin-line"></i>
            <div>
              <h6>Name</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                value={name}
                // onChange={(e) => setName(e.target.value)}
                onChange={handleInputChange}
              />
            </div>
          </FormGroup>
          {/* <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <i class="ri-map-pin-add-line"></i>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <i class="ri-group-line"></i>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup> */}
          <span className="search_icon" type="submit" onClick={searchHandler}>
            <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
