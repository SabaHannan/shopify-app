import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize";

interface carouselPictureAttributes {
    carouselID?: number,
    pictureID?: number
}

class carouselPicture extends Model<carouselPictureAttributes> implements carouselPictureAttributes {
    public carouselID?: number;
    public pictureID?: number; 
}

carouselPicture.init({
    carouselID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pictureID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'carouselPicture',
    tableName: 'carouselPicture',
    timestamps: false,
});

carouselPicture.removeAttribute("id");

export default carouselPicture;
