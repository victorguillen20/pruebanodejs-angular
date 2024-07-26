import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Client } from '../client/Cliente.js';

export const Payments = sequelize.define('payments', {
    idpayment: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    paymentdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    client_idclient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'idclient'
        }
    }
},
{
    timestamps: false
});

