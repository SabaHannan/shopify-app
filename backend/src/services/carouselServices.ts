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
};

/**
 * Mutation method to update carousel instance in the databse
 * @param carouselID - integer
 * @param updateCarousel - carousel object
 * @returns upCar - json carousel object
 */
export const updateCarousel = async (carouselID: number, updateCarousel: carousel): Promise<carousel> => {
    
    let carData = {
        carouselName: updateCarousel.carouselName,
        description: updateCarousel.description,
        activeStatus: updateCarousel.activeStatus,
        autoplay: updateCarousel.autoplay,
        autoplaySpeed: updateCarousel.autoplaySpeed,
        arrows: updateCarousel.arrows,
        dots: updateCarousel.dots,
        infinite: updateCarousel.infinite,
        pauseOnHover: updateCarousel.pauseOnHover,
        slideToShow: updateCarousel.slideToShow,
        slidesToScroll: updateCarousel.slidesToScroll
    } 

    let upCar: carousel = new carousel();

    try {
        const [affectedRows] = await carousel.update(carData, {
            where: { carouselID },
            returning: true
        });

        if(affectedRows > 0) {
            upCar = await carousel.findByPk(carouselID) as carousel;
        }

        return upCar;
    }
    catch(error) {
        throw new Error("Failed to update Carousel: " + error);
    }
};

/**
 * Mutator method to permanently remove a carousel from the database
 * @param carouselID - integer
 * @returns Boolean - if deleted or not
 */
export const deleteCarousel = async (carouselID: number): Promise<Boolean> => {
    let dltCar = new carousel();

    try{
        dltCar = await carousel.findByPk(carouselID) as carousel;

        if(dltCar != null) {
            const affectedRows = await carousel.destroy({ where: {carouselID}});

            if(affectedRows > 0) {
                return true;
            }
        }

        return false;
    }
    catch(error) {
        throw new Error("Failed to remove carousel from the database: " + error);
    }
}