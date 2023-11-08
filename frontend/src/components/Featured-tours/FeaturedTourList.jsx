import React from 'react'
import TourCard from '../../shared/TourCard'
// import tourData from'../../assets/data/tours'
import {Col} from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'

const FeaturedTourList = () => {
  const {data: tourData, loading, error} = useFetch(`${BASE_URL}/tour/all`)
  return (
    <> 
    {
      loading && <h4>Loading......</h4>
    }
    {
      error && <h4>{error}</h4>
    }
    {!loading && !error && tourData?.map(tour => {
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