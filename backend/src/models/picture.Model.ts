import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

interface pictureAttributes {
    pictureID?: number,
    pictureName?: string,
    pictureData?: any
}

class picture extends Model<pictureAttributes> implements pictureAttributes {
    public pictureID?: number;
    public pictureName?: string;
    public pictureData?: any
}

picture.init({
    pictureID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pictureName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pictureData: {
        type: DataTypes.ARRAY(DataTypes.BLOB),
        allowNull: true
    }
},
{
    sequelize,
    modelName: 'picture',
    tableName: 'picture',
    timestamps: false
}
);

export default picture;