import carousel from "../models/carousel.Model";
import { createCarousel, deleteCarousel, getCarouselByID, updateCarousel } from "../services/carouselServices";

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
    updateCarousel: async (args: {carouselID: number, carouselName: string, description: string, activeStatus: Boolean,  autoplay: Boolean, autoplaySpeed: number, arrows: Boolean, dots: Boolean, infinite: Boolean, pauseOnHover: Boolean, slideToShow: number, slidesToScroll: number}): Promise<carousel> => {

        let upCarousel: carousel = new carousel({
            carouselName: args.carouselName,
            description: args.description,
            activeStatus: args.activeStatus,
            autoplay: args.autoplay,
            autoplaySpeed: args.autoplaySpeed,
            arrows: args.arrows,
            dots: args.dots,
            infinite: args.infinite,
            pauseOnHover: args.pauseOnHover,
            slideToShow: args.slideToShow,
            slidesToScroll: args.slidesToScroll
        });

        try {
            upCarousel = await updateCarousel(args.carouselID, upCarousel);

            return upCarousel;
        }
        catch(error) {
            throw new Error("Failed to update Carousel: " + error);
        }
    },

    //Mutation method to remove a carousel from the database
    deleteCarousel: async (args: {carouselID: number}): Promise<Boolean> => {
        try {
            return await deleteCarousel(args.carouselID) as Boolean;
        }
        catch(error) {
            throw new Error("Failed to delete carousel: " + error);
        }
    }
};

export default carouselResolver;