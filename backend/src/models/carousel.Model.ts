import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

interface carouselAttributes {
    carouselID?: number,
    storeID?: number, 
    carouselName?: string,
    description?: string,
    activeStatus?: Boolean
}

class carousel extends Model<carouselAttributes> implements carouselAttributes {
    public carouselID?: number;
    public storeID?: number; 
    public carouselName?: string;
    public description?: string;
    public activeStatus?: Boolean
}

carousel.init({
    carouselID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    storeID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carouselName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activeStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'carousel',
    tableName: 'carousel',
    timestamps: false
});

export default carousel;
