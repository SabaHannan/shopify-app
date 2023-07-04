import picture from "../models/picture.Model";
import { createReadStream } from "fs";
import { createPicture, deletePicture, getPictureByID, getPictures, updatePicture } from "../services/pictureServices";

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
            //Convert the base64 string to bytea
            const buffer = Buffer.from(pictureData, 'base64');
            const uint8Array = new Uint8Array(buffer);
            const bytea = Array.from(uint8Array);

            //let the create picture function in the service post the new object to the database
            nuPic = await createPicture(pictureName, bytea);

            return nuPic;
        }
        catch(error) {
            console.error("Something went wrong in PictureResolver:", error)
            throw new Error("Failed to store new picture: " + error);
        }
    },

    //Mutation function to update an existing picture in the database
    updatePicture: async (args: { pictureID: number, pictureName: string, pictureData: any}): Promise<picture> => {

        let updatePic: picture = new picture();
        const { pictureID, pictureName, pictureData } = args;

        try {
            updatePic = await updatePicture(pictureID, pictureName, pictureData);

            return updatePic;
        }
        catch(error) {
            throw new Error("Failed to update picture: " + error);
        }

    },

    //Mutation function to permanently remove a picture from the database
    deletePicture: async (args: {pictureID: number}): Promise<Boolean> => {
        
        let picDeleted: Boolean = false;
        const { pictureID } = args;

        try {
            picDeleted = await deletePicture(pictureID);

            return picDeleted;
        }
        catch(error) {
            throw new Error("Failed to delete picture: " + error);
        }
    }
};

export default pictureResolver;