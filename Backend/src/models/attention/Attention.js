import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Attention = sequelize.define('attention', {
    idattention: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    turn_idturn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    client_idclient: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    attentiontype_idattentiontype: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    attentionstatus_idstatus: {
        type: DataTypes.INTEGER,
        allowNull: false        
    }
},
{
    timestamps: false
});

