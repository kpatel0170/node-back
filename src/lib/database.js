import assert from "node:assert";
import mongoose from "mongoose";
import config from "#config";
// eslint-disable-next-line import/extensions
// import logger from "#lib/logger";

const formatArg = mongoose.Collection.prototype.$format;

// function queryLogger(collectionName, methodName, ...methodArgs) {
//   const functionCall = [collectionName, methodName].join(".");

//   const args = [];
//   // eslint-disable-next-line no-plusplus
//   for (let arg = methodArgs.length - 1; arg >= 0; --arg) {
//     if (formatArg(methodArgs[arg]) || args.length) {
//       args.unshift(formatArg(methodArgs[arg]));
//     }
//   }

//   const query = `${functionCall}(${args.join(", ")})`;
//   logger.debug({ query }, "executing mongodb query");
// }

// if (config.log.databaseQueries) {
//   mongoose.set("debug", queryLogger);
// }

export async function connect(uri) {
  await mongoose.connect(uri);
  return mongoose.connection;
}

export async function disconnect() {
  await mongoose.disconnect();
}

export async function ping() {
  const result = await mongoose.connection.db.admin().ping();
  assert(result?.ok === 1);
}
