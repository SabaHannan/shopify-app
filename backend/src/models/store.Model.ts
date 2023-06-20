import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

interface storeAttributes {
   storeID?: number,
   storeName?: string,
   storeURL?: string,
   accessToken?: string,
   apiKey?: string,
   apiSecretKey?: string,
   webhookEvent?: string,
   webhookCallbackURL?: string 
}

class store extends Model<storeAttributes> implements storeAttributes {
    public storeID?: number;
    public storeName?: string;
    public storeURL?: string;
    public accessToken?: string;
    public apiKey?: string;
    public apiSecretKey?: string;
    public webhookEvent?: string;
    public webhookCallbackURL?: string; 
};

store.init({
    storeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    storeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    storeURL: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apiKey: {
        type: DataTypes.STRING,
        allowNull: true
    },
    apiSecretKey: {
        type: DataTypes.STRING,
        allowNull: true
    },
    webhookEvent: {
        type: DataTypes.STRING,
        allowNull: true
    },
    webhookCallbackURL: {
        type: DataTypes.STRING,
        allowNull: true
    } 
},
{
    sequelize,
    modelName: 'store',
    tableName: 'store',
    timestamps: false
});

export default store;
