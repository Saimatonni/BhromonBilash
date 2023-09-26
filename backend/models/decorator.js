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
exports.TourGuide = exports.Decorator = void 0;
var booking_1 = require("./booking");
var hotel_1 = require("./hotel");
var Decorator = /** @class */ (function (_super) {
    __extends(Decorator, _super);
    function Decorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Decorator.prototype.prepareTour = function (hotelName, location, ratings, rooms, source, destination, upTripDate, upTripTime, downTripDate, downTripTIme, distance, bookedSeats) {
        return;
    };
    Decorator.prototype.bookTour = function (rooms) {
    };
    return Decorator;
}(booking_1.ParentBooking));
exports.Decorator = Decorator;
var TourGuide = /** @class */ (function (_super) {
    __extends(TourGuide, _super);
    function TourGuide(parentBooking) {
        var _this = _super.call(this) || this;
        _this.parentBooking = parentBooking;
        return _this;
    }
    TourGuide.prototype.cost = function () {
        var numberOfDays = (0, hotel_1.calculateDaysBetweenDates)(this.parentBooking.startDate, this.parentBooking.endDate);
        if (numberOfDays != -1) {
            return this.parentBooking.cost() + numberOfDays * 70;
        }
        else {
            console.log("error");
            return -1;
        }
    };
    return TourGuide;
}(Decorator));
exports.TourGuide = TourGuide;
