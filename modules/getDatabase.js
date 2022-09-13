const {MongoClient} = require('mongodb');
const fs = require('node:fs');
require('dotenv').config();

const getClient = async (client) => {
    const db = new MongoClient(process.env.DB_URL);
    await db.connect();
    return db; 
}

const getDatabase = (app) => {
    console.log('Building database object...');
    const DBObject = {};
    const actionDir = './database';
    const actionFiles = fs.readdirSync(actionDir).filter(file => file.endsWith('.js'));

    for (const file of actionFiles) {
        console.log(`  Method "${file}"`);
	    const execute = require(`.${actionDir}/${file}`);
        const callback = async (...args) => {
            let DB;
            try {
                DB = await getClient();
            } catch (err) {
                console.error(err);
                return;
            }
            const result = await execute(app, DB.db(), ...args);
            await DB.close();
            return result;
        }
	    DBObject[file.slice(0, -3)] = callback; 
    }

    app.database = DBObject;
}

module.exports = getDatabase;
