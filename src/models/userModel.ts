import { DataTypes,Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model{
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      password:{
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique:true
      }
    },
    {
        tableName:"users",
        sequelize
    }
)

export default User;