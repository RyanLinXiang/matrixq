import { dbCollections, getDbInstance } from "../../../db/index.js";

export async function findMany({ key, value }) {
  const db = await getDbInstance();
  const filter = { [key]: value };

  return db.collection(dbCollections.answers).find(filter).toArray();
}
