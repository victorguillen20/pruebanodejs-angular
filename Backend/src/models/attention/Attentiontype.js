import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

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

