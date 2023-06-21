import express from 'express';
import store from '../models/store.Model';
import { createNewStore, deleteStore, getStoreByID, updateStore } from '../services/storeService';

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

//Mutator request handlers
storeRoute.post("/", async (req, res) => {
    let nuStore = new store();
    
    const { storeName, storeURL, accessToken, apiKey, apiSecretKey, webhookEvent, webhookCallbackURL } = req.body;

    nuStore.storeName = storeName;
    nuStore.storeURL = storeURL;
    nuStore.accessToken = accessToken;
    nuStore.apiKey = apiKey;
    nuStore.apiSecretKey = apiSecretKey;
    nuStore.webhookEvent = webhookEvent;
    nuStore.webhookCallbackURL = webhookCallbackURL;

    try {

        nuStore = await createNewStore(nuStore);

        res.status(201).json(nuStore);

    }
    catch(error) {
        res.status(500).json({ error: "Failed to save Store to the database"});
        console.error("Request faile", error);
    }
});

storeRoute.put("updateStore/:storeID", async (req, res) => {

    const storeID: number  = parseInt(req.params.storeID, 10);
    const { storeName, storeURL, accessToken, apiKey, apiSecretKey, webhookEvent, webhookCallbackURL } = req.body;

    let upStore: store = new store({
        storeName: storeName,
        storeURL: storeURL,
        accessToken: accessToken,
        apiKey: apiKey,
        apiSecretKey: apiSecretKey,
        webhookEvent: webhookEvent,
        webhookCallbackURL: webhookCallbackURL
    });

    try {
        upStore = await updateStore(storeID, upStore);

        res.status(201).json(upStore);
    }
    catch(error) {
        res.status(500).json({error: "Failed to update the store in the database"});
        console.error("PUT request failed", error);
    }

});

storeRoute.delete("deleteStore/:storeID", async (req, res) => {

    let storeDeleted: Boolean = false;
    const storeID: number = parseInt(req.params.storeID, 10);

    try {

        storeDeleted = await deleteStore(storeID) as Boolean;

        res.status(201).json(storeDeleted);

    }
    catch(error) {
        res.status(500).json(storeDeleted);
        console.error("Failed to remove store", error);
    }
})

export default storeRoute;