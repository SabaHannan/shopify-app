import express from 'express';
import carousel from '../models/carousel.Model';
import { createCarousel, getCarouselByID } from '../services/carouselServices';

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

//MUTATOR request handlers
carouselRoute.post("/", async (req, res) => {

    const { storeID, carouselName , description , activeStatus } = req.body;

    let nuCar: carousel = new carousel({
        storeID: storeID,
        carouselName: carouselName,
        description: description,
        activeStatus: activeStatus
    })

    try {
        nuCar = await createCarousel(nuCar);

        res.status(201).json(nuCar);
    }
    catch(error) {
        res.status(500).json({ error: "Failed to save new Carousel to the database"});
        console.error("request failed", error);
    }
})

export default carouselRoute;