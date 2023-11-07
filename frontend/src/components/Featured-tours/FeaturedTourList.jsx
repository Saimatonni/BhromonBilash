import React from 'react'
import TourCard from '../../shared/TourCard'
// import tourData from'../../assets/data/tours'
import {Col} from 'reactstrap'
import { useTourData } from '../../context/tourContext'

const FeaturedTourList = () => {
  const tourData = useTourData();
  // console.log("tour data", tourData)
  return (
    <>
    {/* {
        tourData?.map(tour=>(
            <Col lg='3' className='mb-4' key={tour.id}> 
                <TourCard tour={tour} />
            </Col>
        ))
    } */}
    
    {tourData?.data.map(tour => {
        if (tour.featured) {
          return (
            <Col lg='3' className='mb-4' key={tour._id}>
              <TourCard tour={tour} />
            </Col>
          );
        }
        return null;
      })}
    </>
  )
}

export default FeaturedTourList