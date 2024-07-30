import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Contract = sequelize.define('contracts', {
    idcontract: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    enddate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    service_idservice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    statuscontract_idstatus: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    client_idclient: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    methodpayment_idmethodpayment: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
});

