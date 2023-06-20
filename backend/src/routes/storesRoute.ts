import express from 'express';
import store from '../models/store.Model';
import { getStoreByID } from '../services/storeService';

//Declare a router instance
const storeRoute = express.Router();

//Query request handlers
storeRoute.get("/getStoreByID/:storeID", async (req, res) => {
    let storeObj: store = new store();
    const storeID: number = parseInt(req.params.storeID, 10);

    try {
        storeObj =  await getStoreByID(storeID);

        res.status(201).json(storeObj);
    }
    catch(error) {
        res.status(500).json({ error: "Failed to fetch Store from the database"});
        console.error("Request failed", error)
    }
});

export default storeRoute;