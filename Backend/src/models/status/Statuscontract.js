import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';


export const Statuscontract = sequelize.define('statuscontracts', {
    idstatus: {
        type: DataTypes.STRING(3),
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},
{
    timestamps: false
});

