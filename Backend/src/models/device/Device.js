import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';


export const Device = sequelize.define('devices', {
    iddevice: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    devicename: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    service_idservice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
});

