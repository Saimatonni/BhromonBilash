import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { RiStarSFill } from "react-icons/ri";
import "./rating-model.css";

const RatingModal = ({ isOpen, toggle, onSubmit }) => {
  const [ratingInfo, setRatingInfo] = useState({
    rating: 0,
    review: "",
  });

  const handleRatingChange = (event) => {
    setRatingInfo({ ...ratingInfo, rating: event.target.value });
  };

//   console.log("rating info",ratingInfo)

  const handleStarClick = (value) => {
    setRatingInfo({
      ...ratingInfo,
      rating: value,
    });
  };

  const handleReviewChange = (event) => {
    setRatingInfo({ ...ratingInfo, review: event.target.value });
  };

  const handleSubmit = () => {
    onSubmit(ratingInfo.rating, ratingInfo.review);
    setRatingInfo({
      rating: 0,
      review: "",
    });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Give Rating</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="rating">Rate your experience:</Label>
          {/* <Input
            type="number"
            id="rating"
            min="1"
            max="5"
            value={ratingInfo.rating}
            onChange={handleRatingChange}
          /> */}
          <div className="star-ratings">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                onClick={() => handleStarClick(value)}
                className={value <= ratingInfo.rating ? "filled" : ""}
              >
                {value} <RiStarSFill />
              </span>
            ))}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="review">Write a review:</Label>
          <Input
            type="textarea"
            id="review"
            value={ratingInfo.review}
            onChange={handleReviewChange}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Submit Rating
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RatingModal;
