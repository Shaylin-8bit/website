const execute = async (app, database, query) => {
    let res = 'error';
    try {
        res = await database.query(query);
    } catch (err) {
        console.error(err);
    }
    return res;
};

module.exports = execute;
