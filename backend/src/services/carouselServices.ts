import carousel from "../models/carousel.Model";

/**
 * Method to get carousel from the database given its ID
 * @param carouselID - integer
 * @returns carousel - json carousel object
 */
export const getCarouselByID = async (carouselID: number): Promise<carousel> => {
    
    let carObject: carousel =  new carousel();

    try {
        const result = await carousel.findByPk(carouselID) as carousel;

        carObject = result;

        return carObject;
    }
    catch(error) {
        throw new Error("Failed to fetch Carousel from the database: " + error);
    }
};

/**
 * Mutation method to create and save a new Carousel object into the database
 * @param nuCarousel - Carousel instance
 * @returns nuCarousel - json carousel object with auto generated id
 */
export const createCarousel = async (nuCarousel: carousel): Promise<carousel> => {

    let newCar = {
        storeID: nuCarousel.storeID,
        carouselName: nuCarousel.carouselName,
        description: nuCarousel.description,
        activeStatus: nuCarousel.activeStatus
    }

    try {
        nuCarousel = await carousel.create(newCar, {returning: true}) as carousel;

        return nuCarousel;
    }
    catch(error) {
        throw new Error("Failed to save new Carousel into the database");       
    }
}