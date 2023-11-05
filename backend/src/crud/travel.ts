import { excludeFields } from "../utils/helper";
import ACTravel, { IACTravel } from "../models/acTravel";
import NonACTravel, { INonACTravel } from "../models/nonACTravel";
import SpecialACTravel, { ISpecialACTravel } from "../models/specialACTravel";

export const fetchNonACTravels =async (tourId: string) => {
    return await NonACTravel.find({tourId},excludeFields()).lean()
}

export const fetchACTravels =async (tourId : string) => {
    return await ACTravel.find({tourId},excludeFields()).lean()
}

export const fetchSpecialACTravels = async (tourId : string) => {
    return await SpecialACTravel.find({tourId},excludeFields()).lean()
}


//fetch methods for booking requirements
export const fetchNonACTravelsForBooking =async (travelId : string) => {
    return await NonACTravel.findById(travelId,excludeFields()).lean()
}

export const fetchACTravelsForBooking =async (travelId : string) => {
    return await ACTravel.findById(travelId,excludeFields()).lean()
}

export const fetchSpecialACTravelsForBooking =async (travelId : string) => {
    return await SpecialACTravel.findById(travelId,excludeFields()).lean()
}


//admin side api's
export const createNonACTravels =async (travel : INonACTravel) => {
    return NonACTravel.create(travel)
}

export const createACTravels =async (travel : IACTravel) => {
    return await ACTravel.create(travel)
}

export const createSpecialACTravel =async (travel : ISpecialACTravel) => {
    return await SpecialACTravel.create(travel)
}