import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Attentionstatus = sequelize.define('attentionstatuses', {
    idstatus: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},
{
    timestamps: false
});


