const express = require("express");
const path = require("path");
const { ExpressPeerServer } = require("peer");
const app = express();
const port = process.env.PORT || 8000;
const server = app.listen(port);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true,
});

app.use("/myapp", peerServer);

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

console.log("Listening on: " + port);
module.exports = app;
