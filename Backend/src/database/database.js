import Sequelize from "sequelize";

export const sequelize = new Sequelize(
    "internetservices", 
    "postgres", 
    "1313", 
    {
        host: "localhost",
        dialect: "postgres",
    }
);