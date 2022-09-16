const execute = async (app, db, collection) => {
    return await db.collection(collection).count();
};

module.exports = execute;
