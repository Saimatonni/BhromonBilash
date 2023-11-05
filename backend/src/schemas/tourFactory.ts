import { fetchACTravels, fetchNonACTravels, fetchSpecialACTravels } from "../crud/travel";
import {  fetchFiveStarHotels,fetchFourStarHotels,fetchThreeStarHotels } from "../crud/hotel";

export interface TourFactory{
    getHotels(tourId : string),
    getTravels(tourId : string),
}

export class LowCostTourFactory implements TourFactory{
    
    async getHotels(tourId: string) {
        return await fetchThreeStarHotels(tourId)
    }

    async getTravels(tourId : string){
        return await fetchNonACTravels(tourId)
    }
}

export class MidCostTourFactory implements TourFactory{
    async getHotels(tourId: string) {
        return await fetchFourStarHotels(tourId)
    }

    async getTravels(tourId : string){
        return await fetchACTravels(tourId)
    }

}

export class HighCostTourFactory implements TourFactory{
    async getHotels(tourId: string) {
        return await fetchFiveStarHotels(tourId)
    }
   
    async getTravels(tourId : string){
        return await fetchSpecialACTravels(tourId)
    }
    
}