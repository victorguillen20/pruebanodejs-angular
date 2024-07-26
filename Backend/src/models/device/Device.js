import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Service } from '../service/Service.js'

export const Device = sequelize.define('device', {
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
        allowNull: false,
        references: {
            model: Service,
            key: 'idservice'
        }
    }
},
{
    timestamps: false
});

