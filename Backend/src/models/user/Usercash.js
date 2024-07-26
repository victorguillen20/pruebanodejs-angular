import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Cash } from '../cash/Cash.js'; 
import { User } from './User.js';

export const Usercash = sequelize.define('usercash', {
    user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'iduser'
        }
    },
    cash_idcash: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cash,
            key: 'idcash'
        }
    }
},
{
    timestamps: false
});
