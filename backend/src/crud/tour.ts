import { excludeFields } from "../utils/helper";
import { ITour } from "../models/tour";
import Tour from "../models/tour"
import mongoose from "mongoose";

export const createTour = async (tour : ITour) => {
    return await Tour.create(tour)
}

export const fetchTours =async () => {
    return await Tour.find({},excludeFields()).lean()
}

export const fetchTour =async (id : string) => {
    return await Tour.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup : {
                from : "tourratings",
                localField : "_id",
                foreignField : "tourId",
                pipeline : [
                    {
                        $project : {
                            userName : 1,
                            userImage : 1,
                            review : 1,
                            rating : 1,
                            createdAt : 1
                        }
                    }
                ],
                as : "reviews"
            }
        },{
            $project : {
                ...excludeFields()
            }
        }
    ])
}