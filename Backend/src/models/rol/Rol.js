import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import {User} from '../user/User.js'


export const Rol = sequelize.define('rols', {
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


Rol.hasMany(User, { 
    foreignKey: 'rol_idrol',
    sourceKey: 'idrol',
    as: 'users'
});

User.belongsTo(Rol, { 
    foreignKey: 'rol_idrol', 
    targetId: 'idrol',
    as: 'rols'
});
