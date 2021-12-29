"use strict";

// import { Umzug, SequelizeStorage } from "umzug";
import config from "config";
import { Op, Options, Sequelize } from "sequelize";
import cluster from "cluster";
import fs from "fs";
// @ts-ignore
import requireGlob from "require-glob";
import defineTest from "./pgmodels/test";

const databaseUri = config.get<string>("postgres.alfredos_uri");

const options: Options = {
  dialect: "postgres",
  dialectOptions: {
    ssl: !(config.get("env.development") || config.get("env.test")),
  },
  logging: config.get("sequelize.logging"),
  pool: {
    max: cluster.isWorker
      ? parseInt(config.get("postgres.web_max_connections"), 10)
      : parseInt(config.get("postgres.cron_max_connections"), 10),
    min: 1,
    idle: 60000,
    acquire: 60000,
    evict: 40000,
  },
  define: {
    timestamps: false,
  },
};

const pgdb = new Sequelize(databaseUri, options);

const TestModel = defineTest(pgdb);

async function main() {
  await pgdb
    .authenticate()
    .finally(() => console.log("connection good"))
    .catch((err) => console.log(err));
}

main();
