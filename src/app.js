const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const expressCoreApi = require("../edusyslink-core-api");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  expressCoreApi({
    routes: {
      modelsPath: __dirname + "/models",
      generateRoutes: false,
      middlewares: [],
    },
    authentication: {
      provide: true,
      ignoreModels: ["students", "teachers"],
    },
    models: {
      useDefaultModels: true,
      ignoreModels: [],
    },
  })
);

module.exports = app;
