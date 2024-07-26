import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import {Attention} from '../../models/attention/Attention.js'

export const Attentiontype = sequelize.define('attentiontype', {
    idattentiontype: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
{
    timestamps: false
});

Attentiontype.hasMany(Attention, { 
    foreignKey: 'attentiontype_idattentiontype',
    sourceKey: 'idattentiontype',
    as: 'attention'
});

Attention.belongsTo(Attentiontype, { 
    foreignKey: 'attentiontype_idattentiontype', 
    targetId: 'idattentiontype',
    as: 'attentiontype'
});
