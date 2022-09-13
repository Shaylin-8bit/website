const execute = async (app, db) => {
    console.log('Checking database...');
    const collections = app.config.database.collections

    for (let collection in collections) {
        console.log(`  Checking collection "${collection}"`);
        try {
            await db.createCollection(collection);
        } catch (err) {
            if (err.codeName === 'NamespaceExists') {
                console.log('    exists');
            } else {
                console.error(`    Check failed with: ${err.codeName}`);
                continue;
            }
        }
        console.log('    created');

        for (let document of collections[collection]) {
            console.log(`    checking document "${document._id}"`);
            try {
                const check = await db.collection(collection).find({ _id: document._id }).toArray();
                if (check.length) {
                    console.log(`      exists`);
                } else {
                    console.log(`      missing: attempting to create`);
                    try {
                        await db.collection(collection).insertOne(document);
                    } catch (err) {
                        console.error(`   check failed with: ${err}`);
                        continue;
                    }
                    console.log('      created');
                }
            } catch (err) {
                console.error(`      Check failed with: ${err}`);
                continue;
            }
            
            /**/
        }
    }
};

module.exports = execute;
