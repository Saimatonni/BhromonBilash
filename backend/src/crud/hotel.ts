import { excludeFields } from "../utils/helper";
import ThreeStarHotel, {
  IDiscount,
  IThreeStarHotel,
} from "../models/threeStarHotel";
import FourStarHotel, { IFourStarHotel } from "../models/fourStarHotel";
import FiveStarHotel, { IFiveStarHotel } from "../models/fiveStarHotel";
import mongoose, { ObjectId } from "mongoose";

function aggregateForHotelWithAllRoomsReviews(
  hotelId: string,
  singleBed: string,
  doubleBed: string
) {
  return [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(hotelId),
      },
    },
    {
      $lookup: {
        from: singleBed,
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "singleBedRooms",
      },
    },
    {
      $lookup: {
        from: doubleBed,
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "doubleBedRooms",
      },
    },
    {
      $lookup: {
        from: "hotelratings",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $project: {
              userName: 1,
              userImage: 1,
              rating: 1,
              review: 1,
              createdAt: 1,
            },
          },
        ],
        as: "reviews",
      },
    },
    {
      $project: {
        ...excludeFields(),
      },
    },
  ];
}

export const fetchThreeStarHotelsWithAllRoomsReviews = async (
  hotelId: string
) => {
  return await ThreeStarHotel.aggregate(
    aggregateForHotelWithAllRoomsReviews(
      hotelId,
      "singlebedthreestars",
      "doublebedthreestars"
    )
  );
};

export const fetchFourStarHotelsWithAllRoomsReviews = async (
    hotelId: string
  ) => {
    return await FourStarHotel.aggregate(
      aggregateForHotelWithAllRoomsReviews(
        hotelId,
        "singlebedfourstars",
        "doublebedfourstars"
      )
    );
  };

  export const fetchFiveStarHotelsWithAllRoomsReviews = async (
    hotelId: string
  ) => {
    return await FiveStarHotel.aggregate(
      aggregateForHotelWithAllRoomsReviews(
        hotelId,
        "singlebedfivestars",
        "doublebedfivestars"
      )
    );
  };

export const fetchThreeStarHotels = async (tourId: string) => {
  return await ThreeStarHotel.aggregate([
    {
      $match: {
        tourId: new mongoose.Types.ObjectId(tourId),
      },
    },
    {
      $project: {
        ...excludeFields(),
      },
    },
  ]);
};

export const fetchThreeStarHotelsByIdWithRooms = async (
  hotelId: string,
  singleBedRoomIds: Array<string>,
  doubleBedRoomIds: Array<string>
) => {
  return await ThreeStarHotel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(hotelId),
      },
    },
    {
      $lookup: {
        from: "singlebedthreestars",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $match: {
              _id: {
                $in: singleBedRoomIds.map((value) => {
                  return new mongoose.Types.ObjectId(value);
                }),
              },
            },
          },
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "singleBedRooms",
      },
    },
    {
      $lookup: {
        from: "doublebedthreestars",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $match: {
              _id: {
                $in: doubleBedRoomIds.map((value) => {
                  return new mongoose.Types.ObjectId(value);
                }),
              },
            },
          },
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "doubleBedRooms",
      },
    },
    {
      $lookup: {
        from: "hotelratings",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $project: {
              userName: 1,
              userImage: 1,
              rating: 1,
              review: 1,
              createdAt: 1,
            },
          },
        ],
        as: "reviews",
      },
    },
    {
      $project: {
        ...excludeFields(),
      },
    },
  ]);
};

export const fetchFourStarHotels = async (tourId: string) => {
  return await FourStarHotel.aggregate([
    {
      $match: {
        tourId: new mongoose.Types.ObjectId(tourId),
      },
    },
    {
      $project: {
        ...excludeFields(),
      },
    },
  ]);
};

