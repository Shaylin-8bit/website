const execute = async (client, database, query) => {
    const res = await database.query(query);
    return res;
};

module.exports = execute;
