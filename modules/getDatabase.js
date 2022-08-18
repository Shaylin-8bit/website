const {Client} = require('pg');
const fs = require('node:fs');
require('dotenv').config();

const getClient = async (client) => {
    const db = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        ssl: {rejectUnauthorized: false},
      });
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
            const DB = await getClient();
            const result = await execute(app, DB, ...args);
            await DB.end();
            return result;
        }
	    DBObject[file.slice(0, -3)] = callback; 
    }

    app.database = DBObject;
}

module.exports = getDatabase;
