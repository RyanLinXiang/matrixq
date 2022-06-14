import { dbCollections, getDbInstance } from "../../../db/index.js";

export async function findMany({ key, value }) {
  const db = await getDbInstance();
  const filter = { [key]: value };

  return db.collection(dbCollections.answers).find(filter).toArray();
}

export async function insertMany({ docs }) {
  const db = await getDbInstance();
  await db.collection(dbCollections.answers).insertMany(docs);
}

export async function deleteMany({ key, value }) {
  const db = await getDbInstance();
  const filter = { [key]: value };

  await db.collection(dbCollections.answers).deleteMany(filter);
}
