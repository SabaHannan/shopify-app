import express from 'express';
import { createCarousePicture } from '../services/carouselPictureService';
import carouselPicture from '../models/carouselPicture.Model';

//Declaring a route instance
const carouselPictureRoute = express.Router();

//MUTATION requests handlers
carouselPictureRoute.post("/createCarouselPicture", async (req, res) => {
    try {
        
        const { carouselID, pictureID } = req.body;

        let nuCarPic: carouselPicture = new carouselPicture({
            carouselID: carouselID,
            pictureID: pictureID
        });

        nuCarPic = await createCarousePicture(nuCarPic);

        res.status(201).json(nuCarPic);
    }
    catch(error) {
        res.status(201).json({ error: "Failed to save CarouselPicture to the database"});
        console.error("Request failed", error);
    }
});

export default carouselPictureRoute;