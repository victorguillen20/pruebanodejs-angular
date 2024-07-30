import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Service = sequelize.define('services', {
    idservice: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    servicename: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    servicedescription: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    velocity: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    price: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
},
{
    timestamps: false
});

