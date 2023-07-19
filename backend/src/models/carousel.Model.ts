import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

interface carouselAttributes {
    carouselID?: number,
    storeID?: number, 
    carouselName?: string,
    description?: string,
    activeStatus?: Boolean,
    autoplay?: Boolean,
    autoplaySpeed?: number,
    arrows?: Boolean,
    dots?: Boolean,
    infinite?: Boolean,
    pauseOnHover?: Boolean,
    slideToShow?: number,
    slidesToScroll?: number
}

class carousel extends Model<carouselAttributes> implements carouselAttributes {
    public carouselID?: number;
    public storeID?: number; 
    public carouselName?: string;
    public description?: string;
    public activeStatus?: Boolean;
    public autoplay?: Boolean;
    public autoplaySpeed?: number;
    public arrows?: Boolean;
    public dots?: Boolean;
    public infinite?: Boolean;
    public pauseOnHover?: Boolean;
    public slideToShow?: number;
    public slidesToScroll?: number;
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
        allowNull: false,
    },
    autoplay: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    autoplaySpeed: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    arrows: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    dots: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    infinite: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    pauseOnHover: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    slideToShow: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
    ,
    slidesToScroll: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }

},
{
    sequelize,
    modelName: 'carousel',
    tableName: 'carousel',
    timestamps: false
});

export default carousel;
