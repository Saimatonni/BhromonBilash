import {
  fetchFiveStarHotelsWithAllRoomsReviews,
  fetchFourStarHotelsWithAllRoomsReviews,
  fetchThreeStarHotelsWithAllRoomsReviews,
} from "../crud/hotel";
import { ICommand } from "./command";

export class GetThreeStarHotelCommand implements ICommand {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async execute() {
    return await fetchThreeStarHotelsWithAllRoomsReviews(this.id);
  }
}

export class GetFourStarHotelCommand implements ICommand {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async execute() {
    return await fetchFourStarHotelsWithAllRoomsReviews(this.id);
  }
}

export class GetFiveStarHotelCommand implements ICommand {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  async execute() {
    return await fetchFiveStarHotelsWithAllRoomsReviews(this.id);
  }
}
