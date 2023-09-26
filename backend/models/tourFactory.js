"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighCostTourFactory = exports.MidCostTourFactory = exports.LowCostTourFactory = void 0;
var hotel_1 = require("./hotel");
var travel_1 = require("./travel");
var LowCostTourFactory = /** @class */ (function () {
    function LowCostTourFactory() {
    }
    LowCostTourFactory.prototype.createHotel = function (name, location, ratings, rooms, startDate, endDate) {
        return new hotel_1.ThreeStarHotel(name, location, ratings, rooms, startDate, endDate);
    };
    LowCostTourFactory.prototype.createTravel = function (source, destination, date, time, distance, bookedSeats) {
        return new travel_1.NonACBus(source, destination, date, time, distance, bookedSeats);
    };
    return LowCostTourFactory;
}());
exports.LowCostTourFactory = LowCostTourFactory;
var MidCostTourFactory = /** @class */ (function () {
    function MidCostTourFactory() {
    }
    MidCostTourFactory.prototype.createHotel = function (name, location, ratings, rooms, startDate, endDate) {
        return new hotel_1.FourStarHotel(name, location, ratings, rooms, startDate, endDate);
    };
    MidCostTourFactory.prototype.createTravel = function (source, destination, date, time, distance, bookedSeats) {
        return new travel_1.ACBus(source, destination, date, time, distance, bookedSeats);
    };
    return MidCostTourFactory;
}());
exports.MidCostTourFactory = MidCostTourFactory;
var HighCostTourFactory = /** @class */ (function () {
    function HighCostTourFactory() {
    }
    HighCostTourFactory.prototype.createHotel = function (name, location, ratings, rooms, startDate, endDate) {
        return new hotel_1.FiveStarHotel(name, location, ratings, rooms, startDate, endDate);
    };
    HighCostTourFactory.prototype.createTravel = function (source, destination, date, time, distance, bookedSeats) {
        return new travel_1.ACBusWithService(source, destination, date, time, distance, bookedSeats);
    };
    return HighCostTourFactory;
}());
exports.HighCostTourFactory = HighCostTourFactory;
