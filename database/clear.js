const execute = async (app, db) => {
    console.log('Clearing database collections');
    const collections = app.config.database.collections

    for (let collection in collections) {
        console.log(`  clearing ${collection}`);
        try {
            await db.dropCollection(collection);
        } catch (err) {
            console.error(`  failed to delete with: ${err}`);
            continue;
        }
    }
};

module.exports = execute;
