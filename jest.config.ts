import dotenv from "dotenv";
import nextJest from "next/jest";
import { Config } from "jest";
dotenv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({
  dir: ".",
});
const config: Config = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  preset: "ts-jest",
  testTimeout: 60000
};

const jestConfig = createJestConfig(config);

module.exports = jestConfig;
