import carousel from "../models/carousel.Model";
import { getCarouselByID } from "../services/carouselServices";

//Resolver for the Carousel entity
const carouselResolver = {

    //Query method to get carousels by ID
    getCarouselByID: async (args: {carouselID: number}): Promise<carousel> => {
        
        let carObject: carousel = new carousel();
        const { carouselID } = args;

        try {
            carObject = await getCarouselByID(carouselID);

            return carObject;
        }
        catch(error) {
            throw new Error("Failed to fetch Carousel: " + error);
        }
    },

    
};

export default carouselResolver;