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