import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Methodpayments = sequelize.define('methodpayments', {
    idmethodpayment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    timestamps: false
});

