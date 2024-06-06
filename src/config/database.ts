import { Sequelize } from "sequelize";

const sequelize = new Sequelize("crud_app","postgres","raghav",{
    host:"localhost",
    dialect:"postgres"
})

export default sequelize