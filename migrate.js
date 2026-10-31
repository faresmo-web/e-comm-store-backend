
require("dotenv").config();

const mongoose = require("mongoose");
const { MongoClient } = mongoose.mongo;

const LOCAL_URI = "mongodb://127.0.0.1:27017";
const ATLAS_URI = process.env.ATLAS_URI;
const DB_NAME = "e-comm-store-db";

async function migrateDatabase() {
    const localClient = new MongoClient(LOCAL_URI);
    const atlasClient = new MongoClient(ATLAS_URI);

    try {
        await localClient.connect();
        console.log("Connected to Local MongoDB");

        await atlasClient.connect();
        console.log("Connected to MongoDB Atlas");

        const localDB = localClient.db(DB_NAME);
        const atlasDB = atlasClient.db(DB_NAME);

        const collections = await localDB
            .listCollections({ type: "collection" })
            .toArray();

        for (const item of collections) {
            const name = item.name;

            if (name.startsWith("system.")) continue;

            console.log(`Migrating: ${name}`);

            const source = localDB.collection(name);
            const target = atlasDB.collection(name);

            const exists = await atlasDB
                .listCollections({ name })
                .hasNext();

            if (!exists) {
                await atlasDB.createCollection(name);
            }

            const documents = await source.find({}).toArray();

            if (documents.length > 0) {
                const operations = documents.map(doc => ({
                    replaceOne: {
                        filter: { _id: doc._id },
                        replacement: doc,
                        upsert: true
                    }
                }));

                await target.bulkWrite(operations);
            }

            console.log(`${name}: ${documents.length} documents copied`);
        }

        console.log("Migration completed successfully!");

    } catch (error) {
        console.error("Migration Error:", error);
    } finally {
        await localClient.close();
        await atlasClient.close();
    }
}

if (!ATLAS_URI) {
    console.error("ATLAS_URI is missing from .env");
} else {
    migrateDatabase();
}
