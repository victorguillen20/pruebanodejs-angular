import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';


export const Turn = sequelize.define('turns', {
    idturn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(7),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cash_cashid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usergestorid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
});