export const fetchFourStarHotelsByIdWithRooms = async (
  hotelId: string,
  singleBedRoomIds: Array<string>,
  doubleBedRoomIds: Array<string>
) => {
  return await FourStarHotel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(hotelId),
      },
    },
    {
      $lookup: {
        from: "singlebedfourstars",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $match: {
              _id: {
                $in: singleBedRoomIds.map((value) => {
                  return new mongoose.Types.ObjectId(value);
                }),
              },
            },
          },
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "singleBedRooms",
      },
    },
    {
      $lookup: {
        from: "doublebedfourstars",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $match: {
              _id: {
                $in: doubleBedRoomIds.map((value) => {
                  return new mongoose.Types.ObjectId(value);
                }),
              },
            },
          },
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "doubleBedRooms",
      },
    },
    {
      $lookup: {
        from: "hotelratings",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $project: {
              userName: 1,
              userImage: 1,
              rating: 1,
              review: 1,
              createdAt: 1,
            },
          },
        ],
        as: "reviews",
      },
    },
    {
      $project: {
        ...excludeFields(),
      },
    },
  ]);
};

export const fetchFiveStarHotels = async (tourId: string) => {
  return await FiveStarHotel.aggregate([
    {
      $match: {
        tourId: new mongoose.Types.ObjectId(tourId),
      },
    },
    {
      $project: {
        ...excludeFields(),
      },
    },
  ]);
};

export const fetchFiveStarHotelsByIdWithRooms = async (
  hotelId: string,
  singleBedRoomIds: Array<string>,
  doubleBedRoomIds: Array<string>
) => {
  return await FiveStarHotel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(hotelId),
      },
    },
    {
      $lookup: {
        from: "singlebedfivestars",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $match: {
              _id: {
                $in: singleBedRoomIds.map((value) => {
                  return new mongoose.Types.ObjectId(value);
                }),
              },
            },
          },
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "singleBedRooms",
      },
    },
    {
      $lookup: {
        from: "doublebedfivestars",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $match: {
              _id: {
                $in: doubleBedRoomIds.map((value) => {
                  return new mongoose.Types.ObjectId(value);
                }),
              },
            },
          },
          {
            $project: {
              ...excludeFields(),
            },
          },
        ],
        as: "doubleBedRooms",
      },
    },
    {
      $lookup: {
        from: "hotelratings",
        localField: "_id",
        foreignField: "hotelId",
        pipeline: [
          {
            $project: {
              userName: 1,
              userImage: 1,
              rating: 1,
              review: 1,
              createdAt: 1,
            },
          },
        ],
        as: "reviews",
      },
    },
    {
      $project: {
        ...excludeFields(),
      },
    },
  ]);
};

//admin side methods
export const createThreeStarHotel = async (hotel: IThreeStarHotel) => {
  console.log(hotel);
  return await ThreeStarHotel.create(hotel);
};

export const createFourStarHotel = async (hotel: IFourStarHotel) => {
  return await FourStarHotel.create(hotel);
};

export const createFiveStarHotel = async (hotel: IFiveStarHotel) => {
  return await FiveStarHotel.create(hotel);
};

export const createDiscountThreeStarHotel = async (
  hotelId: string,
  discount: IDiscount
) => {
  return await ThreeStarHotel.findByIdAndUpdate(
    hotelId,
    {
      $push: {
        discount: discount,
      },
    },
    {
      returnOriginal: false,
    }
  ).lean();
};

export const createDiscountFourStarHotel = async (
  hotelId: string,
  discount: IDiscount
) => {
  return await FourStarHotel.findByIdAndUpdate(
    hotelId,
    {
      $push: {
        discount: discount,
      },
    },
    {
      returnOriginal: false,
    }
  ).lean();
};

export const createDiscountFiveStarHotel = async (
  hotelId: string,
  discount: IDiscount
) => {
  return await FiveStarHotel.findByIdAndUpdate(
    hotelId,
    {
      $push: {
        discount: discount,
      },
    },
    {
      returnOriginal: false,
    }
  ).lean();
};
