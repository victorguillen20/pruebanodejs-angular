import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Service } from '../service/Service.js';
import { Statuscontract } from '../status/Statuscontract.js';
import { Client } from '../client/Cliente.js';
import { Methodpayments } from '../payments/Methodpayment.js';


export const Contract = sequelize.define('contract', {
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
        allowNull: false,
        references: {
            model: Service,
            key: 'idservice'
        }
    },
    statuscontract_idstatus: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
            model: Statuscontract,
            key: 'idstatus'
        }
    },
    client_idclient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'idclient'
        }
    },
    methodpayment_idmethodpayment: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Methodpayments,
            key: 'idmethodpayment'
        }
    }
},
{
    timestamps: false
});

