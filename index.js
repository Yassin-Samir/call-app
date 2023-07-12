import express from "express";
import path from "path";
import { createServer } from "http";
import { ExpressPeerServer } from "peer";
const app = express();
const server = createServer(app);
const port = process.env.PORT || "8000";

const peerServer = ExpressPeerServer(server, {
  proxied: true,
  debug: true,
  path: "/myapp",
  port: 8000,
  ssl: {},
});

app.use(peerServer);
const __dirname = new URL(".", import.meta.url).pathname;

app.use(express.static(path.join(__dirname)));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.listen(port);
console.log("Listening on: " + port);
export default app;
