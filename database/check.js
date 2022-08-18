const bcrypt = require('bcrypt');

const execute = async (app, database) => {
    console.log('  Checking database...');
    for (let table in app.config.database.tables) {
        const selectSql = `
            SELECT EXISTS (
                SELECT FROM 
                    information_schema.tables 
                WHERE 
                    table_schema LIKE 'public' AND 
                    table_type LIKE 'BASE TABLE' AND
                    table_name = '${table}'
            );
        `;
        result = await database.query(selectSql);
        exists = result.rows[0].exists;
        console.log(`    Table: "${table}" does ${exists ? '' : 'not '}exist`);
        if (exists) continue;

        console.log(`    Creating table "${table}"`);
        const createSql = `CREATE TABLE ${table} (\n\t${app.config.database.tables[table].map(x => `${x.name} ${x.type}`).join(',\n\t')}\n);`;

        await database.query(createSql);
    }
    const password = await bcrypt.hash('1234', 10);
    await database.query(`INSERT INTO config (var, val) VALUES ('password', '${password}');`);
};

module.exports = execute;
