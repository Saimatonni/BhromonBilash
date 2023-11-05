import SingleBedFourStar, {
  ISingleBedFourStar,
} from "../models/singleBedFourStar";
import SingleBedThreeStar, {
  ISingleBedThreeStar,
} from "../models/singleBedThreeStar";
import SingleBedFiveStar, {
  ISingleBedFiveStar,
} from "../models/singleBedFiveStar";
import DoubleBedThreeStar, {
  IDoubleBedThreeStar,
} from "../models/doubleBedThreeStar";
import DoubleBedFourStar, {
  IDoubleBedFourStar,
} from "../models/doubleBedFourStar";
import DoubleBedFiveStar, {
  IDoubleBedFiveStar,
} from "../models/doubleBedFiveStar";
import mongoose, { ObjectId } from "mongoose"
import APIError from "../utils/APIError";


export interface IBookedDates {
  start: Date;
  end: Date;
}


export const updateThreeStarRooms = async (
  singleBedRoomIds: Array<ObjectId>,
  doubleBedRoomIds: Array<ObjectId>,
  currentBookingDate: IBookedDates
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const startDate : Date = currentBookingDate.start
    const endDate : Date = currentBookingDate.end

    const temp = {
      start: startDate,
      end: endDate,
    };

    const update1 = await SingleBedThreeStar.updateMany(
      {
        $and: [
          { _id: { $in: singleBedRoomIds } },
          {
            $and: [
              {
                bookedDates: {
                  $not: {
                    $elemMatch: {
                      start: {
                        $gte: startDate,
                        $lte: endDate,
                      },
                    },
                  },
                },
              },
              {
                bookedDates: {
                  $not: {
                    $elemMatch: {
                      end: {
                        $gte: startDate,
                        $lte: endDate,
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        $push: {
          bookedDates: temp,
        },
      },
      {session}
    );

    if (update1.modifiedCount !== singleBedRoomIds.length) {
        throw new Error
    }

    const update2 = await DoubleBedThreeStar.updateMany(
      {
        $and: [
          { _id: { $in: doubleBedRoomIds } },
          {
            $and: [
              {
                bookedDates: {
                  $not: {
                    $elemMatch: {
                      start: {
                        $gte: startDate,
                        $lte: endDate,
                      },
                    },
                  },
                },
              },
              {
                bookedDates: {
                  $not: {
                    $elemMatch: {
                      end: {
                        $gte: startDate,
                        $lte: endDate,
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      {
        $push: {
          bookedDates: temp,
        },
      },{session}
    );

    if (update2.modifiedCount !== doubleBedRoomIds.length) {
        throw new Error
    }

    await session.commitTransaction()

    return {update1,update2};
  } catch (error) {
    await session.abortTransaction()
    throw new APIError({
        status : 400,
        message : "Opps... rooms are already booked. Please refresh and try again."
    })
  } 
  finally {
    await session.endSession()
  }
};

export const updateFourStarRooms = async (
    singleBedRoomIds: Array<ObjectId>,
    doubleBedRoomIds: Array<ObjectId>,
    currentBookingDate: IBookedDates
  ) => {
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      const startDate : Date = currentBookingDate.start
      const endDate : Date = currentBookingDate.end

      const temp = {
        start: startDate,
        end: endDate,
      };
  
      
  
      const update1 = await SingleBedFourStar.updateMany(
        {
          $and: [
            { _id: { $in: singleBedRoomIds } },
            {
              $and: [
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        start: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        end: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          $push: {
            bookedDates: temp,
          },
        },
        {session}
      );
  
      if (update1.modifiedCount !== singleBedRoomIds.length) {
          throw new Error
      }
  
      const update2 = await DoubleBedFourStar.updateMany(
        {
          $and: [
            { _id: { $in: doubleBedRoomIds } },
            {
              $and: [
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        start: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        end: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          $push: {
            bookedDates: temp,
          },
        },{session}
      );
  
      if (update2.modifiedCount !== doubleBedRoomIds.length) {
          throw new Error
      }
  
      await session.commitTransaction()
  
      return {update1,update2};
    } catch (error) {
      await session.abortTransaction()
      throw new APIError({
          status : 400,
          message : "Opps... rooms are already booked. Please refresh and try again."
      })
    } 
    finally {
      await session.endSession()
    }
  };

  export const updateFiveStarRooms = async (
    singleBedRoomIds: Array<ObjectId>,
    doubleBedRoomIds: Array<ObjectId>,
    currentBookingDate: IBookedDates
  ) => {
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      const startDate : Date = currentBookingDate.start
      const endDate : Date = currentBookingDate.end

      const temp = {
        start: startDate,
        end: endDate,
      };
  
      const update1 = await SingleBedFiveStar.updateMany(
        {
          $and: [
            { _id: { $in: singleBedRoomIds } },
            {
              $and: [
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        start: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        end: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          $push: {
            bookedDates: temp,
          },
        },
        {session}
      );
  
      if (update1.modifiedCount !== singleBedRoomIds.length) {
          throw new Error
      }
  
      const update2 = await DoubleBedFiveStar.updateMany(
        {
          $and: [
            { _id: { $in: doubleBedRoomIds } },
            {
              $and: [
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        start: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
                {
                  bookedDates: {
                    $not: {
                      $elemMatch: {
                        end: {
                          $gte: startDate,
                          $lte: endDate,
                        },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          $push: {
            bookedDates: temp,
          },
        },{session}
      );
  
      if (update2.modifiedCount !== doubleBedRoomIds.length) {
          throw new Error
      }
  
      await session.commitTransaction()
  
      return {update1,update2};
    } catch (error) {
      await session.abortTransaction()
      throw new APIError({
          status : 400,
          message : "Opps... rooms are already booked. Please refresh and try again."
      })
    } 
    finally {
      await session.endSession()
    }
  };
  


//admin side create room methods
export const createSingleBedThreeStar = async (room: ISingleBedThreeStar) => {
  return await SingleBedThreeStar.create(room);
};

export const createSingleBedFourStar = async (room: ISingleBedFourStar) => {
  return await SingleBedFourStar.create(room);
};

export const createSingleBedFiveStar = async (room: ISingleBedFiveStar) => {
  return await SingleBedFiveStar.create(room);
};

export const createDoubleBedThreeStar = async (room: IDoubleBedThreeStar) => {
  return await DoubleBedThreeStar.create(room);
};

export const createDoubleBedFourStar = async (room: IDoubleBedFourStar) => {
  return await DoubleBedFourStar.create(room);
};

export const createDoubleBedFiveStar = async (room: IDoubleBedFiveStar) => {
  return await DoubleBedFiveStar.create(room);
};
