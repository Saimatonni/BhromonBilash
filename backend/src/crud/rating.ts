import { IHotelRating } from "../models/hotelRating";
import { ITourRating } from "../models/tourRating";
import TourRating from "../models/tourRating";
import HotelRating from "../models/hotelRating";
import Tour from "../models/tour";
import APIError from "../utils/APIError";
import mongoose from "mongoose";
import threeStarHotel from "../models/threeStarHotel";
import fourStarHotel from "../models/fourStarHotel";
import fiveStarHotel from "../models/fiveStarHotel";

function aggregationObject(ratingObject : ITourRating|IHotelRating){
    return [
        {
          $set: {
            rating: {
              $divide: [
                {
                  $add: [
                    ratingObject.rating,
                    {
                      $multiply: ["$rating", "$numberOfRatings"],
                    },
                  ],
                },
                {
                  $add: ["$numberOfRatings", 1],
                },
              ],
            },
            numberOfRatings : {
                $add :[ "$numberOfRatings",1]
            }
          },
        },
      ]
}

export const createTourRating = async (tourRating: ITourRating) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const update1 = await TourRating.create([tourRating], { session });
    if (!update1) {
      throw new APIError({
        status: 400,
        message:
          "Opps... some error occured in rating publish. Please try again.",
      });
    }


    //update tour collection
    const update2 = await Tour.updateMany(
      {
        _id: tourRating.tourId,
      },
      aggregationObject(tourRating),
      {
        session,
      }
    );

    if (update2.matchedCount===0) {
      throw new APIError({
        status: 400,
        message: "Opps...Tour Id does not exists...",
      });
    }

    await session.commitTransaction();
    return { update1, update2 };
  } catch (error) {
    await session.abortTransaction();
    throw new APIError(error);
  } finally {
    await session.endSession();
  }
};

export const createThreeStarHotelRating = async (hotelRating: IHotelRating) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const update1 = await HotelRating.create([hotelRating], { session });
    if (!update1) {
      throw new APIError({
        status: 400,
        message:
          "Opps... some error occured in rating publish. Please try again.",
      });
    }

    //update tour collection
    const update2 = await threeStarHotel.updateMany(
      {
        _id: hotelRating.hotelId,
      },
      aggregationObject(hotelRating),
      {
        session,
      }
    );

    //no update happened
    if (update2.matchedCount === 0) {
      throw new APIError({
        status: 400,
        message: "Opps...Three Star Hotel Id does not exists...",
      });
    }

    await session.commitTransaction();
    return { update1, update2 };
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    throw new APIError({
      status: 400,
      message: "Opps...Some error occured in publishing rating...",
    });
  } finally {
    await session.endSession();
  }
};

export const createFourStarHotelRating = async (hotelRating: IHotelRating) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const update1 = await HotelRating.create([hotelRating], { session });
    if (!update1) {
      throw new APIError({
        status: 400,
        message:
          "Opps... some error occured in rating publish. Please try again.",
      });
    }

    //update tour collection
    const update2 = await fourStarHotel.updateMany(
      {
        _id: hotelRating.hotelId,
      },
      aggregationObject(hotelRating),
      {
        session,
      }
    );
    if (update2.matchedCount === 0) {
      throw new APIError({
        status: 400,
        message: "Opps...Four Star Hotel Id does not exists...",
      });
    }

    await session.commitTransaction();
    return { update1, update2 };
  } catch (error) {
    await session.abortTransaction();
    throw new APIError({
      status: 400,
      message: "Opps...Some error occured in publishing rating...",
    });
  } finally {
    await session.endSession();
  }
};

export const createFiveStarHotelRating = async (hotelRating: IHotelRating) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const update1 = await HotelRating.create([hotelRating], { session });
    if (!update1) {
      throw new APIError({
        status: 400,
        message:
          "Opps... some error occured in rating publish. Please try again.",
      });
    }

    //update tour collection
    const update2 = await fiveStarHotel.updateMany(
      {
        _id: hotelRating.hotelId,
      },
      aggregationObject(hotelRating),
      {
        session,
      }
    );
    if (update2.matchedCount === 0) {
      throw new APIError({
        status: 400,
        message: "Opps...Five Star Hotel Id does not exists...",
      });
    }

    await session.commitTransaction();
    return { update1, update2 };
  } catch (error) {
    await session.abortTransaction();
    throw new APIError({
      status: 400,
      message: "Opps...Some error occured in publishing rating...",
    });
  } finally {
    await session.endSession();
  }
};
