const execute = async (app, database) => {
    console.log('  Checking database...');

    let res;
    let sql;

    for (let table in app.config.database) {
        console.log(`    ${table}`);
        let sql = `
            SELECT EXISTS (
                SELECT FROM 
                    information_schema.tables 
                WHERE 
                    table_schema LIKE 'public' AND 
                    table_type LIKE 'BASE TABLE' AND
                    table_name = '${table}'
                LIMIT 
                    1
            );
        `;

        try {
            res = await database.query(sql);
        } catch (err) {
            console.error(`Database error: ${err}`);
            return;
        }
        
        if (!res.rows[0].exists) {
            console.log(`      ${table} does not exist; creating`);
            const columns = app.config.database[table].columns.map(x => `${x.name} ${x.type} ${x.limit}`).join(', '); 
            sql = `CREATE TABLE ${table} ( ${columns});`
            try {
                await database.query(sql);
            } catch (err) {
                console.error(`Database error: ${err}`);
                return;
            }
            console.log(`      ${table} created`);
        } else {
            console.log(`      ${table} exists`);
        }

        const rowCount = app.config.database[table].rows.length;
        console.log(`      Checking ${rowCount} row${rowCount == 1 ? "" : "s"}`);
        for (let row of app.config.database[table].rows) {
            sql = `SELECT * FROM ${table} WHERE ${row.chck} LIMIT 1;`;
            try {
                res = await database.query(sql);
            } catch (err) {
                console.error(`Database error: ${err}`);
                return;
            }
            console.log(`        "${row.chck}" result: ${res.rows.length ? "exists" : "missing"}`);
            if (!res.rows.length) {
                console.log(`        Creating row for "${row.chck}"`);
                sql = `INSERT INTO ${table} (${row.cols}) VALUES (${row.vals.map(x => `'${typeof(x) === 'object' ? JSON.stringify(x) : x}'`)});`;

                try {
                    res = await database.query(sql);
                } catch (err) {
                    console.error(`Database error: ${err}`);
                    return;
                }
                console.log(`        "${row.chck}" created`);
            }
        }
    }
};

module.exports = execute;
