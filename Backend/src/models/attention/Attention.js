import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Turn } from '../turn/Turn.js';
import { Client } from '../client/Cliente.js';
import { Attentiontype } from './Attentiontype.js';
import { Attentionstatus } from '../status/Attentionstatus.js';

export const Attention = sequelize.define('attention', {
    idattention: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    turn_idturn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Turn,
            key: 'idturn'
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
    attentiontype_idattentiontype: {
        type: DataTypes.STRING(3),
        allowNull: false,
        references: {
            model: Attentiontype,
            key: 'idattentiontype'
        }
    },
    attentionstatus_idstatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Attentionstatus,
            key: 'idstatus'
        }
    }
},
{
    timestamps: false
});

