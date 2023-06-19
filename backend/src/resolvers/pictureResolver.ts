import picture from "../models/picture.Model";
import { createPicture, getPictureByID, getPictures } from "../services/pictureServices";

//Resolver for the pictures entity
const pictureResolver = {
    //query to get picture object given its id
    getPictureByID: async (args: { pictureID: number }): Promise<picture> => {
        let picObject: picture = new picture();
        const { pictureID } = args;

        try {
            //extract the pictureID from the args and use it to fetch product from the DB
            picObject = await getPictureByID(pictureID);

            return picObject;
        }
        catch(error) {
            throw new Error("Failed to fetch picture object: " + error);
        }
    },

    //Query to get all the pictures in the database
    getPictures: async (): Promise<picture[]> => {
        
        let picObjects: picture[] = [];

        try {
            //let the getPictures function in the service get results from the database
            picObjects = await getPictures();

            return picObjects;
        }
        catch(error) {
            throw new Error("Failed to fetch picture objects: " + error);
        }
    },

    //Mutation function to create new picture entries in the database
    createPicture: async ( args: { pictureName: string, pictureData: any }): Promise<picture> => {
        
        let nuPic: picture = new picture();
        const { pictureName, pictureData } = args;

        try {
            //let the create picture function in the service post the new object to the database
            nuPic = await createPicture(pictureName, pictureData);

            return nuPic;
        }
        catch(error) {
            throw new Error("Failed to store new picture: " + error);
        }
    }
};

export default pictureResolver;