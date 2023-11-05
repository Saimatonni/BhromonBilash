import mongoose from "mongoose";
import Booking, { EBudgetType } from "../models/booking";
import { IBooking } from "../models/booking";
import { excludeFields } from "../utils/helper";
import APIError from "../utils/APIError";
import SingleBedThreeStar from "../models/singleBedThreeStar";
import DoubleBedThreeStar from "../models/doubleBedThreeStar";
import SingleBedFourStar from "../models/singleBedFourStar";
import DoubleBedFourStar from "../models/doubleBedFourStar";
import DoubleBedFiveStar from "../models/doubleBedFiveStar";
import SingleBedFiveStar from "../models/singleBedFiveStar";

export const createBooking = async (booking: IBooking) => {
  return await Booking.create(booking);
};

export const getBookingsForUser = async (userId: string) => {
  return await Booking.aggregate([
    {
      $facet: {
        lowBudgetBookings: [
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              budgetType: "LOW",
            },
          },
          {
            $lookup: {
              from: "singlebedthreestars",
              let: {
                singleBedRoomIds: "$singleBedRoomIds",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$singleBedRoomIds"],
                    },
                  },
                },
                {
                  $project: {
                    ...excludeFields({
                      bookedDates: 0,
                      hotelId: 0,
                    }),
                  },
                },
              ],
              as: "singleBedRooms",
            },
          },
          {
            $lookup: {
              from: "doublebedthreestars",
              let: {
                doubleBedRoomIds: "$doubleBedRoomIds",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$doubleBedRoomIds"],
                    },
                  },
                },
                {
                  $project: {
                    ...excludeFields({
                      bookedDates: 0,
                      hotelId: 0,
                    }),
                  },
                },
              ],
              as: "doubleBedRooms",
            },
          },
          {
            $project: {
              ...excludeFields({
                singleBedRoomIds: 0,
                doubleBedRoomIds: 0,
              }),
            },
          },
        ],

        midBudgetBookings: [
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              budgetType: "MID",
            },
          },
          {
            $lookup: {
              from: "singlebedfourstars",
              let: {
                singleBedRoomIds: "$singleBedRoomIds",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$singleBedRoomIds"],
                    },
                  },
                },
                {
                  $project: {
                    ...excludeFields({
                      bookedDates: 0,
                      hotelId: 0,
                    }),
                  },
                },
              ],
              as: "singleBedRooms",
            },
          },
          {
            $lookup: {
              from: "doublebedfourstars",
              let: {
                doubleBedRoomIds: "$doubleBedRoomIds",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$doubleBedRoomIds"],
                    },
                  },
                },
                {
                  $project: {
                    ...excludeFields({
                      bookedDates: 0,
                      hotelId: 0,
                    }),
                  },
                },
              ],
              as: "doubleBedRooms",
            },
          },
          {
            $project: {
              ...excludeFields({
                singleBedRoomIds: 0,
                doubleBedRoomIds: 0,
              }),
            },
          },
        ],

        highBudgetBookings: [
          {
            $match: {
              userId: new mongoose.Types.ObjectId(userId),
              budgetType: "HIGH",
            },
          },
          {
            $lookup: {
              from: "singlebedfivestars",
              let: {
                singleBedRoomIds: "$singleBedRoomIds",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$singleBedRoomIds"],
                    },
                  },
                },
                {
                  $project: {
                    ...excludeFields({
                      bookedDates: 0,
                      hotelId: 0,
                    }),
                  },
                },
              ],
              as: "singleBedRooms",
            },
          },
          {
            $lookup: {
              from: "doublebedfivestars",
              let: {
                doubleBedRoomIds: "$doubleBedRoomIds",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$_id", "$$doubleBedRoomIds"],
                    },
                  },
                },
                {
                  $project: {
                    ...excludeFields({
                      bookedDates: 0,
                      hotelId: 0,
                    }),
                  },
                },
              ],
              as: "doubleBedRooms",
            },
          },
          {
            $project: {
              ...excludeFields({
                singleBedRoomIds: 0,
                doubleBedRoomIds: 0,
              }),
            },
          },
        ],
      },
    },
  ]);
};



export const deleteBooking = async (bookingId: string) => {
  const currentDate = new Date();
  const sevenDaysAhead = new Date(currentDate);
  sevenDaysAhead.setDate(currentDate.getDate() + 8);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedBooking = await Booking.findOneAndDelete({
      $and: [
        {
          _id: bookingId,
        },
        {
          "uptrip.date": {
            $gte: sevenDaysAhead,
          },
        },
      ],
    }).lean();

    if (!deletedBooking) {
      throw new APIError({
        status: 400,
        message: "Booking does not exist",
      });
    }

    if (deletedBooking.budgetType === EBudgetType.LOW) {
      await SingleBedThreeStar.updateMany(
        {
          _id: {
            $in: deletedBooking.singleBedRoomIds,
          },
        },
        {
          $pull: {
            bookedDates: {
              $eq: deletedBooking.bookingDates,
            },
          },
        },
        {
            session
        }
      );

      await DoubleBedThreeStar.updateMany(
        {
          _id: {
            $in: deletedBooking.doubleBedRoomIds,
          },
        },
        {
          $pull: {
            bookedDates: {
              $eq: deletedBooking.bookingDates,
            },
          },
        },
        {
            session
        }
      );
    } else if (deletedBooking.budgetType === EBudgetType.MID) {
      await SingleBedFourStar.updateMany(
        {
          _id: {
            $in: deletedBooking.singleBedRoomIds,
          },
        },
        {
          $pull: {
            bookedDates: {
              $eq: deletedBooking.bookingDates,
            },
          },
        },
        {
            session
        }
      );

      await DoubleBedFourStar.updateMany(
        {
          _id: {
            $in: deletedBooking.doubleBedRoomIds,
          },
        },
        {
          $pull: {
            bookedDates: {
              $eq: deletedBooking.bookingDates,
            },
          },
        },
        {
            session
        }
      );
    } else if (deletedBooking.budgetType === EBudgetType.HIGH) {
      await SingleBedFiveStar.updateMany(
        {
          _id: {
            $in: deletedBooking.singleBedRoomIds,
          },
        },
        {
          $pull: {
            bookedDates: {
              $eq: deletedBooking.bookingDates,
            },
          },
        },
        {
            session
        }
      );

      await DoubleBedFiveStar.updateMany(
        {
          _id: {
            $in: deletedBooking.doubleBedRoomIds,
          },
        },
        {
          $pull: {
            bookedDates: {
              $eq: deletedBooking.bookingDates,
            },
          },
        },{
            session
        }
      );
    }

    await session.commitTransaction();
    return deletedBooking;
  } catch (error) {
    await session.abortTransaction();
    throw new APIError({
      status: 400,
      message:
        "Opps... error occured while cancelation. Please try again.",
    });
  } finally {
    await session.endSession();
  }
};
