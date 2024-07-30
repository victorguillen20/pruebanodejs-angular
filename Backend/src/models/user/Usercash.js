import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';


export const Usercash = sequelize.define('usercashes', {
    user_iduser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cash_idcash: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
});
