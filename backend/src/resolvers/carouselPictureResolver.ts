import carouselPicture from "../models/carouselPicture.Model";
import { createCarousePicture } from "../services/carouselPictureService";

//Resolver for the carouselPicture entity
const carouselPictureResolver = {

    //Mutation fucntion to create a new carouselPicture
    createCarouselPicture: async ( args: { carouselID: number, pictureID: number }): Promise<carouselPicture> => {

        let nuCarPic: carouselPicture = new carouselPicture({
            carouselID: args.carouselID,
            pictureID: args.pictureID
        });

        try {
            nuCarPic = await createCarousePicture(nuCarPic);

            return nuCarPic;
        }
        catch(error) {
            console.error("Something went wrong in the carouselPicture Resolver", error);
            throw new Error("Failed to save new carouselPicture: " + error);
        }
    }
};

export default carouselPictureResolver;