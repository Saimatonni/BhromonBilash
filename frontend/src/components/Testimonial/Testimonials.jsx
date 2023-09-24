import React from 'react'
import Slider from 'react-slick'
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            }
        ]
    }
    return (
        <Slider {...settings}>
            <div className="testimonial py-4 px-3">
                <p>
                    I've traveled with many tour companies over the years, but my experience  was nothing short of exceptional.
                    From the moment I booked my tour, their team went above and beyond to ensure every detail was perfect.
                    Our guide was incredibly knowledgeable and passionate about the destination, making each day of the tour
                    an unforgettable adventure. I can't recommend them enough
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava01} className='w-25 h-25 rounded-2' alt=""></img>
                    <div>
                        <h5 className='mb-0 mt-3'>John Doe</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testimonial py-4 px-3">
                <p>
                    Traveling with you was a game-changer for me. I've always been a solo traveler, but their small group
                    tours offered the perfect blend of camaraderie and personalized attention. I felt like I was exploring
                    the world with friends, and our guide's enthusiasm was infectious. I can't wait to join another tour with
                    them soon
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava02} className='w-25 h-25 rounded-2' alt=""></img>
                    <div>
                        <h5 className='mb-0 mt-3'>John Doe</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testimonial py-4 px-3">
                <p>
                    Traveling with you was a game-changer for me. I've always been a solo traveler, but their small group
                    tours offered the perfect blend of camaraderie and personalized attention. I felt like I was exploring
                    the world with friends, and our guide's enthusiasm was infectious. I can't wait to join another tour with
                    them soon
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03} className='w-25 h-25 rounded-2' alt=""></img>
                    <div>
                        <h5 className='mb-0 mt-3'>John Doe</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
            <div className="testimonial py-4 px-3">
                <p>
                    Traveling with you was a game-changer for me. I've always been a solo traveler, but their small group
                    tours offered the perfect blend of camaraderie and personalized attention. I felt like I was exploring
                    the world with friends, and our guide's enthusiasm was infectious. I can't wait to join another tour with
                    them soon
                </p>
                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava02} className='w-25 h-25 rounded-2' alt=""></img>
                    <div>
                        <h5 className='mb-0 mt-3'>John Doe</h5>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

        </Slider>
    )
}

export default Testimonials