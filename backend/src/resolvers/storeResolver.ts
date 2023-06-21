import store from "../models/store.Model";
import { createNewStore, getStoreByID } from "../services/storeService";

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
            throw new Error("Failed to save new Store to the database");
        }
    }
}

export default storeResolver;