const execute = async(app, database) => {
    const sql = `
        drop SCHEMA public CASCADE;
        CREATE SCHEMA public;
        GRANT ALL ON SCHEMA public TO postgres;
        GRANT ALL ON SCHEMA public TO public;
    `;
    const res = await database.query(sql);
    return res;
};

module.exports = execute;
