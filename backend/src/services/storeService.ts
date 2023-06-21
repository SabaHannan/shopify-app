import store from "../models/store.Model";

/**
 * Method service to get store from the database given its primary key
 * @param storeID - integer
 * @returns store - JSON store object
 */
export const getStoreByID = async (storeID: number): Promise<store> => {
    
    let storeObject: store = new store();

    try {
        const result = await store.findByPk(storeID) as store;

        storeObject = result;

        return storeObject;
    }
    catch(error) {
        throw new Error("Failed to fetch store from the database");
    }
};

/**
 * Method to create and save a new store entry in the database
 * @param nuStore - store object
 * @returns nuStore - json store with storeID
 */
export const createNewStore = async (nuStore: store): Promise<store> => {
    let newStore = {
        storeName: nuStore.storeName,
        storeURL: nuStore.storeURL,
        accessToken: nuStore.accessToken,
        apiKey: nuStore.apiKey,
        apiSecretKey: nuStore.apiSecretKey,
        webhookEvent: nuStore.webhookEvent,
        webhookCallbackURL: nuStore.webhookCallbackURL
    };

    try {
        
        const result = await store.create(newStore, { returning: true }) as store;

        nuStore = result;

        return nuStore;
    }
    catch(error) {
        throw new Error("Failed to save new store to the database");
    }
}