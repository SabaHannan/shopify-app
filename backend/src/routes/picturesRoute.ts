import express from 'express';
import { createPicture, deletePicture, getPictureByID, getPictures, updatePicture } from '../services/pictureServices';
import picture from '../models/picture.Model';

//Declare a router instance
const pictureRoute = express.Router();

//QUERY request handlers
pictureRoute.get("/getPictureByID/:pictureID", async (required, result) => {
    var picObject: picture = new picture();
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

//MUTATION request handlers
pictureRoute.post("/", async (req, res) => {
    try {
        let nuPic : picture = new picture();

        const { pictureName, pictureData } = req.body;

        nuPic = await createPicture(pictureName, pictureData) as picture;

        res.json(nuPic);
    }catch(error) {
        res.status(500).json({ error: "Failed to create picture in the database"});
    }
});

pictureRoute.put("/updatePicture/:pictureID", async (req, res) => {
    try{
        let updatePic = new picture();

        const { pictureName, pictureData } = req.body;
        const pictureID: number = parseInt(req.params.pictureID, 10)

        updatePic = await updatePicture(pictureID, pictureName, pictureData);

        res.status(201).json(updatePic);
    }
    catch(error) {
        res.status(500).json({ error: "Failed to update picture in the database" });
    }
});

pictureRoute.delete("/deletePicture/:pictureID", async (req, res) => {
    try{
        let picDeleted: Boolean = false;

        const pictureID: number = parseInt(req.params.pictureID, 10);

        picDeleted = await deletePicture(pictureID);

        res.status(201).json(picDeleted);
    }
    catch(error) {
        res.status(500).json({ error: "Failed to remove picture from the database"});
    }
})

export default pictureRoute;