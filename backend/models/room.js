"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiveStarDoubleBedRoom = exports.FiveStarSingleBedRoom = exports.FourStarDoubleBedRoom = exports.FourStarSingleBedRoom = exports.ThreeStarDoubleBedRoom = exports.ThreeStarSingleBedRoom = void 0;
var ThreeStarSingleBedRoom = /** @class */ (function () {
    function ThreeStarSingleBedRoom(number) {
        this.number = number;
    }
    ThreeStarSingleBedRoom.prototype.cost = function () {
        return 10;
    };
    return ThreeStarSingleBedRoom;
}());
exports.ThreeStarSingleBedRoom = ThreeStarSingleBedRoom;
var ThreeStarDoubleBedRoom = /** @class */ (function () {
    function ThreeStarDoubleBedRoom(number) {
        this.number = number;
    }
    ThreeStarDoubleBedRoom.prototype.cost = function () {
        return 20;
    };
    return ThreeStarDoubleBedRoom;
}());
exports.ThreeStarDoubleBedRoom = ThreeStarDoubleBedRoom;
var FourStarSingleBedRoom = /** @class */ (function () {
    function FourStarSingleBedRoom(number) {
        this.number = number;
    }
    FourStarSingleBedRoom.prototype.cost = function () {
        return 15;
    };
    return FourStarSingleBedRoom;
}());
exports.FourStarSingleBedRoom = FourStarSingleBedRoom;
var FourStarDoubleBedRoom = /** @class */ (function () {
    function FourStarDoubleBedRoom(number) {
        this.number = number;
    }
    FourStarDoubleBedRoom.prototype.cost = function () {
        return 30;
    };
    return FourStarDoubleBedRoom;
}());
exports.FourStarDoubleBedRoom = FourStarDoubleBedRoom;
var FiveStarSingleBedRoom = /** @class */ (function () {
    function FiveStarSingleBedRoom(number) {
        this.number = number;
    }
    FiveStarSingleBedRoom.prototype.cost = function () {
        return 20;
    };
    return FiveStarSingleBedRoom;
}());
exports.FiveStarSingleBedRoom = FiveStarSingleBedRoom;
var FiveStarDoubleBedRoom = /** @class */ (function () {
    function FiveStarDoubleBedRoom(number) {
        this.number = number;
    }
    FiveStarDoubleBedRoom.prototype.cost = function () {
        return 40;
    };
    return FiveStarDoubleBedRoom;
}());
exports.FiveStarDoubleBedRoom = FiveStarDoubleBedRoom;
