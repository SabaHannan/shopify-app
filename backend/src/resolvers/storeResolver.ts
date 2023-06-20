import store from "../models/store.Model";
import { getStoreByID } from "../services/storeService";

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
    }
}

export default storeResolver;