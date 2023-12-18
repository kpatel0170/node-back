import fs from "fs";
import path from "path";
import dotenv from "dotenv";
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanEnv, str, num } from "envalid";

const appPath = path.dirname(import.meta.url).replace("file:", "");
const pkgPath = path.join(appPath, "../package.json");
// eslint-disable-next-line security/detect-non-literal-fs-filename
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

dotenv.config({
  path: path.join(appPath, "../.env")
});

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "test", "production", "staging"],
    default: "development"
  }),
  PORT: num({ default: 3000 }),
  JWT_SECRET: str(),
  JWT_EXPIRATION_MINUTES: num({ default: 15 }),
  MONGO_URI: str()
});

export default Object.freeze({
  appPath,
  openApiPath: path.join(appPath, "../openapi.yaml"),
  version: pkg.version,
  env: env.NODE_ENV,
  isProduction: env.NODE_ENV === "production",
  port: env.PORT,
  auth: {
    jwtSecret: env.JWT_SECRET,
    jwtExpirationInterval: env.JWT_EXPIRATION_MINUTES
  },
  mongo: {
    uri: env.MONGO_URI
  }
});
