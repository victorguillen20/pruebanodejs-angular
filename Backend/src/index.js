import app from './app.js';
import {sequelize} from './database/database.js';

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