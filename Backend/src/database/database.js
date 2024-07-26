import Sequelize from "sequelize";
import {sequelize} from './database/database.js';

export const sequelize = new Sequelize(
    "usersdb", 
    "postgres", 
    "1313", 
    {
        host: "localhost",
        dialect: "postgres",
    }
);