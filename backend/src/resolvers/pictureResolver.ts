import { picture } from "../models/picture.Model";
import { dbPool } from "../server";
import { getPictureByID, getPictures } from "../services/pictureServices";

//Resolver for the pictures entity
const pictureResolver = {
    //query to get picture object given its id
        getPictureByID: async (args: { pictureID: number }): Promise<picture> => {
            let client = await dbPool.connect();
            let picObject: picture = {};
            const { pictureID } = args;

            try {
                //extract the pictureID from the args and use it to fetch product from the DB
                picObject = await getPictureByID(pictureID);
                console.log(picObject);

                return picObject;

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
                console.log(picObjects)

                return picObjects;
            }
            catch(error) {
                throw new Error("Failed to fetch picture objects: " + error);
            }
        },
};

export default pictureResolver;