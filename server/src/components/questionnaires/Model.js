import { dbCollections, getDbInstance } from "../../../db";

export async function findOne({ _id }) {
  const db = await getDbInstance();
  const filter = { _id };

  return db.collection(dbCollections.questionnaires).findOne(filter);
}

export async function insertOne(question) {
  const db = await getDbInstance();

  await db.collection(dbCollections.questionnaires).insertOne(question);
}

export async function remove(question) {
  const db = await getDbInstance();

  await db.collection(dbCollections.questionnaires).insertOne(question);
}
