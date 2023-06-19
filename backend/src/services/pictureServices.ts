import { picture } from '../models/picture.Model';
import { dbPool } from '../server';

/**
 * Fucntion to get picture entity from the database given its ID
 * @param pictureID - string
 * @returns picture - json
 */
export const getPictureByID = async (pictureID: number): Promise<picture> => {

    let client = await dbPool.connect();
    let picObject: picture = {};

    try {
        
        const result = await client.query("SELECT * FROM picture WHERE \"pictureID\" = " + pictureID)

        picObject = result.rows[0];

        return picObject;

    }
    catch(error) {
        throw new Error("Failed to fecth picture entity by ID");
    }
    finally {
        if(client) client.release();
    }
}

/**
 * Function to fetch an array of all the pictures in the database
 * @returns pictures - json array of pictures
 */
export const getPictures = async (): Promise<picture[]> => {
    
    let client = await dbPool.connect();
    let picObjects: picture[] = [];

    try {
        const result = await client.query("SELECT * FROM picture");

        picObjects = result.rows;

        return picObjects;
    }
    catch(error) {
        throw new Error("Failed to fetch pictures from database");
    }
    finally {
        if(client) client.release();
    }
}
