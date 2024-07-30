import app from './app.js';
import {sequelize} from './database/database.js';

import './models/relaciones/relaciones.js'


async function main(){
    try {
        await sequelize.sync({force: false});
        app.listen(3000);
        console.log('Server on port', 3000);
    } catch (error) {
        console.log('unable to connect to the database', error.message);
    }
}

main();