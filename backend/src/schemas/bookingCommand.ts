import {
  fetchACTravelsForBooking,
  fetchNonACTravelsForBooking,
  fetchSpecialACTravelsForBooking,
} from "../crud/travel";
import { IBooking } from "../models/booking";
import { ICommand } from "./command";
import APIError from "../utils/APIError";
import {
  fetchFiveStarHotelsByIdWithRooms,
  fetchFourStarHotelsByIdWithRooms,
  fetchThreeStarHotelsByIdWithRooms,
} from "../crud/hotel";
import {
  updateFiveStarRooms,
  updateFourStarRooms,
  updateThreeStarRooms,
} from "../crud/room";
import { createBooking } from "../crud/booking";
import { Hotel } from "./hotel";
import { fetchTour } from "../crud/tour";

export function calculateNumberOfDays(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
}

export abstract class BookingCommand implements ICommand {
  booking: IBooking;
  hotel: Hotel;

  constructor(booking: IBooking) {
    this.booking = booking;
    this.hotel = new Hotel("");
  }

  async execute() {
    const tour: any = await this.getTour();
    if (!tour) {
      throw new APIError({
        status: 500,
        message: "Opps... some error in tour id",
      });
    }
    this.booking.tourName = tour[0].name;
    this.booking.tourImages = tour[0].images;

    const { uptripPrice, downtripPrice } = await this.getTripPrice();
    this.booking.uptrip.totalPrice = uptripPrice;
    this.booking.downtrip.totalPrice = downtripPrice;

    const {hotelCharge,hotelName} = await this.getRoomPriceAndHotelName();
    this.booking.hotelName = hotelName
    this.booking.hotelCharge = hotelCharge;
    this.booking.totalPrice = hotelCharge + uptripPrice + downtripPrice;


    if (this.booking.tourGuide) {
      this.booking.totalPrice +=
        this.getTourGuidePrice(
          this.booking.bookingDates.start,
          this.booking.bookingDates.end,
          tour[0].tourGuidePrice
        );
    }



    await this.updateRoomBookings();
    return await this.confirmBooking();
  }

  async getTour() {
    return await fetchTour(this.booking.tourId as any);
  }

  abstract getTripPrice();
  abstract getRoomPriceAndHotelName();
  abstract updateRoomBookings();
  abstract confirmBooking();

  getTourGuidePrice(start: Date, end: Date,tourGuidePrice : number): number {
    return calculateNumberOfDays(start, end)*tourGuidePrice;
  }
}

export class BookingCommandThreeStarRooms extends BookingCommand {
  async getTripPrice() {
    let result = await fetchNonACTravelsForBooking(
      this.booking.uptrip.travelId as any
    );
    if (!result) {
      throw new APIError({
        status: 400,
        message: "Oppss... uptrip travel id is incorrect.",
      });
    }
    const uptripPrice = this.booking.uptrip.totalPersons * result.charge;

    result = await fetchNonACTravelsForBooking(
      this.booking.downtrip.travelId as any
    );
    if (!result) {
      throw new APIError({
        status: 400,
        message: "Oppss... downtrip travel id is incorrect.",
      });
    }
    const downtripPrice = this.booking.downtrip.totalPersons * result.charge;

    return { uptripPrice, downtripPrice };
  }

  async getRoomPriceAndHotelName() {
    const result: any = await fetchThreeStarHotelsByIdWithRooms(
      this.booking.hotelId as any,
      this.booking.singleBedRoomIds as any,
      this.booking.doubleBedRoomIds as any
    );
    const singleBedRoomPrice = calculateNumberOfDays(this.booking.bookingDates.start,this.booking.bookingDates.end) *this.hotel.getSingleBedRoomPrice(result[0]);
    const doubleBedRoomPrice = calculateNumberOfDays(this.booking.bookingDates.start,this.booking.bookingDates.end) *this.hotel.getDoubleBedRoomPrice(result[0]);
    const hotelCharge = this.hotel.processDiscounts(
      result[0],
      singleBedRoomPrice,
      doubleBedRoomPrice
    );
    const hotelName = result[0].name
    return {hotelCharge,hotelName};
  }

