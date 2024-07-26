import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Attention } from '../attention/Attention.js';

export const Client = sequelize.define('client', {
    idclient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    identification: {
        type: DataTypes.STRING(13),
        allowNull: false
    },    
    email: {
        type: DataTypes.STRING(120),
        allowNull: false
    },    
    phonenumber: {
        type: DataTypes.STRING(13),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    referenceaddress: {
        type: DataTypes.STRING(120),
        allowNull: false
    }
},
{
    timestamps: false
});

Client.hasMany(Attention, { 
    foreignKey: 'client_idclient',
    sourceKey: 'idclient',
    as: 'attention'
});

Attention.belongsTo(Client, { 
    foreignKey: 'client_idclient', 
    targetId: 'idclient',
    as: 'client'
});


