"use strict";

const path = require("path");

const conf = require("../config");
console.log({ conn: conf.postgres.bill_split });
const migrationDirectories = [path.join(__dirname, "./migrations")];
module.exports = {
    client: "pg",
    connection: conf.postgres.bill_split,
    migrations: {
        directory: migrationDirectories,
    },
};
