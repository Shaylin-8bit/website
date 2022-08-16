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
        let createSql = `
            CREATE TABLE ${table} (
                ${app.config.database.tables[table].map(x => `${x.name} ${x.type}`).join(',')}
            );
        `;

        await database.query(createSql);
    }
};

module.exports = execute;
