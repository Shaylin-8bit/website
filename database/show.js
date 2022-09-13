const execute = async (app, db) => {
    const res = await db.admin().listDatabases();
    console.log(res);
};

module.exports = execute;
