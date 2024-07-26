import app from './app.js';
import {sequelize} from './database/database.js';

import './models/client/Cliente.js';
import './models/status/Userstatus.js';
import './models/service/Service.js';
import './models/device/Device.js';
import './models/rol/Rol.js';
import './models/cash/Cash.js';
import './models/user/User.js';
import './models/user/Usercash.js';
import './models/status/Attentionstatus.js';
import './models/status/Statuscontract.js';
import './models/attention/Attentiontype.js';
import './models/turn/Turn.js';
import './models/attention/Attention.js';
import './models/payments/Payments.js';
import './models/payments/Methodpayment.js';
import './models/contract/Contract.js';


async function main(){
    try {
        await sequelize.sync({force: true});
        app.listen(4000);
        console.log('Server on por 4000');
    } catch (error) {
        console.log('unable to connect to the database', error.message);
    }
}

main();