  async updateRoomBookings() {
    return await updateThreeStarRooms(
      this.booking.singleBedRoomIds,
      this.booking.doubleBedRoomIds,
      this.booking.bookingDates
    );
  }

  async confirmBooking() {
    return await createBooking(this.booking);
  }
}

export class BookingCommandFourStarRooms extends BookingCommand {
  async getTripPrice() {
    let result = await fetchACTravelsForBooking(
      this.booking.uptrip.travelId as any
    );
    if (!result) {
      throw new APIError({
        status: 400,
        message: "Oppss... uptrip travel id is incorrect.",
      });
    }
    const uptripPrice = this.booking.uptrip.totalPersons * result.charge;

    result = await fetchACTravelsForBooking(
      this.booking.downtrip.travelId as any
    );
    if (!result) {
      throw new APIError({
        status: 400,
        message: "Oppss... downtrip travel id is incorrect.",
      });
    }
    const downtripPrice = this.booking.uptrip.totalPersons * result.charge;

    return { uptripPrice, downtripPrice };
  }

  async getRoomPriceAndHotelName() {
    const result: any = await fetchFourStarHotelsByIdWithRooms(
      this.booking.hotelId as any,
      this.booking.singleBedRoomIds as any,
      this.booking.doubleBedRoomIds as any
    );
    const singleBedRoomPrice = calculateNumberOfDays(this.booking.bookingDates.start,this.booking.bookingDates.end) *this.hotel.getSingleBedRoomPrice(result[0]);
    const doubleBedRoomPrice = calculateNumberOfDays(this.booking.bookingDates.start,this.booking.bookingDates.end) *this.hotel.getDoubleBedRoomPrice(result[0]);
    this.booking.hotelName = result[0].name
    const hotelCharge = this.hotel.processDiscounts(
      result[0],
      singleBedRoomPrice,
      doubleBedRoomPrice
    );
    const hotelName = result[0].name
    return {hotelCharge,hotelName};
  }

  async updateRoomBookings() {
    return await updateFourStarRooms(
      this.booking.singleBedRoomIds,
      this.booking.doubleBedRoomIds,
      this.booking.bookingDates
    );
  }

  async confirmBooking() {
    return await createBooking(this.booking);
  }
}

export class BookingCommandFiveStarRooms extends BookingCommand {
  async getTripPrice() {
    let result = await fetchSpecialACTravelsForBooking(
      this.booking.uptrip.travelId as any
    );
    if (!result) {
      throw new APIError({
        status: 400,
        message: "Oppss... uptrip travel id is incorrect.",
      });
    }
    const uptripPrice = this.booking.uptrip.totalPersons * result.charge;

    result = await fetchSpecialACTravelsForBooking(
      this.booking.downtrip.travelId as any
    );
    if (!result) {
      throw new APIError({
        status: 400,
        message: "Oppss... downtrip travel id is incorrect.",
      });
    }
    const downtripPrice = this.booking.uptrip.totalPersons * result.charge;

    return { uptripPrice, downtripPrice };
  }

  async getRoomPriceAndHotelName() {
    const result: any = await fetchFiveStarHotelsByIdWithRooms(
      this.booking.hotelId as any,
      this.booking.singleBedRoomIds as any,
      this.booking.doubleBedRoomIds as any
    );
    const singleBedRoomPrice = calculateNumberOfDays(this.booking.bookingDates.start,this.booking.bookingDates.end) *this.hotel.getSingleBedRoomPrice(result[0]);
    const doubleBedRoomPrice = calculateNumberOfDays(this.booking.bookingDates.start,this.booking.bookingDates.end) *this.hotel.getDoubleBedRoomPrice(result[0]);
    this.booking.hotelName = result[0].name
    const hotelCharge = this.hotel.processDiscounts(
      result[0],
      singleBedRoomPrice,
      doubleBedRoomPrice
    );
    
    const hotelName = result[0].name
    return {hotelCharge,hotelName};
  }

  async updateRoomBookings() {
    return await updateFiveStarRooms(
      this.booking.singleBedRoomIds,
      this.booking.doubleBedRoomIds,
      this.booking.bookingDates
    );
  }

  async confirmBooking() {
    return await createBooking(this.booking);
  }
}
