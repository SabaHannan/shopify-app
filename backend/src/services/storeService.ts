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
}