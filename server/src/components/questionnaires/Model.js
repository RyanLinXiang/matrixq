import { dbCollections, getDbInstance } from "../../../db/index.js";

export async function findOne({ key, value }) {
  const db = await getDbInstance();
  const filter = { [key]: value };

  return db.collection(dbCollections.questionnaires).findOne(filter);
}

export async function updateOne({ doc }) {
  const db = await getDbInstance();
  const filter = { _id: doc._id };
  const query = { $set: doc };
  return db.collection(dbCollections.questionnaires).updateOne(filter, query);
}
