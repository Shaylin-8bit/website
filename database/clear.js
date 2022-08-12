const execute = async(client, database) => {
    const sql = 'drop SCHEMA public CASCADE';
    const res = await database.query(sql);
    return res;
};

module.exports = execute;
