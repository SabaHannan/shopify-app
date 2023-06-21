import express from 'express';
import carousel from '../models/carousel.Model';
import { getCarouselByID } from '../services/carouselServices';

//Declare a router instance
const carouselRoute = express.Router();

//QUERY request handlers
carouselRoute.get("getCarouselByID/:carouselID", async (req, res) => {

    let carObj: carousel = new carousel();
    const carouselID: number = parseInt(req.params.carouselID, 10);

    try {
        carObj = await getCarouselByID(carouselID);

        res.status(201).json(carObj);
    }
    catch(error) {
        res.status(500).json({error: "Failed to fetch carousel from database"});
        console.error("Request failed", error);
    }
});

export default carouselRoute;