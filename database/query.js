const execute = async (app, db, collection, query) => {
    let res;
    try {
        res = await db.collection(collection).find(query).toArray();
    } catch (err) {
        console.error(`Database error during query: ${err}`);
    }
    return res;
}

module.exports = execute;
