import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Rol } from '../rol/Rol.js'
import { Userstatus } from '../status/Userstatus.js';

export const User = sequelize.define('user', {
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
        allowNull: false,
        references: {
            model: Rol,
            key: 'idrol'
        }
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
        allowNull: false,
        references: {
            model: Userstatus,
            key: 'idstatus'
        }
    }
},
{
    timestamps: false
});

