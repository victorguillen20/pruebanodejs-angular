import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const User = sequelize.define('users', {
    iduser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    rol_idrol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creationdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    usercreate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userapproval: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateapproval: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userstatus_idstatus: {
        type: DataTypes.STRING(3),
        allowNull: false
    }
},
{
    timestamps: false
});

