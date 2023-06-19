import express from 'express';
import { getPictureByID, getPictures } from '../services/pictureServices';
import { picture } from '../models/picture.Model';

//Declare a router instance
const pictureRoute = express.Router();

//Declare a picture object from the model
var picObject: picture = {};

//GET request handlers
pictureRoute.get("/getPictureByID/:pictureID", async (required, result) => {
    try {        
        //get parameter from the http address
        const pictureID: number = parseInt(required.params.pictureID, 10);
        
        //get results from the database
        picObject = await getPictureByID(pictureID);

        result.json(picObject);
    }
    catch(error) {
        result.status(500).json({ error: "Failed to fetch picture from database"});
        console.error("GET request failed", error);
    }
});

pictureRoute.get("/getPictures", async (req, res) => {
    try {
        //get the results from the database
        let picObjects: picture[] = [];

        picObjects = await getPictures();

        res.json(picObjects)
    }
    catch(error) {
        res.status(500).json({ error: "Failed to fetch pictures from the database"});
        console.error("GET request failed", error);
    }
});

export default pictureRoute;