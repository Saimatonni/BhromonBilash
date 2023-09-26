"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var booking_1 = require("./booking");
var decorator_1 = require("./decorator");
var room_1 = require("./room");
var rooms = [new room_1.ThreeStarSingleBedRoom("412"), new room_1.ThreeStarSingleBedRoom("413"), new room_1.ThreeStarSingleBedRoom("414"),
    new room_1.ThreeStarSingleBedRoom("415"),
    new room_1.ThreeStarDoubleBedRoom("512"),
    new room_1.ThreeStarDoubleBedRoom("513"), new room_1.ThreeStarDoubleBedRoom("514"), new room_1.ThreeStarDoubleBedRoom("515"),
];
var parentBooking = new booking_1.Booking("LOW_BUDGET", "26/09/2023", "28/09/2023");
parentBooking.prepareTour("Paradise", "CoxsBazar", 5, rooms, "Dhaka", "CoxsBazar", "25/09/2023", "23:00", "28/09/2023", "23:00", 1, 5);
parentBooking.bookTour([new room_1.ThreeStarSingleBedRoom("412"), new room_1.ThreeStarSingleBedRoom("413"),
    new room_1.ThreeStarDoubleBedRoom("514"), new room_1.ThreeStarDoubleBedRoom("515")]);
console.log("Low budget coxs bazar tour cost is ".concat(parentBooking.cost()));
parentBooking = new decorator_1.TourGuide(parentBooking);
console.log("Cost after tour guide ".concat(parentBooking.cost()));
