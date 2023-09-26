"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACBusWithService = exports.ACBus = exports.NonACBus = void 0;
var NonACBus = /** @class */ (function () {
    function NonACBus(source, destination, date, time, distance, bookedSeats) {
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.distance = distance;
        this.bookedSeats = bookedSeats;
        this.seatCharge = 500;
    }
    NonACBus.prototype.cost = function () {
        return this.distance * this.bookedSeats * this.seatCharge;
    };
    return NonACBus;
}());
exports.NonACBus = NonACBus;
var ACBus = /** @class */ (function () {
    function ACBus(source, destination, date, time, distance, bookedSeats) {
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.distance = distance;
        this.bookedSeats = bookedSeats;
        this.seatCharge = 1000;
    }
    ACBus.prototype.cost = function () {
        return this.distance * this.bookedSeats * this.seatCharge;
    };
    return ACBus;
}());
exports.ACBus = ACBus;
var ACBusWithService = /** @class */ (function () {
    function ACBusWithService(source, destination, date, time, distance, bookedSeats) {
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.time = time;
        this.distance = distance;
        this.bookedSeats = bookedSeats;
        this.seatCharge = 1200;
    }
    ACBusWithService.prototype.cost = function () {
        return this.distance * this.bookedSeats * this.seatCharge;
    };
    return ACBusWithService;
}());
exports.ACBusWithService = ACBusWithService;
