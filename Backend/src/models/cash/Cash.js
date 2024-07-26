import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Turn } from '../turn/Turn.js';

export const Cash = sequelize.define('cash', {
    idcash: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cashdescription: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    active: {
        type: DataTypes.STRING(1),
        allowNull: false
    }
},
{
    timestamps: false
});

Cash.hasMany(Turn, { 
    foreignKey: 'cash_cashid',
    sourceKey: 'idcash',
    as: 'turn'
});

Turn.belongsTo(Cash, { 
    foreignKey: 'cash_cashid', 
    targetId: 'idcash',
    as: 'cash'
});