const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const expressValidator = require("express-validator");
const express = require("express");
const consign = require("consign");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());
app.use(helmet());
app.use(compression());

consign()
  .include("libs/config.js")
  .then("libs/db.js")
  .then("libs/auth.js")
  .then("app/routes")
  .then("app/controllers")
  .into(app);

module.exports = app;
