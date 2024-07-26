import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Attention } from '../attention/Attention.js';

export const Turn = sequelize.define('turn', {
    idturn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING(7),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cash_cashid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usergestorid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
});

Turn.hasMany(Attention, { 
    foreignKey: 'turn_idturn',
    sourceKey: 'idturn',
    as: 'attention'
});

Attention.belongsTo(Turn, { 
    foreignKey: 'turn_idturn', 
    targetId: 'idturn',
    as: 'turn'
});

