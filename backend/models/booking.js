"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.ParentBooking = void 0;
var tourFactory_1 = require("./tourFactory");
var ParentBooking = /** @class */ (function () {
    function ParentBooking() {
    }
    return ParentBooking;
}());
exports.ParentBooking = ParentBooking;
var Booking = /** @class */ (function (_super) {
    __extends(Booking, _super);
    function Booking(type, startDate, endDate) {
        var _this = _super.call(this) || this;
        _this.factory = new TypeFactory().getFactory(type);
        _this.startDate = startDate;
        _this.endDate = endDate;
        return _this;
    }
    Booking.prototype.bookTour = function (rooms) {
        var _this = this;
        rooms.forEach(function (obj) { return _this.hotel.bookRoom(obj); });
    };
    Booking.prototype.prepareTour = function (hotelName, location, ratings, rooms, source, destination, upTripDate, upTripTime, downTripDate, downTripTIme, distance, bookedSeats) {
        if (this.factory === null) {
            console.log("Error");
            return;
        }
        this.hotel = this.factory.createHotel(hotelName, location, ratings, rooms, this.startDate, this.endDate);
        this.upTrip = this.factory.createTravel(source, destination, upTripDate, upTripTime, distance, bookedSeats);
        this.downTrip = this.factory.createTravel(destination, source, downTripDate, downTripTIme, distance, bookedSeats);
    };
    Booking.prototype.cost = function () {
        console.log("hotel cost is ".concat(this.hotel.cost()));
        console.log("Up trip cost is ".concat(this.upTrip.cost()));
        console.log("Down trip cost is ".concat(this.downTrip.cost()));
        return this.hotel.cost() + this.upTrip.cost() + this.downTrip.cost();
    };
    return Booking;
}(ParentBooking));
exports.Booking = Booking;
var TypeFactory = /** @class */ (function () {
    function TypeFactory() {
    }
    TypeFactory.prototype.getFactory = function (type) {
        if (type === "LOW_BUDGET") {
            return new tourFactory_1.LowCostTourFactory();
        }
        else if (type === "MID_BUDGET") {
            return new tourFactory_1.MidCostTourFactory();
        }
        else if (type === "HIGH_BUDGET") {
            return new tourFactory_1.HighCostTourFactory();
        }
        else {
            console.log("Please enter valid type");
            return null;
        }
    };
    return TypeFactory;
}());
