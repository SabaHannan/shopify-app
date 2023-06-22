import store from "../models/store.Model";
import { createNewStore, deleteStore, getStoreByID, updateStore } from "../services/storeService";

//Resolvers for the store entity
const storeResolver = {

    //query to get store given store id
    getStoreByID: async (args: {storeID: number}): Promise<store> => {

        let storeObj: store = new store();
        const { storeID } = args;

        try {
            storeObj = await getStoreByID(storeID);

            return storeObj

        }
        catch(error) {
            throw new Error("Failed to fetch store from the database: " + error);
        }
    },

    //Mutation to create and save a new store to the database
    createStore: async (args: { name: string, url: string, token: string, apikey: string, secretkey: string, whEvent: string, whCallbackURL: string }): Promise<store> => {
        
        let newStore: store = new store({
            storeName: args.name,
            storeURL: args.url,
            accessToken: args.token, 
            apiKey: args.apikey,
            apiSecretKey: args.secretkey,
            webhookEvent: args.whEvent,
            webhookCallbackURL: args.whCallbackURL
        })

        try{
            newStore = await createNewStore(newStore);

            return newStore;
        }
        catch(error) {
            throw new Error("Failed to save new Store to the database: " + error);
        }
    },

    updateStore: async (args: {storeID: number, name: string, url: string, token: string, apikey: string, secretkey: string, whEvent: string, whCallbackURL: string}): Promise<store> => {
        
        let storeValues: store = new store({
            storeName: args.name,
            storeURL: args.url,
            accessToken: args.token, 
            apiKey: args.apikey,
            apiSecretKey: args.secretkey,
            webhookEvent: args.whEvent,
            webhookCallbackURL: args.whCallbackURL
        })

        const { storeID } = args

        try {

            storeValues = await updateStore(storeID, storeValues);

            return storeValues;

        }
        catch(error) {
            throw new Error("Failed to update the store in the database: " + error);
        }
    },

    deleteStore: async (args: {storeID: number}): Promise<Boolean> => {

        let storeDeleted: Boolean = false;
        const { storeID } = args;

        try {
            storeDeleted = await deleteStore(storeID);

            return storeDeleted
        }
        catch(error) {
            throw new Error("Failed to remove store from the database: " + error);
        }
    }
}

export default storeResolver;