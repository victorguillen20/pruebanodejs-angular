import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Userstatus = sequelize.define('userstatuses', {
    idstatus: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    timestamps: false
});

