import { program } from "commander";
import { createRequire } from "module";
import { getDbInstance } from "./db/index.js";
const require = createRequire(import.meta.url);

const { NODE_ENV: environment } = process.env;

const {
  db: { collections }
} = require(`./config/${environment || "development"}.json`);

const help = () => {
  console.log("Please call like this: node seed initial");
};

const seedDb = async () => {
  const db = await getDbInstance();

  for (const collectionKey of Object.keys(collections)) {
    const collection = collections[collectionKey];
    const seeds = require(`./seeds/${collection}.json`);
    if (await db.listCollections({ name: collection }).hasNext()) {
      continue;
    }
    await db.createCollection(collection);
    await db.collection(collection).insertMany(seeds);
  }

  process.exit();
};

program.arguments("<command>").action(async (arg) => {
  if (arg === "initial") {
    await seedDb();
  }
});

program.parse(process.argv);

if (program.args.length === 0) {
  help();
}
