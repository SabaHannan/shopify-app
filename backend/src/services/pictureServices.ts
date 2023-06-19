import picture from '../models/picture.Model';
import { dbPool } from '../server';

/**
 * Fucntion to get picture entity from the database given its ID
 * @param pictureID - string
 * @returns picture - json
 */
export const getPictureByID = async (pictureID: number): Promise<picture> => {

    let picObject: picture = new picture();

    try {
        
        const result = await picture.findByPk(pictureID) as picture;

        picObject = result;

        return picObject;

    }
    catch(error) {
        throw new Error("Failed to fecth picture entity by ID");
    }
}

/**
 * Function to fetch an array of all the pictures in the database
 * @returns pictures - json array of pictures
 */
export const getPictures = async (): Promise<picture[]> => {
    
    let picObjects: picture[] = [];

    try {
        const result = await picture.findAll() as picture[];

        picObjects = result;

        return picObjects;
    }
    catch(error) {
        throw new Error("Failed to fetch pictures from database");
    }
}
