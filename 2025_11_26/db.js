const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://aaliceecliaaeu_db_user:admin123@cluster0.trqopqs.mongodb.net/?appName=Cluster0";

let db;

async function connectMongo() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db("LogDatabase");
        return db;
    } catch (err) {
        return null;
    }
}

function getLogDatabase() {
    return db;
}

exports.connectMongo = connectMongo;
exports.getLogDatabase = getLogDatabase;