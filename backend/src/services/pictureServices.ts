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

/**
 * Function to create and store a new picture entry in the database
 * @param pictureName - String 
 * @param pictureData - binary data | any
 * @returns picture - picture object with auto generated id
 */
export const createPicture = async (pictureName: string, pictureData: any): Promise<picture> => {
    
    let nuPic: picture = new picture();

    try {
        const data = {
            pictureName, 
            pictureData
        }

        const result = await picture.create(data, {returning: true}) as picture;

        nuPic = result;

        return nuPic;
    }
    catch(error) {
        throw new Error("Failed to store a new picture in the database");
    }
}

/**
 * Function to update a picture in the database
 * @param pictureID - integer
 * @param pictureName - string
 * @param pictureData - any | binary array as a string
 * @returns picture - updated picture object
 */
export const updatePicture = async (pictureID: number, pictureName: string, pictureData: any): Promise<picture> => {
    let updatePic: picture = new picture();
    const dataValues = {
        pictureName,
        pictureData
    }
    
    try {
        const [affectedRows] = await picture.update(dataValues, {
            where: { pictureID },
            returning: true
        });

        if(affectedRows > 0) {
            updatePic = await picture.findOne({ where: { pictureID }}) as picture;
        }

        return updatePic;

    }
    catch(error) {
        throw new Error("Failed to update picture in the database");
    }
}
