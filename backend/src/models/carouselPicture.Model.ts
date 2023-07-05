import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize"

interface carouselPictureAttributes {
    carouselID?: number,
    pictureID?: number
}

class carouselPicture extends Model<carouselPictureAttributes> implements carouselPictureAttributes {
    public carouseID?: number;
    public pictureID?: number; 
}

carouselPicture.init({
    carouselID: {
        type: DataTypes.INTEGER
    },
    pictureID: {
        type: DataTypes.INTEGER
    }
},
{
    sequelize,
    modelName: 'carouselPicture',
    tableName: 'carouselPicture',
    timestamps: false
});

export default carouselPicture;
