const utils = require("./utils");
const http = require("http");

const app = require("./libs/server");

const port = 8080;
const host = process.env.host || "127.0.0.1";

const server = http.createServer(app);

app.get("/", (req, res) => {
  res.status(200).send({
    message: "API On-line",
  });
});

app.libs.db.sequelize.sync().done(() => {
  server.listen(port, host);
  server.on("error", utils.onError(server));
  server.on("listening", utils.onListening(server));
});
