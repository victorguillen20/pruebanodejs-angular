import { Statuscontract } from "../status/Statuscontract.js";
import { Contract } from "../contract/Contract.js";
import { Methodpayments } from "../payments/Methodpayment.js";
import { Service } from "../service/Service.js";
import { Device } from "../device/Device.js";
import { User } from "../user/User.js";
import { Userstatus } from '../status/Userstatus.js';
import { Cash } from "../cash/Cash.js";
import { Usercash } from "../user/Usercash.js";
import { Turn } from "../turn/Turn.js";
import { Attention } from "../attention/Attention.js";
import { Attentiontype } from "../attention/Attentiontype.js";
import { Payments } from "../payments/Payments.js";
import { Client } from "../client/Cliente.js";
import { Rol } from "../rol/Rol.js";
import { Attentionstatus } from "../status/Attentionstatus.js";

Statuscontract.hasMany(Contract, { 
    foreignKey: 'statuscontract_idstatus',
    sourceKey: 'idstatus',
    as: 'contracts'
});

Contract.belongsTo(Statuscontract, { 
    foreignKey: 'statuscontract_idstatus', 
    targetId: 'idstatus',
    as: 'statuscontracts'
});

Methodpayments.hasMany(Contract, { 
    foreignKey: 'methodpayment_idmethodpayment',
    sourceKey: 'idmethodpayment',
    as: 'contracts'
});

Contract.belongsTo(Methodpayments, { 
    foreignKey: 'methodpayment_idmethodpayment', 
    targetId: 'idmethodpayment',
    as: 'methodpayments'
});

Service.hasMany(Contract, { 
    foreignKey: 'service_idservice',
    sourceKey: 'idservice',
    as: 'contracts'
});

Contract.belongsTo(Service, { 
    foreignKey: 'service_idservice', 
    targetId: 'idservice',
    as: 'services'
});

Service.hasMany(Device, { 
    foreignKey: 'service_idservice',
    sourceKey: 'idservice',
    as: 'devices'
});

Device.belongsTo(Service, { 
    foreignKey: 'service_idservice', 
    targetId: 'idservice',
    as: 'services'
});

User.belongsTo(Userstatus, { 
    foreignKey: 'userstatus_idstatus', 
    targetKey: 'idstatus',
    as: 'userstatuses'
});

Cash.hasMany(Usercash, { 
    foreignKey: 'cash_idcash',
    sourceKey: 'idcash',
    as: 'usercashes'
});

Usercash.belongsTo(Cash, { 
    foreignKey: 'cash_idcash', 
    targetId: 'idcash',
    as: 'cash'
});

User.hasMany(Usercash, { 
    foreignKey: 'user_iduser',
    sourceKey: 'iduser',
    as: 'usercashes'
});

Usercash.belongsTo(User, { 
    foreignKey: 'user_iduser', 
    targetId: 'iduser',
    as: 'users'
});

Cash.hasMany(Turn, { 
    foreignKey: 'cash_cashid',
    sourceKey: 'idcash',
    as: 'turns'
});

Turn.belongsTo(Cash, { 
    foreignKey: 'cash_cashid', 
    targetId: 'idcash',
    as: 'cash'
});

Turn.hasMany(Attention, { 
    foreignKey: 'turn_idturn',
    sourceKey: 'idturn',
    as: 'attentions'
});

Attention.belongsTo(Turn, { 
    foreignKey: 'turn_idturn', 
    targetId: 'idturn',
    as: 'turns'
});

Attentiontype.hasMany(Attention, { 
    foreignKey: 'attentiontype_idattentiontype',
    sourceKey: 'idattentiontype',
    as: 'attentions'
});

Attention.belongsTo(Attentiontype, { 
    foreignKey: 'attentiontype_idattentiontype', 
    targetId: 'idattentiontype',
    as: 'attentiontypes'
});

Client.hasMany(Attention, { 
    foreignKey: 'client_idclient',
    sourceKey: 'idclient',
    as: 'attentions'
});

Attention.belongsTo(Client, { 
    foreignKey: 'client_idclient', 
    targetId: 'idclient',
    as: 'clients'
});

Client.hasMany(Payments, { 
    foreignKey: 'client_idclient',
    sourceKey: 'idclient',
    as: 'payments'
});

Payments.belongsTo(Client, { 
    foreignKey: 'client_idclient', 
    targetId: 'idclient',
    as: 'clients'
});

Client.hasMany(Contract, { 
    foreignKey: 'client_idclient',
    sourceKey: 'idclient',
    as: 'contracts'
});

Contract.belongsTo(Client, { 
    foreignKey: 'client_idclient', 
    targetId: 'idclient',
    as: 'clients'
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

Attentionstatus.hasMany(Attention, { 
    foreignKey: 'attentionstatus_idstatus',
    sourceKey: 'idstatus',
    as: 'attentions'
});

Attention.belongsTo(Attentionstatus, { 
    foreignKey: 'attentionstatus_idstatus', 
    targetId: 'idstatus',
    as: 'attentionstatuses'
});


