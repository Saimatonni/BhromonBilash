"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiveStarHotel = exports.FourStarHotel = exports.ThreeStarHotel = exports.calculateDaysBetweenDates = void 0;
function calculateDaysBetweenDates(dateString1, dateString2) {
    // Parse the date strings into Date objects
    var dateParts1 = dateString1.split('/').map(Number);
    var dateParts2 = dateString2.split('/').map(Number);
    // Check if the date strings are valid
    if (dateParts1.length !== 3 ||
        dateParts2.length !== 3 ||
        isNaN(dateParts1[0]) ||
        isNaN(dateParts1[1]) ||
        isNaN(dateParts1[2]) ||
        isNaN(dateParts2[0]) ||
        isNaN(dateParts2[1]) ||
        isNaN(dateParts2[2])) {
        return -1; // Invalid date format
    }
    var date1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]); // Month is zero-based
    var date2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
    // Calculate the time difference in milliseconds
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    // Convert milliseconds to days
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff + 1;
}
exports.calculateDaysBetweenDates = calculateDaysBetweenDates;
var ThreeStarHotel = /** @class */ (function () {
    function ThreeStarHotel(name, location, ratings, rooms, startDate, endDate) {
        this.currentBookingRooms = [];
        this.name = name;
        this.location = location;
        this.ratings = ratings;
        this.rooms = rooms;
        this.serviceCharge = 50;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    ThreeStarHotel.prototype.cost = function () {
        var numberOfDays = calculateDaysBetweenDates(this.startDate, this.endDate);
        var roomCost;
        if (numberOfDays != -1) {
            roomCost = this.currentBookingRooms.reduce(function (accumulator, currentValue) {
                return accumulator + (numberOfDays) * currentValue.cost();
            }, 0);
            return this.serviceCharge + roomCost;
        }
        return -1;
    };
    ThreeStarHotel.prototype.bookRoom = function (room) {
        // let temp = this.rooms.filter(indexRoom=>indexRoom.number===room.number)
        // if(temp.length!=0){
        //     console.log("Your room is booked already...")
        //     return 
        // }
        this.currentBookingRooms.push(room);
    };
    return ThreeStarHotel;
}());
exports.ThreeStarHotel = ThreeStarHotel;
var FourStarHotel = /** @class */ (function () {
    function FourStarHotel(name, location, ratings, rooms, startDate, endDate) {
        this.currentBookingRooms = [];
        this.name = name;
        this.location = location;
        this.ratings = ratings;
        this.rooms = rooms;
        this.serviceCharge = 100;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    FourStarHotel.prototype.cost = function () {
        var numberOfDays = calculateDaysBetweenDates(this.startDate, this.endDate);
        var roomCost;
        if (numberOfDays != -1) {
            roomCost = this.currentBookingRooms.reduce(function (accumulator, currentValue) { return accumulator + (numberOfDays) * currentValue.cost(); }, 0);
            return this.serviceCharge + roomCost;
        }
        return -1;
    };
    FourStarHotel.prototype.bookRoom = function (room) {
        var temp = this.rooms.filter(function (indexRoom) { return indexRoom.number === room.number; });
        if (temp.length != 0) {
            console.log("Your room is booked already...");
            return;
        }
        this.currentBookingRooms.push(room);
    };
    return FourStarHotel;
}());
exports.FourStarHotel = FourStarHotel;
var FiveStarHotel = /** @class */ (function () {
    function FiveStarHotel(name, location, ratings, rooms, startDate, endDate) {
        this.currentBookingRooms = [];
        this.name = name;
        this.location = location;
        this.ratings = ratings;
        this.rooms = rooms;
        this.serviceCharge = 150;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    FiveStarHotel.prototype.cost = function () {
        var numberOfDays = calculateDaysBetweenDates(this.startDate, this.endDate);
        var roomCost;
        if (numberOfDays != -1) {
            roomCost = this.currentBookingRooms.reduce(function (accumulator, currentValue) { return accumulator + (numberOfDays) * currentValue.cost(); }, 0);
            return this.serviceCharge + roomCost;
        }
        return -1;
    };
    FiveStarHotel.prototype.bookRoom = function (room) {
        var temp = this.rooms.filter(function (indexRoom) { return indexRoom.number === room.number; });
        if (temp.length != 0) {
            console.log("Your room is booked already...");
            return;
        }
        this.currentBookingRooms.push(room);
    };
    return FiveStarHotel;
}());
exports.FiveStarHotel = FiveStarHotel;
