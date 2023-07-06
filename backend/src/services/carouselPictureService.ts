import carouselPicture from "../models/carouselPicture.Model";

/**
 * Function to create a new CarouselPicture in the database
 * @param carID - CarouselID: INT
 * @param picID - pictureID: INT
 * @returns CarouselPicture object
 */
export const createCarousePicture = async (nuCarPic: carouselPicture): Promise<carouselPicture> => {

    try {
        const data = {
            carouselID: nuCarPic.carouselID,
            pictureID: nuCarPic.pictureID
        }

        console.log(data);

        const result = await carouselPicture.create(data, {returning: true}) as carouselPicture;

        nuCarPic = result;

        console.log(result);
        console.log(nuCarPic);

        return nuCarPic;
    }
    catch(error) {
        console.error("Failed to save new carouselPicture", error);
        throw new Error("Failed to save new CarouselPicture object into the database");
    }
}