import { Booking, ParentBooking } from "./booking";
import { TourGuide } from "./decorator";
import { calculateDaysBetweenDates } from "./hotel";
import { Room, ThreeStarDoubleBedRoom, ThreeStarSingleBedRoom } from "./room";

let rooms : Room[] = [new ThreeStarSingleBedRoom("412"),new ThreeStarSingleBedRoom("413"),new ThreeStarSingleBedRoom("414"),
new ThreeStarSingleBedRoom("415"),
new ThreeStarDoubleBedRoom("512"),
new ThreeStarDoubleBedRoom("513"),new ThreeStarDoubleBedRoom("514"),new ThreeStarDoubleBedRoom("515"),
]

let parentBooking : ParentBooking = new Booking("LOW_BUDGET","26/09/2023","28/09/2023")
parentBooking.prepareTour("Paradise","CoxsBazar",5,rooms,"Dhaka","CoxsBazar","25/09/2023","23:00","28/09/2023","23:00",1,5)
parentBooking.bookTour([new ThreeStarSingleBedRoom("412"),new ThreeStarSingleBedRoom("413"),
                            new ThreeStarDoubleBedRoom("514"),new ThreeStarDoubleBedRoom("515")])
console.log(`Low budget coxs bazar tour cost is ${parentBooking.cost()}`)

parentBooking = new TourGuide(parentBooking)
console.log(`Cost after tour guide ${parentBooking.cost()}`)
