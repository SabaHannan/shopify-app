import carouselPicture from "../models/carouselPicture.Model";

/**
 * Function to create a new CarouselPicture in the database
 * @param carID - CarouselID: INT
 * @param picID - pictureID: INT
 * @returns CarouselPicture object
 */
export const createCarousePicture = async (carID: number, picID: number): Promise<carouselPicture> => {

    let nuCarPic: carouselPicture = new carouselPicture();

    try {
        const data = {
            carID,
            picID
        }

        const result = await carouselPicture.create(data, {returning: true}) as carouselPicture;

        nuCarPic.carouseID = result.carouseID;
        nuCarPic.pictureID = result.pictureID;

        return nuCarPic;
    }
    catch(error) {
        console.error("Failed to save new carouselPicture", error);
        throw new Error("Failed to save new CarouselPicture object into the database");
    }
}