import { dbCollections, getDbInstance } from "../../../db/index.js";

export async function findOne({ key, value }) {
  const db = await getDbInstance();
  const filter = { [key]: value };

  return db.collection(dbCollections.questionnaires).findOne(filter);
}