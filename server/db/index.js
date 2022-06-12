import { MongoClient } from "mongodb";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { NODE_ENV: environment } = process.env;
const {
  db: { mongoUri, dbName, collections },
} = require(`../config/${environment || "development"}.json`);

let db;

async function connectToDb() {
  const client = new MongoClient(mongoUri);
  await client.connect();
  db = client.db(dbName);
}

export async function getDbInstance() {
  if (!db) {
    await connectToDb();
  }

  return db;
}

export const dbCollections = collections;
