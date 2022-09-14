const execute = async (app, db, collection, query, newData) => {
    try {
        await db.collection(collection).updateOne(query, {$set: newData});
    } catch (err) {
        console.error('Database error while updating: ', err);
    }
}

module.exports = execute;
