import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Rol = sequelize.define('rol', {
    idrol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rolname: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    timestamps: false
});

