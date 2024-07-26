import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Cash } from '../cash/Cash.js';  
import { User } from '../user/User.js';

export const Turn = sequelize.define('turn', {
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
        allowNull: false,
        references: {
            model: Cash,
            key: 'idcash'
        }
    },
    usergestorid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
});
