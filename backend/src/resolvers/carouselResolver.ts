import carousel from "../models/carousel.Model";
import { createCarousel, getCarouselByID, updateCarousel } from "../services/carouselServices";

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

    //Mutation method to create and save a carousel instance
    createCarousel: async (args: { storeID: number, carouselName: string, description: string, activeStatus: Boolean }): Promise<carousel> => {

        let nuCarousel: carousel = new carousel({
            storeID: args.storeID,
            carouselName: args.carouselName,
            description: args.description,
            activeStatus: args.activeStatus
        });

        try {
            nuCarousel = await createCarousel(nuCarousel);

            return nuCarousel;
        }
        catch(error) {
            throw new Error("Failed to save new Carousel into the database: " + error);
        }
    },

    //Mutation method to update an existing carousel
    updateCarousel: async (args: {carouselID: number, carouselName: string, description: string, activeStatus: Boolean}): Promise<carousel> => {

        let upCarousel: carousel = new carousel({
            carouselName: args.carouselName,
            description: args.description,
            activeStatus: args.activeStatus
        });

        try {
            upCarousel = await updateCarousel(args.carouselID, upCarousel);

            return upCarousel;
        }
        catch(error) {
            throw new Error("Failed to update Carousel: " + error);
        }
    }
};

export default carouselResolver;