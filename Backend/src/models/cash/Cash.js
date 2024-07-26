import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Cash = sequelize.define('cash', {
    idcash: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cashdescription: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    active: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
},
{
    timestamps: false
});

