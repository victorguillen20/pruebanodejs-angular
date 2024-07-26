import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import {Attention} from '../../models/attention/Attention.js'

export const Attentionstatus = sequelize.define('attentionstatus', {
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


Attentionstatus.hasMany(Attention, { 
    foreignKey: 'attentionstatus_idstatus',
    sourceKey: 'idstatus',
    as: 'attention'
});

Attention.belongsTo(Attentionstatus, { 
    foreignKey: 'attentionstatus_idstatus', 
    targetId: 'idstatus',
    as: 'attentionstatus'
});
